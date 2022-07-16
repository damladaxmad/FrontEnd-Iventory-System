import { ActionTypes } from "../constants/action-types";

export const setProducts = (data) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: data,
  };
};
export const setAvailableProducts = (data) => {
  return {
    type: ActionTypes.SET_AVAILABLE_PRODUCTS,
    payload: data,
  };
};