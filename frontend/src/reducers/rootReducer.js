import { combineReducers } from 'redux';
import uploadReducer from './uploadReducer';
import verifierReducer from './verifierReducer';
import { RESET_ALL_STATE } from '../actions/types';

const appReducer = combineReducers({
  uploads: uploadReducer,
  verifier: verifierReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_ALL_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
