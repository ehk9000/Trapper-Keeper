import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from './reducers/index';
import './styles/index.scss';
import App from './containers/App/App';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const router = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'));