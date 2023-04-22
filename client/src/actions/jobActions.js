import axios from "axios";
import { returnStatus } from "./statusActions";

import {
  REGISTER_JOB_FAIL,
  GET_JOBS_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  IS_LOADING,
  GET_JOBS_FAILED,
} from "./types";

//Uncomment below for local testing
// axios.defaults.baseURL = "http://localhost:5000";

//uncomment and set url to your own for prod
//axios.defaults.baseURL = "https://demos.shawndsilva.com/sessions-auth-app"

//Register New User
export const postJob = ({ userId, jobTitle, openings, location, salary, description, companyName, personName, contactNo, contactPersonProfile, jobAddress, email }) => (dispatch) => {
  // Headers
  const body = JSON.stringify({ userId, jobTitle, openings, location, salary, description, companyName, personName, contactNo, contactPersonProfile, jobAddress, email });
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
console.log(body);
  axios
    .post("/api/jobs/postJob", JSON.parse(body), headers)
    .then((res) =>{
      dispatch(returnStatus(res.data, res.status, 'REGISTER_SUCCESS'));
    })
    .catch((err) => {
      dispatch(returnStatus(err.response.data, err.response.status, 'REGISTER_FAIL'))
      dispatch({
        type: REGISTER_JOB_FAIL
      });
      dispatch({ type: IS_LOADING })
    });
};

export const applyJobForm = ({ jobId, userId, gender , uniqueIdentity, location, description, personName, contactNo, contactPersonProfile, address, email }) => (dispatch) => {
  // Headers
  const body = JSON.stringify({ jobId, userId, gender , uniqueIdentity, location, description, personName, contactNo, contactPersonProfile, address, email });
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
console.log(body);
  axios
    .post("/api/jobs/applyJobForm", JSON.parse(body), headers)
    .then((res) =>{
      dispatch(returnStatus(res.data, res.status, 'REGISTER_SUCCESS'));
    })
    .catch((err) => {
      dispatch(returnStatus(err.response.data, err.response.status, 'REGISTER_FAIL'))
      dispatch({
        type: REGISTER_JOB_FAIL
      });
      dispatch({ type: IS_LOADING })
    });
};

export const  getAllPostedJobs = () => async (dispatch) => {
  axios
  .get("/api/jobs/getAllPostedJobs")
  .then((res) =>{
    dispatch(returnStatus(res.data, res.status, 'GET_JOBS_SUCCESS'));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, 'GET_JOBS_FAILED'))
    dispatch({
      type: GET_JOBS_FAILED
    });
    dispatch({ type: IS_LOADING })
  });
}


export const  getAllAppliedJobs = () => async (dispatch) => {
  axios
  .get("/api/jobs/getAllAppliedJobs")
  .then((response) =>{
    dispatch(returnStatus(response.data, response.status, 'GET_JOBS_SUCCESS'));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, 'GET_JOBS_FAILED'))
    dispatch({
      type: GET_JOBS_FAILED
    });
    dispatch({ type: IS_LOADING })
  });
}