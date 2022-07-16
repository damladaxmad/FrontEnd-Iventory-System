import { ActionTypes } from "../constants/action-types";
const intialState = {
  products: [],
  availableProducts: []
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.SET_AVAILABLE_PRODUCTS:
      return { ...state, availableProducts: payload };
    default:
      return state;
  }
};