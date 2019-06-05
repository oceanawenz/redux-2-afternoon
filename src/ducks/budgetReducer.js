import axios from 'axios';

//set initial state for the store
const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

//create action type called REQUEST_BUDGET_DATA
const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';
const ADD_PURCHASE = 'ADD_PURCHASE';
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const requestBudgetData = () => {
    let data = axios.get('/api/budget-data').then(res => res.data ) 
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data 
    }
}

//addPurchase action creator that will make an http request to add a new purchase.
//takes in 3 parameters (price, description, category)
export const addPurchase = (price, description, category) => {
    let data = axios.post('/api/budget-data/purchase' ,{
        description,
        price,
        category
    }).then(res => res.data)
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

export const removePurchase = (id) => {
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}



export default function reducer(state = initialState, action) {
   switch(action.type) {
       //when the http request is pending
       case REQUEST_BUDGET_DATA + '_PEDNDING':
           //loading should be true
            return {...state, loading: true}
        //when the http request is fulfilled,
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            // update redux store state and change loading back to false
            return {...state, ...action.payload, loading: false}
        // when the ADD_PURCHASE request is pending
        case ADD_PURCHASE + '_PENDING':
            //loading should be true
            return {...state, loading: true}
        //when ADD_PURCHASE REQUEST is fulfilled
        case ADD_PURCHASE + '_FULFILLED':
            //update state and change loading back to false
            return {...state, purchases: action.payload, loading: false}
        //when REMOVE_PURCHASE request is pending
        case REMOVE_PURCHASE + '_PENDING':
            //loading should be true
            return {...state, loading: true}
        //when REMOVE_PURCHASE request is fulfilled
        case REMOVE_PURCHASE + '_FULFILLED':
            //update state and change loading back to false
            return {...state, purchase: action.payload, loading: false}


        default:
             return state
   }  
}