import { ActionTypes } from "../constants/action-types";

export const setOrderList = (data) => {
  return {
    type: ActionTypes.SET_ORDER_LIST,
    payload: data,
  };
};