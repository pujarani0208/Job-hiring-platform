import {
    JOB_NOT_POSTED,
    JOB_NOT_APPLIED,
    JOB_POSTED,
    JOB_APPLIED,
    GET_JOBS,
    GET_APPLIED_JOBS,
    GET_JOBS_FAILS,
    GET_APPLIED_JOBS_FAILS
  } from "../actions/types";
  
  
  const initialState = {
    jobs: [],
    jobApplied: []
  };
  
  export default function (state = initialState, action) {
  
    switch (action.type) {
      case GET_JOBS:
        return {
          ...state,
          jobs: action.payload
        };
  
      case GET_APPLIED_JOBS:
        return {
          ...state,
          jobApplied: action.payload
        };
      default:
          return state;
    }
  
  }