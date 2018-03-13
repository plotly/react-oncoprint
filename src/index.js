/* @flow */
import React from 'react';
import Plot from 'react-plotly.js';

import {
  getColor,
  aggregate,
  isMutation,
  getGeneNames,
  getDisplayName,
  uniqueGenes,
} from './utils';
import type { AggregatedEntries, Entry, Entries } from './types';

type Props = {|
  data: Entries,
  fullWidth: boolean,
  sampleColor: string,
|};

class OncoPrint extends React.Component<Props> {
  static defaultProps = {
    fullWidth: false,
    sampleColor: 'rgb(190, 190, 190)',
  };

  render() {
    const padding = 0.05;

    const nbEntries = this.props.data.length;
    const genes = uniqueGenes(this.props.data);
    const entries = aggregate(this.props.data);

    let base = 0;
    const bBackground = [];
    const tBackground = [];
    const xBackground = [];
    const yBackground = [];

    this.props.data.forEach((e: Entry) => {
      bBackground.push(...Array(genes.length).fill(base++));
      tBackground.push(...Array(genes.length).fill(e.sample));
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
    const shapes = [];

    Object.keys(entries).forEach((key: string, index: number) => {
      const aggr = entries[key];
      const width = aggr.type === 'CNA' ? 0.8 : 0.4;

      // where to draw a bar for this entry
      const indexes = aggr.entries.map((e) => e.sample).map((s) => {
        return this.props.data.findIndex((e) => e.sample === s);
      });

      data.push({
        base: indexes.map((i) => i + padding),
        hoverinfo: 'name',
        marker: {
          color: getColor(aggr.entries[0]),
        },
        name: getDisplayName(aggr.entries[0]),
        orientation: 'h',
        type: 'bar',
        width,
        x: Array(aggr.entries.length)
          .fill(1)
          .map((i) => i - padding * 2),
        y: getGeneNames(aggr.entries),
      });
    });

    const props = {};
    props.layout = {
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
      shapes,
    };

    props.data = data;

    if (this.props.fullWidth) {
      props.style = {
        width: '100%',
        height: '100%',
      };
      props.useResizeHandler = true;
    }

    return <Plot {...props} />;
  }
}

export default OncoPrint;
