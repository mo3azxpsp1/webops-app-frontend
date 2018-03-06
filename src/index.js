import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Router} from 'react-router-dom';
import history from './history';
import setAuthorizationToken from './utils/setAuthorizationToken';

setAuthorizationToken(localStorage.getItem('jwtToken'));

ReactDOM.render(<Router history={history}><App /></Router>, document.getElementById('root'));
registerServiceWorker();
