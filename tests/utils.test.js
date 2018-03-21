/* @flow */
import * as utils from '../src/utils';

import cBioPortalData from './fixtures/cbioportal-data';
import dataset1 from './fixtures/dataset-1';
import dataset2 from './fixtures/dataset-2';
import dataset3 from './fixtures/dataset-3';

describe('utils', () => {
  const mutationEvent = {
    sample: 'TCGA-04-1357-01',
    gene: 'BRCA1',
    alteration: 'Q1538A',
    type: 'MISSENSE',
  };

  describe('getSortedGenes()', () => {
    it('returns a sorted set of gene names', () => {
      const genes = utils.getSortedGenes(dataset1);

      expect(genes).toHaveLength(3);
      expect(genes).toEqual(['BRCA1', 'PTEN', 'TP53']);
    });
  });

  describe('aggregate()', () => {
    it('returns a list of gene names', () => {
      const eventsByType = utils.aggregate(dataset1);

      expect(Object.keys(eventsByType)).toEqual(['FUSION', 'HOMDEL', 'AMP']);
      expect(eventsByType.FUSION).toEqual({
        alteration: 'FUSION',
        type: 'FUSION',
        events: [dataset1[0], dataset1[1]],
      });
    });

    it('uses the type as key when event is a mutation', () => {
      const eventsByType = utils.aggregate([mutationEvent]);

      expect(Object.keys(eventsByType)).toEqual([mutationEvent.type]);
    });

    it('skips the samples without any events', () => {
      const eventsByType = utils.aggregate([
        ...dataset1,
        {
          sample: 'TCGA-25-2393-01',
          gene: null,
          alteration: null,
          type: null,
        },
      ]);

      expect(Object.keys(eventsByType)).toEqual(['FUSION', 'HOMDEL', 'AMP']);

      let count = 0;
      Object.keys(eventsByType).forEach((key) => {
        count += eventsByType[key].events.length;
      });
      expect(count).toEqual(10);
    });
  });

  describe('getDisplayName()', () => {
    it('returns the display name of a given event', () => {
      const event = dataset1[0];
      const name = utils.getDisplayName(event);

      expect(name).toEqual(utils.SupportedEvents.FUSION.displayName);
    });

    it('uses the event type to find the display name when event is a mutation', () => {
      const name = utils.getDisplayName(mutationEvent);

      expect(name).toEqual(utils.SupportedEvents.MISSENSE.displayName);
    });
  });

  describe('isMutation()', () => {
    it('returns false when the event is not a mutation', () => {
      const isMutation = utils.isMutation(dataset1[0]);
      expect(isMutation).toEqual(false);
    });

    it('returns true when the event is a mutation', () => {
      const isMutation = utils.isMutation(mutationEvent);
      expect(isMutation).toEqual(true);
    });
  });

  describe('getSortedSamples()', () => {
    it('returns a sorted set of samples', () => {
      const sortedSamples1 = utils.getSortedSamples(dataset1);
      expect(sortedSamples1).toMatchSnapshot();

      const sortedSamples2 = utils.getSortedSamples(dataset2);
      expect(sortedSamples2).toMatchSnapshot();

      const sortedSamples3 = utils.getSortedSamples(dataset3);
      expect(sortedSamples3).toMatchSnapshot();

      const cBioPortalSamples = utils.getSortedSamples(cBioPortalData);
      expect(cBioPortalSamples).toMatchSnapshot();
    });
  });

  describe('getColor()', () => {
    it('returns the color for a given event', () => {
      const event = dataset1[0];
      const color = utils.getColor(event);

      expect(color).toEqual(utils.SupportedEvents.FUSION.colorHTML);
    });

    it('uses the event type to find the color when event is a mutation', () => {
      const color = utils.getColor(mutationEvent);

      expect(color).toEqual(utils.SupportedEvents.MISSENSE.colorHTML);
    });
  });
});
