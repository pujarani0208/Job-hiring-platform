import axios from "axios";
import { returnStatus } from "./statusActions";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_JOB_FAIL,
  GET_JOBS_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  IS_LOADING,
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

export const applyJobForm = ({ userId, gender , uniqueIdentity, location, description, personName, contactNo, contactPersonProfile, address, email }) => (dispatch) => {
  // Headers
  const body = JSON.stringify({ userId, gender , uniqueIdentity, location, description, personName, contactNo, contactPersonProfile, address, email });
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

  try{
      const response = await fetch('/api/jobs/getAllPostedJobs');
      const data = await response.json();
      return dispatch(data['job']);
  }catch(error) {
      return [];
  }
  
}