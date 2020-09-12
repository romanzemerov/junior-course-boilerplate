import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import './index.css';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'aqua'
});

ReactDOM.render(<App />, document.getElementById('root'));
