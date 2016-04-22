import {applyMiddleware, compose, createStore} from 'redux';
import {reduxReactRouter} from 'redux-router';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import routes from './routes';
import {createHistory} from 'history';

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(createLogger()),
  reduxReactRouter({routes, createHistory}),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(rootReducer);

export default store;
