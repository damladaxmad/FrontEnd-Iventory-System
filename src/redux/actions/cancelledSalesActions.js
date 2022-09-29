import { ActionTypes } from "../constants/action-types";

export const setCancelledSales = (data) => {
  return {
    type: ActionTypes.SET_CANCELLED_SALES,
    payload: data,
  };
};