import ActionTypes from '../actions/actionTypes';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';


export function searchPatient(state = [], action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_PATIENT_SUCCESS:
      return action.patientList;
    case ActionTypes.GET_ALL_PATIENT_FAILURE:
      return action.error;
    case ActionTypes.SEARCH_PATIENT_SUCCESS:
      return action.patientList;
    case ActionTypes.SEARCH_PATIENT_FAILURE:
      return action.error;
    default:
      return state;
  }
}

export function getPatientDetail(state = null, action) {
  switch (action.type) {
    case ActionTypes.GET_PATIENT_DETAIL_SUCCESS:
      return action.patientDetail;
    case ActionTypes.GET_PATIENT_DETAIL_FAILURE:
      return action.error;
    default:
      return state;
  }
}

export function filterPatientByStatus(state = null, action) {
  switch (action.type) {
    case ActionTypes.FILTER_PATIENT_BY_STATUS:
      return action.filterStatus;
    default:
      return state;
  }
}

export function filterPatientByTime(state = null, action) {
  switch (action.type) {
    case ActionTypes.FILTER_PATIENT_BY_TIME:
      return action.filterTime;
    default:
      return state;
  }
}

/*export function searchPatient(state = [], action) {
  switch (action.type) {
    case ActionTypes.SEARCH_PATIENT_SUCCESS:
      return action.patientList;
    case ActionTypes.SEARCH_PATIENT_FAILURE:
      return action.error;
    default:
      return state;
  }
}*/

const rootReducer = combineReducers({
  patientList: searchPatient,
  filterStatus: filterPatientByStatus,
  filterTime: filterPatientByTime,
  patientDetail: getPatientDetail,
  routing,
});

export default rootReducer;
