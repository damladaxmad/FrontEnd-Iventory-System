import { ActionTypes } from "../constants/action-types";
const intialState = {
  sales: []
};

export const salesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SALES:
      return { ...state, sales: payload };
    default:
      return state;
  }
};