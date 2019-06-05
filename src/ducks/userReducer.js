import axios from 'axios';




//this reducer will manage the logged in user's data
const initialState = {
    email: null,
    firstName: null,
    lastName: null
}



const REQUEST_USER_DATA = 'REQUEST_USER_DATA';

//action creator function that makes an http request for user data
export const requestUserData = () => {
    //gets user data then sends the data response
let data = axios.get('/auth/user-data').then(res => res.data)
    //the action that is returned from the action creator has the type and payload properties.
    return {
        //type is the action (REQUEST_USER_DATA)
        type: REQUEST_USER_DATA,
        //payload is response from the http request
        payload: data 
    }
}









//export default the reducer function. 
//This function will take in state and action a paramenters. initialState will be the default value for state parameter.
export default function reducer(state = initialState, action) {
    //switch tests for the value of action.type
    switch(action.type) {
        //when the action of REQUEST_USER_DATA is fulfilled return a new state obj with email, firstName and lastName
        case REQUEST_USER_DATA + '_FULFILLED':
            //destructure email, firtName, lastName from action.payload.user
            const { email, firstName, lastName } = action.payload.user
            return {email, firstName, lastName}
    }
   
   
    return state
  }