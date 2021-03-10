import {
  DOCUMENT_TYPE,
  DOCUMENT_FRONT_IMAGE,
  DOCUMENT_BACK_IMAGE,
  TEXTRACT_TEXT,
  RESET_UPLOAD_STATE,
} from '../actions/types.js';

const initialState = {
  documenttype: '',
  frontimage: '',
  backimage: '',
  relevantText: '',
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case DOCUMENT_TYPE:
      return {
        ...state,
        documenttype: action.payload,
      };
    case DOCUMENT_FRONT_IMAGE:
      return {
        ...state,
        frontimage: action.payload,
      };
    case DOCUMENT_BACK_IMAGE:
      return {
        ...state,
        backimage: action.payload,
      };
    case TEXTRACT_TEXT:
      return {
        ...state,
        relevantText: action.payload,
      };

    case RESET_UPLOAD_STATE:
      return {
        ...state,
        documenttype: '',
        frontimage: '',
        backimage: '',
        relevantText: '',
      };
    default:
      return state;
  }
}
