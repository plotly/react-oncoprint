/* @flow */
import hasElementsInInterval from 'oncoprintjs/src/js/haselementsininterval';

import type { Comparator, ComparatorResult } from './types';

// PrecomputedComparator is similar to the OncoPrintJs implementation with
// three notable changes: rewritten with Flow/ES next and as a class, the input
// data structure is different, and no direction.
class PrecomputedComparator {
  comparator: Comparator;
  data: Array<string>;
  changePoints: Array<number>;
  samplesToIndex: { [string]: number };
  sortedData: Array<string>;

  constructor(data: Array<string>, comparator: Comparator) {
    this.comparator = comparator;
    this.data = data;

    this.sort();
  }

  sort() {
    this.sortedData = this.data.sort(this.comparator);

    this.changePoints = [];
    for (let i = 0; i < this.sortedData.length; i++) {
      if (i === this.sortedData.length - 1) {
        break;
      }

      if (this.comparator(this.sortedData[i], this.sortedData[i + 1]) !== 0) {
        this.changePoints.push(i);
      }
    }

    this.samplesToIndex = {};
    for (var i = 0; i < this.sortedData.length; i++) {
      this.samplesToIndex[this.sortedData[i]] = i;
    }
  }

  compare(s1: string, s2: string): number {
    let i1 = this.samplesToIndex[s1];
    let i2 = this.samplesToIndex[s2];

    if (typeof i1 === 'undefined' && typeof i2 === 'undefined') {
      return 0;
    } else if (typeof i1 === 'undefined') {
      return 1;
    } else if (typeof i2 === 'undefined') {
      return -1;
    }

    let shouldNegateResult = false;

    if (i1 === i2) {
      return 0;
    } else if (i1 > i2) {
      const tmp = i1;
      i1 = i2;
      i2 = tmp;
      shouldNegateResult = true;
    }

    let res = 0;
    if (hasElementsInInterval(this.changePoints, (x) => x, i1, i2)) {
      res = -1;
    }

    if (shouldNegateResult) {
      res = res * -1;
    }

    return res;
  }
}

export default PrecomputedComparator;
