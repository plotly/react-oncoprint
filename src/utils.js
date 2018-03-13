/* @flow */
import type { AggregatedEntries, Entry, Entries } from './types';

const MutationEventTypes = ['INFRAME', 'TRUNC', 'MISSENSE'];
const Events = {
  // Mutations
  MISSENSE: {
    colorHTML: '#008000',
    displayName: 'Missense mutation',
  },
  INFRAME: {
    colorHTML: '#993404',
    displayName: 'Inframe mutation',
  },
  TRUNC: {
    colorHTML: '#000000',
    displayName: 'Truncation mutation',
  },
  // Fusion
  FUSION: {
    colorHTML: '#8b00c9',
    displayName: 'Fusion',
  },
  // Copy number alterations
  AMP: {
    colorHTML: '#ff0000',
    displayName: 'Amplification',
  },
  GAIN: {
    colorHTML: '#ffb6c1',
    displayName: 'Gain',
  },
  HETLOSS: {
    colorHTML: '#8fd8d8',
    displayName: 'Shallow deletion',
  },
  HOMDEL: {
    colorHTML: '#0000ff',
    displayName: 'Deep deletion',
  },
  // mRNA expressions
  UP: {
    colorHTML: '#ff9999',
    displayName: 'mRNA Upregulation',
  },
  DOWN: {
    colorHTML: '#6699cc',
    displayName: 'mRNA Downregulation',
  },
};

export const getGeneNames = (entries: Entries): Array<string> => {
  return entries.map((e) => e.gene).filter((gene) => gene !== null);
};

export const uniqueGenes = (entries: Entries): Array<string> => {
  return [...new Set(getGeneNames(entries))].reverse();
};

export const isMutation = (entry: Entry): boolean => {
  return MutationEventTypes.includes(entry.type);
};

export const aggregate = (entries: Entries): AggregatedEntries => {
  const out = {};

  entries.forEach((e: Entry) => {
    if (!e.type || e.type === 'NONE') {
      return;
    }

    const k = isMutation(e) ? e.type : e.alteration;
    const v = out[k] || {
      type: e.type,
      alteration: e.alteration,
      entries: [],
    };

    v.entries.push(e);
    out[k] = v;
  });

  return out;
};

export const getDisplayName = (entry: Entry): string => {
  const eventName = isMutation(entry) ? entry.type : entry.alteration;

  return Events[eventName].displayName;
};

export const getColor = (entry: Entry): string => {
  const eventName = isMutation(entry) ? entry.type : entry.alteration;

  return Events[eventName].colorHTML;
};
