import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';

ReactDOM.render(
    <BrowserRouter>
        <Router history={history}>
            <App />
        </Router>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
