import { ActionTypes } from "../constants/action-types";

export const setPurchaseList = (data) => {
  return {
    type: ActionTypes.SET_PURCHASE_LIST,
    payload: data,
  };
};