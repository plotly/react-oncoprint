/* @flow */
import * as utils from '../src/utils';

import cBioPortalData from './fixtures/cbioportal-data';
import dataset1 from './fixtures/dataset-1';
import dataset2 from './fixtures/dataset-2';
import dataset3 from './fixtures/dataset-3';

describe('utils', () => {
  describe('uniqueGenes()', () => {
    it('returns a list of gene names', () => {
      const genes = utils.uniqueGenes(dataset1);

      expect(genes).toHaveLength(3);
      expect(genes).toEqual(['BRCA1', 'PTEN', 'TP53']);
    });
  });

  describe('aggregate()', () => {
    it('returns a list of gene names', () => {
      const eventsByType = utils.aggregate(dataset1);

      expect(Object.keys(eventsByType)).toEqual([
        'FUSION',
        'HOMDEL',
        'AMP',
      ]);
      expect(eventsByType['FUSION']).toEqual({
        alteration: 'FUSION',
        type: 'FUSION',
        entries: [
          dataset1[0],
          dataset1[1],
        ],
      });
    });
  });

  describe('getDisplayName()', () => {
    it('returns the display name of an event', () => {
      const name = utils.getDisplayName(dataset1[0]);

      expect(name).toEqual('Fusion');
    });
  });

  describe('isMutation()', () => {
    it('returns false when the event is not a mutation', () => {
      const isMutation = utils.isMutation(dataset1[0]);
      expect(isMutation).toEqual(false);
    });

    it('returns true when the event is a mutation', () => {
      const mutationEvent = {
        sample: 'TCGA-04-1357-01',
        gene: 'BRCA1',
        alteration: 'Q1538A',
        type: 'MISSENSE',
      };

      const isMutation = utils.isMutation(mutationEvent);
      expect(isMutation).toEqual(true);
    });
  });

  describe('getSamples()', () => {
    it('returns a sorted set of samples', () => {
      const sortedSamples1 = utils.getSamples(dataset1);
      expect(sortedSamples1).toMatchSnapshot();

      const sortedSamples2 = utils.getSamples(dataset2);
      expect(sortedSamples2).toMatchSnapshot();

      const sortedSamples3 = utils.getSamples(dataset3);
      expect(sortedSamples3).toMatchSnapshot();

      const cBioPortalSamples = utils.getSamples(cBioPortalData);
      expect(cBioPortalSamples).toMatchSnapshot();
    });
  });
});
