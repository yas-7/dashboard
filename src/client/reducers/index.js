import { combineReducers } from 'redux';
import authorsReducer from './authors';

export default combineReducers({ authorsData: authorsReducer });
