import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authorsData from '../pages/authors/reducers';
import websitesData from '../pages/websites/reducers';
import articlesData from '../pages/articles/reducers';

const rootReducer = combineReducers({
  authorsData,
  websitesData,
  articlesData,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
