import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardReducer";
import { customersReducer } from "./customersReducer";
import { vendorsReducer } from "./vendorsReducer";
import { salesReducer } from "./salesReducer";
import { purchasesReducer } from "./purchasesReducer";
import { productsReducer } from "./productsReducer";
import { usersReducer } from "./usersReducer";
import { companyInfoReducer } from "./companyInfoReducer";
import { activeUserReducer } from "./activeUserReducer";
import { employeesReducer } from "./employeesReducer"; 
import { employeeTitleReducer } from "./employeeTitleReducer"; 
import { expensesReducer } from "./expensesReducer"; 
import { expenseTypeReducer } from "./expenseTypeReducer"; 
import { isLoginReducer } from "./isLoginReducer";
import { orderListReducer } from "./orderListReducer";
import { purchaseListReducer } from "./purchaseListReducer";

const reducers = combineReducers({
  dashboard: dashboardReducer,
  customers: customersReducer,
  vendors: vendorsReducer,
  products: productsReducer,
  sales: salesReducer,
  purchases: purchasesReducer,
  orderList: orderListReducer,
  purchaseList: purchaseListReducer,
  users: usersReducer,
  companyInfo: companyInfoReducer,
  activeUser: activeUserReducer,
  employees: employeesReducer,
  employeeTitle: employeeTitleReducer,
  expenses: expensesReducer,
  expenseType: expenseTypeReducer,
  isLogin: isLoginReducer,

});
export default reducers;
