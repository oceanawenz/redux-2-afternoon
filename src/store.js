import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import budgetReducer from './ducks/budgetReducer';
import userReducer from './ducks/userReducer';

//Create a variable called rootReducer. 
//It's value will be the result of calling combineReducers.
const rootReducer = combineReducers({
    budget: budgetReducer,
    //imported userReducer from above and added it to the combined reducer object with property of user.
    user: userReducer
})

//export the created store using createStore
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));