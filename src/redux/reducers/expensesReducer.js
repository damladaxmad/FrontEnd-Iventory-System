import { ActionTypes } from "../constants/action-types";
const intialState = {
    expenses: []
};

export const expensesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EXPENSES:
      return { ...state, expenses: payload };
    default:
      return state;
  }
};