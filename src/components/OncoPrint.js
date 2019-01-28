import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import Plot from 'react-plotly.js';

import {
    aggregate,
    getColor,
    getDisplayName,
    getEventRatiosPerGene,
    getGeneNames,
    getSortedGenes,
    getSortedSamples
} from './utils';


/**
 * The OncoPrint component is used to view multiple genetic alteration events
 * through an interactive and zoomable heatmap. It is a React/Dash port of the
 * popular oncoPrint() function from the BioConductor R package.
 * Under the hood, the rendering is done using Plotly.js built upon D3.
 * Plotly's interactivity allows the user to bind clicks and hovers to genetic
 * events, allowing the user to create complex bioinformatic apps or workflows
 * that rely on crossfiltering.
 * Read more about the component here:
 * https://github.com/plotly/react-oncoprint
 */
export default class OncoPrint extends PureComponent {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            xStart: null,
            xEnd: null
        };

        this.resetWindowing = this.resetWindowing.bind(this);
        this.handleChange = _.debounce(this.handleChange.bind(this), 250);
    }

    // Reset windowing to user preset on init or data change
    resetWindowing(props) {
        const {
            range
        } = props;

        let xStart, xEnd;
        if (range.length === 2) {
            xStart = range[0];
            xEnd = range[1];
        } else {
            xStart = null;
            xEnd = null;
        }

        return { xStart, xEnd };
    }

    // Handle plot events
    handleChange(event) {
        if (!this.props.onChange) {
            return;
        }

        // CLick (mousedown) or hover (mousemove)
        if (event.points) {
            let eventType;
            if (event.event.type === "mousedown") {
                eventType = 'Click';
            } else if (event.event.type === "mousemove") {
                eventType = 'Hover';
            } else {
                eventType = 'Other';
            }

            this.props.onChange({
                eventType: eventType,
                name: event.points[0].data.name,
                text: event.points[0].text,
                curveNumber: event.points[0].curveNumber,
                x: event.points[0].x,
                y: event.points[0].y,
            });
        }
        // Zoom
        else if (event['xaxis.range[0]'] || event['xaxis.range']) {
            this.setState({
                xStart: event['xaxis.range[0]'] || event['xaxis.range'][0],
                xEnd: event['xaxis.range[1]'] || event['xaxis.range'][1]
            });
            this.props.onChange({
                eventType: 'Zoom',
                xStart: event['xaxis.range[0]'] || event['xaxis.range'][0],
                xEnd: event['xaxis.range[1]'] || event['xaxis.range'][1]
            });
        }
        // Autozoom
        else if (event['xaxis.autorange'] === true) {
            this.setState({
                xStart: null,
                xEnd: null
            });
            this.props.onChange({
                eventType: 'Autoscale',
            });
        }
        // Guard
        else {
            this.props.onChange(event);
        }
    };

    // Fetch data
    getData() {
        const {
            data: inputData,
            padding,
            colorscale,
            backgroundcolor,
        } = this.props;

        // OncoPrint equivalent of x, y
        const events = aggregate(inputData);
        const genes = getSortedGenes(inputData);
        const samples = getSortedSamples(inputData);
        const ratios = getEventRatiosPerGene(inputData, samples.length);

        const formatGenes = (list) =>
            list.map((gene) => `${gene} (${ratios[gene]}%)`);

        let base = 0;
        const bBackground = [];
        const tBackground = [];
        const xBackground = [];
        const yBackground = [];

        // Background is used to draw the matrix (genes * samples)
        samples.forEach((s) => {
            bBackground.push(...Array(genes.length).fill(base));
            tBackground.push(...Array(genes.length).fill(s));
            xBackground.push(...Array(genes.length).fill(1));
            yBackground.push(...formatGenes(genes));
            base += 1;
        });

        const background = {
            base: bBackground.map((i) => i + padding),
            hoverinfo: 'text',
            marker: {
                color: backgroundcolor
            },
            name: 'No alteration',
            text: tBackground,
            orientation: 'h',
            type: 'bar',
            x: xBackground.map((i) => i - padding * 2),
            y: yBackground
        };

        const data = [background];
        Object.keys(events).forEach((key) => {
            const aggr = events[key];

            // Resize width depending on the mutation type
            let width = 0.4;
            if (aggr.type === 'CNA') {
                width = 0.8;
            } else if (aggr.type === 'EXP') {
                width = 0.6;
            }

            // Mutations should have the original text on it, not the type of mutation
            const text_arr = aggr.events.map(
                (event) => `${event.sample}<br>${getDisplayName(event)}`
            );

            // where to draw a bar for this entry
            const indexes = aggr.events
                .map((e) => e.sample)
                .map((s) => samples.findIndex((sample) => sample === s));

            data.push({
                base: indexes.map((i) => i + padding),
                hoverinfo: 'text',
                marker: {
                    color: getColor(aggr.events[0], colorscale)
                },
                name: getDisplayName(aggr.events[0]),
                text: text_arr,
                orientation: 'h',
                type: 'bar',
                width,
                x: Array(aggr.events.length)
                    .fill(1)
                    .map((i) => i - padding * 2),
                y: formatGenes(getGeneNames(aggr.events))
            });
        });

        return data;
    }

    // Fetch layout
    getLayout() {
        const {
            showlegend,
            showoverview,
            width,
            height,
        } = this.props;
        const { xStart, xEnd } = this.state;

        // Get initial range
        const initialRange = [xStart, xEnd];

        const layout = {
            barmode: 'stack',
            hovermode: 'closest',
            showlegend: showlegend,
            xaxis: {
                showgrid: false,
                showticklabels: false,
                zeroline: false,
                range: initialRange,
                automargin: true
            },
            yaxis: {
                showgrid: false,
                zeroline: false,
                fixedrange: true,
                automargin: true
            },
            margin: { t: 20, r: 20, b: 20 },
        };

        if (showoverview) {
            layout.xaxis.rangeslider = { autorange: true };
        }

        return { layout, width, height };
    }

    // Set xStart and xEnd on load
    componentDidMount() {
        const { xStart, xEnd } = this.resetWindowing(this.props);
        this.setState({ xStart, xEnd });
    }

    // Reset xStart and xEnd on data change
    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
            const { xStart, xEnd } = this.resetWindowing(this.props);
            this.setState({ xStart, xEnd });
        }
    }

    // Main
    render() {
        const data = this.getData();
        const { layout, width, height } = this.getLayout();
        const other = {
            style: {
                width: width,
                height: height
            },
            useResizeHandler: true
        };

        return (
            <div>
                <Plot
                    data={data}
                    layout={layout}
                    onClick={this.handleChange}
                    onHover={this.handleChange}
                    onRelayout={this.handleChange}
                    {...other}
                />
            </div>
        );
    }
}


OncoPrint.propTypes = {

    /**
     * Input data, in CBioPortal format where each list entry is a dict
     * consisting of 'sample', 'gene', 'alteration', and 'type'
     */
    data: PropTypes.array,

    // TODO: Add remove empty columns prop

    /**
     * Adjusts the padding (as a proportion of whitespace) between two tracks.
     * Value is a ratio between 0 and 1.
     * Defaults to 0.05 (e.g. 5%). If set to 0, plot will look like a heatmap.
     */
    padding: PropTypes.number,

    /**
     * If not null, will override the default OncoPrint colorscale.
     * Default OncoPrint colorscale same as CBioPortal implementation.
     * Make your own colrscale as a {'mutation': COLOR} dict.
     * Supported mutation keys are ['MISSENSE, 'INFRAME', 'FUSION',
     * 'AMP', 'GAIN', 'HETLOSS', 'HMODEL', 'UP', 'DOWN']
     * Note that this is NOT a standard plotly colorscale.
     */
    colorscale: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),

    /**
     * Default color for the tracks, in common name, hex, rgb or rgba format.
     * If left blank, will default to a light grey rgb(190, 190, 190).
     */
    backgroundcolor: PropTypes.string,

    /**
     *.Toogles whether or not to show a legend on the right side of the plot,
     * with mutation information.
     */
    range: PropTypes.array,

    /**
     *.Toogles whether or not to show a legend on the right side of the plot,
     * with mutation information.
     */
    showlegend: PropTypes.bool,

    /**
     *.Toogles whether or not to show a heatmap overview of the tracks.
     */
    showoverview: PropTypes.bool,

    /**
     * Width of the OncoPrint.
     * Will disable auto-resizing of plots if set.
     */
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /**
     * Height of the OncoPrint.
     * Will disable auto-resizing of plots if set.
     */
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
};


OncoPrint.defaultProps = {
    // Data
    padding: 0.05,
    colorscale: null,
    backgroundcolor: 'rgb(190, 190, 190)',
    // Layout
    range: [null, null],
    showlegend: true,
    showoverview: true,
    // Other
    width: null,
    height: 500
}
