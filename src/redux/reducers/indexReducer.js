// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import configReducer from './configReducer';
import locationsReducer from './locationsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  config: configReducer,
  locations: locationsReducer,
});

export default rootReducer;
