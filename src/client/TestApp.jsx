import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import TestIntl from './TestIntl';

const format = {
  time: {
    short: {
      minute: '2-digit',
      hour: 'numeric',
    },
  },
  relative: {
    min: {
      units: 'minute',
      style: 'numeric',
    },
  },
}

const loadIntlData = async () => {
  const message = await import('./messages.json');
  return message;
}

const TestApp = () => {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const load = async () => {
      const loadMessage = await loadIntlData();
      setMessages(loadMessage);
    }

    load();
  }, []);

  return (
    <IntlProvider locale="zh-Hant-TW" format={format} messages={messages} textComponent="span">
      <TestIntl />
    </IntlProvider>
  );
};

export default TestApp;