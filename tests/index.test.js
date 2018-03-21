/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Plot from 'react-plotly.js';

import OncoPrint from '../src';

import dataset1 from './fixtures/dataset-1';

describe('OncoPrint', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<OncoPrint data={dataset1} />);
    expect(wrapper.find(Plot)).toHaveLength(1);
  });
});
