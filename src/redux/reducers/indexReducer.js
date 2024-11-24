// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import configReducer from './configReducer';
import locationsReducer from './locationsReducer';
import equipmentReducer from './equipmentReducer';
import favorisReducer from './favorisReducer';
import flagReducer from './flagsReducer';
import commentReducer from './commentsReducer';
import notifsReducer from './notifsReducer';
import supportReducer from './supportReducer';
const appReducer = combineReducers({
  user: userReducer,
  config: configReducer,
  locations: locationsReducer,
  equipments: equipmentReducer,
  favoris: favorisReducer,
  flags: flagReducer,
  comments: commentReducer,
  notifications: notifsReducer,
  support: supportReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}

export default rootReducer;
