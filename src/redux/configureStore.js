import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { apiMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';

// import monitorReducersEnhancer from './monitorReducers';
// import loggerMiddleware from './logger';
import rootReducer from './reducers';
import rootSagas from './sagas';

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [apiMiddleware, logger, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  sagaMiddleware.run(rootSagas);

  return store;
}
