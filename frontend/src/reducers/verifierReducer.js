import { CURRENT_APPROVAL_ITEM } from '../actions/types.js';

const initialState = {
  approvaldata: '',
};

export default function verifierReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_APPROVAL_ITEM:
      return {
        ...state,
        approvaldata: action.payload,
      };
    default:
      return state;
  }
}
