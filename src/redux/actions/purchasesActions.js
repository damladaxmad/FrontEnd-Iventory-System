import { ActionTypes } from "../constants/action-types";

export const setPurchases = (data) => {
  return {
    type: ActionTypes.SET_PURCHASES,
    payload: data,
  };
};