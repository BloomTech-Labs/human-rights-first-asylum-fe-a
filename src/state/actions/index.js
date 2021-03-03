import axios from 'axios';
export const SEND_PDF_DATA = 'SEND_PDF_DATA'; /* send raw pdf data to backend */
export const FETCH_PDF_DATA =
  'FETCH_PDF_DATA'; /* get extracted data from ds  */
export const FETCH_PDF_SUCCESS = 'FETCH_PDF_SUCCESS';
export const FETCH_PDF_FAILURE = 'FETCH_PDF_FAILURE';
export const ADD_CASE_DATA = 'ADD_CASE_DATA';

export const GET_DATA = 'GET_DATA';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAIL = 'GET_DATA_FAIL';

export const sendPdf = pdfFile => {
  return dispatch => {
    dispatch({ type: SEND_PDF_DATA });
    axios.post('#', pdfFile).then(res => {
      dispatch({ type: ADD_CASE_DATA, payload: res.data });
    });
  };
};

export const fetchPdf = id => {
  return dispatch => {
    dispatch({ type: FETCH_PDF_DATA });
    axios
      .get(`${process.env.REACT_APP_API_URI}/case/${id}`)
      .then(res => {
        dispatch({ type: FETCH_PDF_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_PDF_FAILURE, payload: err.message });
      });
  };
};

export const getData = () => {
  return dispatch => {
    dispatch({ type: GET_DATA });
    axios
      .get('#')
      .then(res => {
        dispatch({ type: GET_DATA_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_DATA_FAIL, payload: err.message });
      });
  };
};

export default {
  sendPdf,
  fetchPdf,
  getData,
};
