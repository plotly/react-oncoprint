/* @flow */
import PrecomputedComparator from '../src/PrecomputedComparator';
import * as utils from '../src/utils';

import dataset1 from './fixtures/dataset-1';

describe('PrecomputedComparator', () => {
  describe('constructor()', () => {
    it('sorts the samples using a given comparator', () => {
      // The data to sort with the PrecomputedComparator
      const samples = [...new Set(dataset1.map((e) => e.sample))].sort();

      const samplesMap = utils.createSamplesMap(dataset1);
      // We need a comparator that sorts the samples according to the events.
      const comparatorForGene1 = utils.createSortEventsForGeneComparator(
        dataset1[0].gene,
        samplesMap,
      );

      // Let's create a comparator to sort the samples.
      const comparator = new PrecomputedComparator(
        [...samples],
        comparatorForGene1,
      );
      expect(samples).not.toEqual(comparator.sortedData);

      const expectedSortedSamples = [...samples];
      expectedSortedSamples.sort(comparatorForGene1);
      expect(comparator.sortedData).toEqual(expectedSortedSamples);
    });
  });
});
