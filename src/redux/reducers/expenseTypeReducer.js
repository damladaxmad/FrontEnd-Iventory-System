import { ActionTypes } from "../constants/action-types";
const intialState = {
    expenseType: []
};

export const expenseTypeReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EXPENSE_TYPE:
      return { ...state, expenseType: payload };
    default:
      return state;
  }
};