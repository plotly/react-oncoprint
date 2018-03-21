/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Plot from 'react-plotly.js';

import OncoPrint from '../src';

import dataset1 from './fixtures/dataset-1';

describe('OncoPrint', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<OncoPrint data={dataset1} />);
    const plot = wrapper.find(Plot);

    expect(plot).toHaveLength(1);
    expect(plot.prop('style').height).not.toBeDefined();
  });

  it('can be be displayed full width', () => {
    const wrapper = shallow(<OncoPrint data={dataset1} fullWidth />);
    const plot = wrapper.find(Plot);

    expect(plot).toHaveLength(1);
    expect(plot.prop('style').height).toEqual('100%');
  });
});
