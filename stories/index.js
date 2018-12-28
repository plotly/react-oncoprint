/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { tablify } from 'html-tablify';

import OncoPrint from '../src/lib';
import cBioPortalData from '../tests/fixtures/cbioportal-data';
import dataset1 from '../tests/fixtures/dataset-1';
import dataset2 from '../tests/fixtures/dataset-2';
import dataset3 from '../tests/fixtures/dataset-3';

const createNotes = (data) => {
  const table = tablify({ data, pretty: false, cellpadding: 5 });

  return `<h2>Input Mutation Data</h2>${table}`;
};

storiesOf('OncoPrint', module)
  .add(
    'with a few entries',
    withNotes(createNotes(dataset1))(() => <OncoPrint data={dataset1} />),
  )
  .add(
    'with a few more entries (full width)',
    withNotes(createNotes(dataset2))(() => (
      <OncoPrint data={dataset2} fullWidth />
    )),
  )
  .add(
    'with two genes and lots of truncating mutations',
    withNotes(createNotes(dataset3))(() => (
      <OncoPrint data={dataset3} fullWidth />
    )),
  )
  .add(
    'with cBioPortal test data (full width)',
    withNotes(createNotes(cBioPortalData))(() => (
      <OncoPrint data={cBioPortalData} fullWidth />
    )),
  );
