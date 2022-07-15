import { ActionTypes } from "../constants/action-types";
const intialState = {
  vendors: []
};

export const vendorsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_VENDORS:
      return { ...state, vendors: payload };
    default:
      return state;
  }
};