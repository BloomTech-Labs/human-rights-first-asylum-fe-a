// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import axios from 'axios';
export const SEND_PDF_DATA = 'SEND_PDF_DATA'; /* send raw pdf data to backend */
export const FETCH_PDF_DATA =
  'FETCH_PDF_DATA'; /* get extracted data from ds  */
export const FETCH_PDF_SUCCESS = 'FETCH_PDF_SUCCESS';
export const FETCH_PDF_FAILURE = 'FETCH_PDF_FAILURE';
// export const ADD_CASE_DATA = "ADD_CASE_DATA"

export const sendPdf = pdfFile => {
  return dispatch => {
    dispatch({ type: SEND_PDF_DATA });
    axios.post('#', pdfFile);
    // .then((res)=>{
    //     dispatch({type:ADD_CASE_DATA, payload: res.data})
    // })
  };
};

export const fetchPdf = () => {
  return dispatch => {
    dispatch({ type: FETCH_PDF_DATA });
    axios
      .get('#')
      .then(res => {
        dispatch({ type: FETCH_PDF_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_PDF_FAILURE, payload: err.message });
      });
  };
};
