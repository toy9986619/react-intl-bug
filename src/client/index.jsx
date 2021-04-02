/* global __lcdb__sentryDsn */
import React from 'react';
import ReactDOM from 'react-dom';

import TestApp from './TestApp';

const startApplication = async () => {
  ReactDOM.render(
    (
      <TestApp />
    ),
    document.getElementById('app'),
    () => {
    },
  );
};

export default startApplication;
