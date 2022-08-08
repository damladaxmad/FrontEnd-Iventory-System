import { ActionTypes } from "../constants/action-types";

export const setSales = (data) => {
  return {
    type: ActionTypes.SET_SALES,
    payload: data,
  };
};