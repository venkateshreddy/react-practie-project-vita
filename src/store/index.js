import studentReducer from './students/reducer';
import employeeReducer from './employees/reducer';
import departmentReducer from './departments/reducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const middlewares = applyMiddleware(logger);

const combinedReducer = combineReducers({
    studentsReducer: studentReducer,
    employeesReducer: employeeReducer,
    departmentsReducer: departmentReducer
})

const store = createStore(combinedReducer, middlewares);

export default store;