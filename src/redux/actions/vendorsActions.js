import { ActionTypes } from "../constants/action-types";

export const setVendors = (data) => {
  return {
    type: ActionTypes.SET_VENDORS,
    payload: data,
  };
};