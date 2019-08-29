import axios from "axios";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

//Get lead
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("api/leads/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Delete lead
export const deleteLead = id => (dispatch, getState) => {
  axios
    .delete(`api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ leadDeleted: "Lead deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Add lead
export const addLead = lead => (dispatch, getState) => {
  axios
    .post("api/leads/", lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ leadAdded: "Lead added" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
