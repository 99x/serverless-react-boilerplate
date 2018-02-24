import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Foundation from 'foundation-sites/dist/foundation.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
