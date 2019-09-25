import React from 'react';
import ReactDOM from 'react-dom';
import DashApp from './dashApp';
import serviceWorker from './registerServiceWorker';

ReactDOM.render(<DashApp />, document.getElementById('root'));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./dashApp.js', () => {
    const NextApp = require('./dashApp').default;
    ReactDOM.render(<NextApp />, document.getElementById('root'));
  });
}
serviceWorker();
