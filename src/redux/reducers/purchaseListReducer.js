import { ActionTypes } from "../constants/action-types";
const intialState = {
  purchaseList: []
};

export const purchaseListReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PURCHASE_LIST:
      return { ...state, purchaseList: payload };
    default:
      return state;
  }
};