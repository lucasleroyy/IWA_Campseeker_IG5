// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import configReducer from './configReducer';

const rootReducer = combineReducers({
  user: userReducer,
  config: configReducer
});

export default rootReducer;
