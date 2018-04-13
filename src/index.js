/* @flow */
import React from 'react';
import Plot from 'react-plotly.js';

import {
  aggregate,
  getColor,
  getDisplayName,
  getEventRatiosPerGene,
  getGeneNames,
  getSortedGenes,
  getSortedSamples,
} from './utils';
import type { Events } from './types';

type Props = {|
  data: Events,
  fullWidth: boolean,
  padding: number,
  sampleColor: string,
|};

class OncoPrint extends React.PureComponent<Props> {
  static defaultProps = {
    fullWidth: false,
    padding: 0.05,
    sampleColor: 'rgb(190, 190, 190)',
  };

  getData() {
    const { data: inputData, padding, sampleColor } = this.props;

    const events = aggregate(inputData);
    const genes = getSortedGenes(inputData);
    const samples = getSortedSamples(inputData);

    const ratios = getEventRatiosPerGene(inputData, samples.length);
    const formatGenes = (list: Array<string>): Array<string> =>
      list.map((gene) => `${gene} (${ratios[gene]}%)`);

    let base = 0;
    const bBackground = [];
    const tBackground = [];
    const xBackground = [];
    const yBackground = [];

    // Background is used to draw the matrix (genes * samples)
    samples.forEach((s: string) => {
      bBackground.push(...Array(genes.length).fill(base));
      tBackground.push(...Array(genes.length).fill(s));
      xBackground.push(...Array(genes.length).fill(1));
      yBackground.push(...formatGenes(genes));
      base += 1;
    });

    const background = {
      base: bBackground.map((i: number) => i + padding),
      hoverinfo: 'text',
      marker: {
        color: sampleColor,
      },
      name: 'No alteration',
      text: tBackground,
      orientation: 'h',
      type: 'bar',
      x: xBackground.map((i: number) => i - padding * 2),
      y: yBackground,
    };

    const data = [background];
    Object.keys(events).forEach((key: string) => {
      const aggr = events[key];

      let width = 0.4;
      if (aggr.type === 'CNA') {
        width = 0.8;
      } else if (aggr.type === 'EXP') {
        width = 0.6;
      }

      // where to draw a bar for this entry
      const indexes = aggr.events
        .map((e) => e.sample)
        .map((s) => samples.findIndex((sample) => sample === s));

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
          .map((i: number) => i - padding * 2),
        y: formatGenes(getGeneNames(aggr.events)),
      });
    });

    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  getLayout() {
    return {
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
  }

  render() {
    const otherProps = {};
    if (this.props.fullWidth) {
      otherProps.style = {
        width: '100%',
        height: '100%',
      };
      otherProps.useResizeHandler = true;
    }

    return (
      <Plot data={this.getData()} layout={this.getLayout()} {...otherProps} />
    );
  }
}

export default OncoPrint;
