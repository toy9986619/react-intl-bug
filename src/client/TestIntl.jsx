import React from 'react';
import { injectIntl } from 'react-intl';

import COMMON_MESSAGES from 'INTL/common';

const TestIntl = (props) => {
  const { intl: { formatMessage} } = props;

  return (
    <div>
      {formatMessage(COMMON_MESSAGES['auth.login'])}
    </div>
  );
}

export default injectIntl(TestIntl);
