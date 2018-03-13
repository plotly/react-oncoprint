/* @flow */
import * as utils from '../src/utils';
import partialMutations from './fixtures/partial-mutations';

describe('utils', () => {
  describe('uniqueGenes()', () => {
    it('returns a list of gene names', () => {
      const genes = utils.uniqueGenes(partialMutations);

      expect(genes).toHaveLength(3);
      expect(genes).toEqual(['BRCA1', 'PTEN', 'TP53']);
    });
  });

  describe('aggregate()', () => {
    it('returns a list of gene names', () => {
      const eventsByType = utils.aggregate(partialMutations);

      expect(Object.keys(eventsByType)).toEqual([
        'FUSION',
        'HOMDEL',
        'AMP',
      ]);
      expect(eventsByType['FUSION']).toEqual({
        alteration: 'FUSION',
        type: 'FUSION',
        entries: [
          partialMutations[0],
          partialMutations[1],
        ],
      });
    });
  });

  describe('getDisplayName()', () => {
    it('returns the display name of an event', () => {
      const name = utils.getDisplayName(partialMutations[0]);

      expect(name).toEqual('Fusion');
    });
  });

  describe('isMutation()', () => {
    it('return false when the event is not a mutation', () => {
      const isMutation = utils.isMutation(partialMutations[0]);
      expect(isMutation).toEqual(false);
    });

    it('return true when the event is a mutation', () => {
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
});
