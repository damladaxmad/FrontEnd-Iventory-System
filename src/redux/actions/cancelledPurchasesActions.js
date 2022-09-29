import { ActionTypes } from "../constants/action-types";

export const setCancelledPurchases = (data) => {
  return {
    type: ActionTypes.SET_CANCELLED_PURCHASES,
    payload: data,
  };
};