import {
  FETCH_PDF_DATA,
  FETCH_PDF_SUCCESS,
  FETCH_PDF_FAILURE,
  GET_DATA,
  GET_DATA_SUCCESS,
  ADD_CASE_DATA,
} from '../actions/index';

const initialState = {
  // hello: 'world',
  isLoading: false,
  pdfData: [],
};

export const starterReducer = (state = initialState, action) => {
  switch (action.type) {
    //case
    //case
    // case FETCH_PDF_DATA:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case FETCH_PDF_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     pdfData: action.payload,
    //   };
    //   case ADD_CASE_DATA:
    //   return {
    //     ...state,
    //     pdfData: action.payload,
    //   };
    case GET_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pdfData: action.payload,
      };
    default:
      return state;
  }
};
