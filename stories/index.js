/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { tablify } from 'html-tablify';

import OncoPrint from '../src';
import partialMutations from '../tests/fixtures/partial-mutations';
import fullMutations from '../tests/fixtures/full-mutations';

const createNotes = (data) => {
  const table = tablify({ data, pretty: false, cellpadding: 5 });

  return `<h2>Input Mutation Data</h2>${table}`;
};

const partialNotes = createNotes(partialMutations);
const fullNotes = createNotes(fullMutations);

storiesOf('OncoPrint', module)
  .add(
    'with a few entries',
    withNotes(partialNotes)(() => <OncoPrint data={partialMutations} />)
  )
  .add(
    'with a few entries (full width)',
    withNotes(partialNotes)(() => (
      <OncoPrint data={partialMutations} fullWidth />
    ))
  )
  .add(
    'with cBioPortal test data (full width)',
    withNotes(fullNotes)(() => <OncoPrint data={fullMutations} fullWidth />)
  );
