import { ActionTypes } from "../constants/action-types";
const intialState = {
  cancelledSales: []
};

export const cancelledSalesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CANCELLED_SALES:
      return { ...state, cancelledSales: payload };
    default:
      return state;
  }
};