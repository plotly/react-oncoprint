/* @flow */

export type Entry = {|
  alteration: string,
  gene: string,
  sample: string,
  type: string,
|};

export type Entries = Array<Entry>;

export type AggregatedEntries = {
  [string]: {|
    type: string,
    alteration: string,
    entries: Entries,
  |},
};
