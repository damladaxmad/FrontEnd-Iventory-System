import { ActionTypes } from "../constants/action-types";


const initState = {
  isLogin: false,
  isReports: false
};


export const isLoginReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_IS_LOGIN:
      return { ...state, isLogin: payload };
    case ActionTypes.SET_IS_REPORTS:
      return { ...state, isReports: payload };
    default:
      return state;
  }
};