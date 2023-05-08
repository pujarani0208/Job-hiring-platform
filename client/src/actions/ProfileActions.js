import axios from "axios";
import { returnStatus } from "./statusActions";

import {
  GET_PROFILE,
  PROFILE_SAVED,
  IS_LOADING,
  PROFILE_ERROR,
  PROFILE_NOT_SAVED
} from "./types";

export const saveProfile = ({userId, gender ,_id,  uniqueIdentity, description, firstName, lastName, contactNo, address, email }) => (dispatch) => {
    // Headers
    const body = JSON.stringify({ userId, gender ,_id, uniqueIdentity, description, firstName, lastName, contactNo, address, email });
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // Request body
  console.log(body);
    axios
      .post("/api/profile/saveProfile", JSON.parse(body), headers)
      .then((res) =>{
        dispatch(returnStatus(res.data, res.status, 'PROFILE_SAVED_SUCCESSFULLY'));
      })
      .catch((err) => {
        dispatch(returnStatus(err.response.data, err.response.status, PROFILE_NOT_SAVED))
        dispatch({
          type: PROFILE_NOT_SAVED
        });
        dispatch({ type: IS_LOADING })
      });
  };
  