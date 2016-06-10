import {applyMiddleware, compose, createStore} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root_reducer';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(createLogger()),
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(rootReducer);

export default store;
