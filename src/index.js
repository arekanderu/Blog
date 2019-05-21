import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Reducer/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>, 
    document.getElementById('root'));
serviceWorker.unregister();
