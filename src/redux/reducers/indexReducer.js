// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import configReducer from './configReducer';
import locationsReducer from './locationsReducer';
import equipmentReducer from './equipmentReducer';

const rootReducer = combineReducers({
  user: userReducer,
  config: configReducer,
  locations: locationsReducer,
  equipments: equipmentReducer,

});

export default rootReducer;
