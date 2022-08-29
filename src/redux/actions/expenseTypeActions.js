import { ActionTypes } from "../constants/action-types";

export const setExpenseType = (data) => {
  return {
    type: ActionTypes.SET_EXPENSE_TYPE,
    payload: data,
  };
};