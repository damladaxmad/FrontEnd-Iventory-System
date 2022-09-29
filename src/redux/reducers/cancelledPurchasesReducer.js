import { ActionTypes } from "../constants/action-types";
const intialState = {
    cancelledPurchases: []
};

export const cancelledPurchasesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CANCELLED_PURCHASES:
      return { ...state, cancelledPurchases: payload };
    default:
      return state;
  }
};