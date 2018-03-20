/* @flow */

export type Event = {|
  alteration: string,
  gene: string,
  sample: string,
  type: string,
|};

export type Events = Array<Event>;

export type AggregatedEvents = {
  [string]: {|
    type: string,
    alteration: string,
    events: Events,
  |},
};

export type ComparatorResult = -1 | 0 | 1;

export type Comparator = (a: any, b: any) => ComparatorResult;

// Used in `getSortedSamples()` (utils)
export type SamplesMap = {
  // sample
  [string]: {
    // gene
    [string]: {
      // event type: event type or alteration
      [string]: string,
    },
  },
};
