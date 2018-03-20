/* @flow */
import React from 'react';
import Plot from 'react-plotly.js';

import {
  aggregate,
  getColor,
  getDisplayName,
  getGeneNames,
  getSortedGenes,
  getSortedSamples,
  isMutation,
} from './utils';
import type { AggregatedEvents, Event, Events } from './types';

type Props = {|
  data: Events,
  fullWidth: boolean,
  padding: number,
  sampleColor: string,
|};

class OncoPrint extends React.Component<Props> {
  static defaultProps = {
    fullWidth: false,
    padding: 0.05,
    sampleColor: 'rgb(190, 190, 190)',
  };

  getPlotData() {
    const { data: inputData, padding } = this.props;

    const events = aggregate(inputData);
    const genes = getSortedGenes(inputData);
    const samples = getSortedSamples(inputData);

    let base = 0;
    const bBackground = [];
    const tBackground = [];
    const xBackground = [];
    const yBackground = [];

    samples.forEach((s: string) => {
      bBackground.push(...Array(genes.length).fill(base++));
      tBackground.push(...Array(genes.length).fill(s));
      xBackground.push(...Array(genes.length).fill(1));
      yBackground.push(...genes);
    });

    const background = {
      base: bBackground.map((i) => i + padding),
      hoverinfo: 'text',
      marker: {
        color: this.props.sampleColor,
      },
      name: 'No alteration',
      text: tBackground,
      orientation: 'h',
      type: 'bar',
      x: xBackground.map((i) => i - padding * 2),
      y: yBackground,
    };

    const data = [background];

    Object.keys(events).forEach((key: string, index: number) => {
      const aggr = events[key];
      const width = aggr.type === 'CNA' ? 0.8 : aggr.type === 'EXP' ? 0.6 : 0.4;

      // where to draw a bar for this entry
      const indexes = aggr.events.map((e) => e.sample).map((s) => {
        return samples.findIndex((sample) => sample === s);
      });

      data.push({
        base: indexes.map((i) => i + padding),
        hoverinfo: 'name',
        marker: {
          color: getColor(aggr.events[0]),
        },
        name: getDisplayName(aggr.events[0]),
        orientation: 'h',
        type: 'bar',
        width,
        x: Array(aggr.events.length)
          .fill(1)
          .map((i) => i - padding * 2),
        y: getGeneNames(aggr.events),
      });
    });

    return data;
  }

  render() {
    const plotProps = {};

    plotProps.layout = {
      barmode: 'stack',
      hovermode: 'closest',
      xaxis: {
        showgrid: false,
        showticklabels: false,
        zeroline: false,
      },
      yaxis: {
        fixedrange: true,
        showgrid: false,
        zeroline: false,
      },
    };

    plotProps.data = this.getPlotData();

    if (this.props.fullWidth) {
      plotProps.style = {
        width: '100%',
        height: '100%',
      };
      plotProps.useResizeHandler = true;
    }

    return <Plot {...plotProps} />;
  }
}

export default OncoPrint;
