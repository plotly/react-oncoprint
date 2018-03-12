import React from 'react';
import { storiesOf } from '@storybook/react';

import OncoPrint from "../src";

storiesOf('OncoPrint', module)
  .add('default', () => {
    return <OncoPrint />;
  });
