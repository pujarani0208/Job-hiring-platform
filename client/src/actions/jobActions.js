import axios from "axios";
import { returnStatus } from "./statusActions";

import {
  JOB_NOT_POSTED,
  JOB_NOT_APPLIED,
  JOB_POSTED,
  JOB_APPLIED,
  GET_JOBS,
  GET_APPLIED_JOBS,
  GET_JOBS_FAILS,
  GET_APPLIED_JOBS_FAILS,
  IS_LOADING,
} from "./types";

//Uncomment below for local testing
// axios.defaults.baseURL = "http://localhost:5000";

//uncomment and set url to your own for prod
//axios.defaults.baseURL = "https://demos.shawndsilva.com/sessions-auth-app"

//Register New User
export const postJob = ({ userId, jobTitle, id, openings, location, salary, description, companyName, contactNo, contactPersonName, jobAddress, email }) => (dispatch) => {
  // Headers
  const body = JSON.stringify({ userId, jobTitle, id, openings, location, salary, description, companyName, contactNo, contactPersonName, jobAddress, email });
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
      dispatch(returnStatus(res.data, res.status, JOB_POSTED));
    })
    .catch((err) => {
      dispatch(returnStatus(err.response.data, err.response.status, JOB_NOT_POSTED))
      dispatch({
        type: JOB_NOT_POSTED
      });
      dispatch({ type: IS_LOADING })
    });
};

export const applyJobForm = ({ description, jobId, userId, id}) => (dispatch) => {
  // Headers
  const body = JSON.stringify({ description, jobId, userId, id});
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
      dispatch(returnStatus(res.data, res.status, JOB_APPLIED));
    })
    .catch((err) => {
      dispatch(returnStatus(err.response.data, err.response.status, JOB_NOT_APPLIED))
      dispatch({
        type: JOB_NOT_APPLIED
      });
      dispatch({ type: IS_LOADING })
    });
};

export const  getAllPostedJobs = () => async (dispatch) => {
  axios
  .get("/api/jobs/getAllPostedJobs")
  .then((res) =>{
    dispatch(returnStatus(res.data, res.status, GET_JOBS));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, GET_JOBS_FAILS))
    dispatch({
      type: GET_JOBS_FAILS
    });
    dispatch({ type: IS_LOADING })
  });
}

export const  deleteJobAplication = (id) => async (dispatch) => {
  axios
  .get(`/api/jobs/deleteJobAplication/${id}`)
  .then((res) =>{
    dispatch(returnStatus(res.data, res.status, GET_JOBS));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, GET_JOBS_FAILS))
    dispatch({
      type: GET_JOBS_FAILS
    });
    dispatch({ type: IS_LOADING })
  });
}

export const  deactivateJob = (id) => async (dispatch) => {
  axios
  .get(`/api/jobs/deactivateJob/${id}`)
  .then((res) =>{
    dispatch(returnStatus(res.data, res.status, GET_JOBS));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, GET_JOBS_FAILS))
    dispatch({
      type: GET_JOBS_FAILS
    });
    dispatch({ type: IS_LOADING })
  });
}

export const  declineJobAplication = (id) => async (dispatch) => {
  axios
  .get(`/api/jobs/declineJobAplication/${id}`)
  .then((res) =>{
    dispatch(returnStatus(res.data, res.status, GET_JOBS));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, GET_JOBS_FAILS))
    dispatch({
      type: GET_JOBS_FAILS
    });
    dispatch({ type: IS_LOADING })
  });
}

export const  declineJobAplicant = (id) => async (dispatch) => {
  axios
  .get(`/api/jobs/declineJobAplicant/${id}`)
  .then((res) =>{
    dispatch(returnStatus(res.data, res.status, GET_JOBS));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, GET_JOBS_FAILS))
    dispatch({
      type: GET_JOBS_FAILS
    });
    dispatch({ type: IS_LOADING })
  });
}

export const  acceptJobAplication = (id) => async (dispatch) => {
  axios
  .get(`/api/jobs/acceptJobAplication/${id}`)
  .then((res) =>{
    dispatch(returnStatus(res.data, res.status, GET_JOBS));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, GET_JOBS_FAILS))
    dispatch({
      type: GET_JOBS_FAILS
    });
    dispatch({ type: IS_LOADING })
  });
}

export const  getAllAppliedJobs = () => async (dispatch) => {
  axios
  .get("/api/jobs/getAllAppliedJobs")
  .then((response) =>{
    dispatch(returnStatus(response.data, response.status, GET_APPLIED_JOBS));
  })
  .catch((err) => {
    dispatch(returnStatus(err.response.data, err.response.status, GET_APPLIED_JOBS_FAILS))
    dispatch({
      type: GET_APPLIED_JOBS_FAILS
    });
    dispatch({ type: IS_LOADING })
  });
}