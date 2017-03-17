import axios from 'axios';
import request from 'request';

import ActionTypes from './actionTypes';

const DEV_API_HOST = "http://localhost:3333";

export const fetchAllPatientSuccess = (patientList) => ({
  type: ActionTypes.GET_ALL_PATIENT_SUCCESS,
  patientList,
});

export const fetchAllPatientFailure = (error) => ({
  type: ActionTypes.GET_ALL_PATIENT_FAILURE,
  error,
});

export const fetchAllPatient = () => (dispatch) => {
  axios.get(`/api/patient-all`)
    .then(function (response) {
      dispatch(fetchAllPatientSuccess(response.data))
    })
    .catch(function (error) {
      dispatch(fetchAllPatientFailure(error))
    });
};

export const searchPatient = (keyword) => (dispatch) => {
  axios.post(`/api/patient-keyword`, {keyword: keyword})
    .then(function (response) {
      console.log(response);
      dispatch(fetchAllPatientSuccess(response.data))
    })
    .catch(function (error) {
      if (error) dispatch(fetchAllPatientFailure(error))  
    });
};

export const callFilterByStatus = (filterStatus) => ({
  type: ActionTypes.FILTER_PATIENT_BY_STATUS,
  filterStatus,
});

export const filterPatientByStatus = (filterStatus) => (dispatch) => {
  dispatch(callFilterByStatus(filterStatus));
};

export const callFilterByTime = (filterTime) => ({
  type: ActionTypes.FILTER_PATIENT_BY_TIME,
  filterTime,
});

export const filterPatientByTime = (filterTime) => (dispatch) => {
  dispatch(callFilterByTime(filterTime));
};

export const getPatientDetailSuccess = (patientDetail) => ({
  type: ActionTypes.GET_PATIENT_DETAIL_SUCCESS,
  patientDetail,
});

export const getPatientDetailFailure = (error) => ({
  type: ActionTypes.GET_PATIENT_DETAIL_FAILURE,
  error,
});

export const getPatientDetail = (patientId) => (dispatch) => {
  axios.get(`/api/patient/${patientId}`)
    .then(function (response) {
      dispatch(getPatientDetailSuccess(response.data))
    })
    .catch(function (error) {
      dispatch(getPatientDetailFailure(error))
    });
};
