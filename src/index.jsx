import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import {Provider} from 'react-redux';
import {store, sagaMiddleware} from './views/redux/Redux';
import rootSaga from './views/redux/rootSaga';

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App/>
    </Provider>,
  document.getElementById('root')
);
