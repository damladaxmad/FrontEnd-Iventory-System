import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardReducer";
import { customersReducer } from "./customersReducer";
import { productsReducer } from "./productsReducer";
import { usersReducer } from "./usersReducer";
import { companyInfoReducer } from "./companyInfoReducer";
import { activeUserReducer } from "./activeUserReducer";
import { employeesReducer } from "./employeesReducer"; 
import { isLoginReducer } from "./isLoginReducer";
import { orderListReducer } from "./orderListReducer";

const reducers = combineReducers({
  dashboard: dashboardReducer,
  customers: customersReducer,
  products: productsReducer,
  orderList: orderListReducer,
  users: usersReducer,
  companyInfo: companyInfoReducer,
  activeUser: activeUserReducer,
  employees: employeesReducer,
  isLogin: isLoginReducer,
});
export default reducers;
