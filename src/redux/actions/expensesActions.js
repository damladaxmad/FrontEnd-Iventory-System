import { ActionTypes } from "../constants/action-types";

export const setExpenses = (data) => {
  return {
    type: ActionTypes.SET_EXPENSES,
    payload: data,
  };
};