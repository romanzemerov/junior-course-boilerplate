import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import products from './products.json';
import './index.css';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'aqua'
});

ReactDOM.render(<App products={products} />, document.getElementById('root'));
