import { ActionTypes } from "../constants/action-types";
const intialState = {
  purchases: []
};

export const purchasesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PURCHASES:
      return { ...state, purchases: payload };
    default:
      return state;
  }
};