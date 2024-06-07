import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import IndexPage from './pages/index';

ReactDOM.render(
    <Provider store={store}>
        <IndexPage />
    </Provider>,
    document.getElementById('root')
);
