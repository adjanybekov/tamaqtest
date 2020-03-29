import { UserActionTypes } from "./user.types";

const INTITIAL_STATE = {
    currentUser:null
}

const userReducer = (state=INTITIAL_STATE,action)=>{
    switch(action.type){
        case UserActionTypes.SIGN_IN:
            // console.log(action,'action.payload');
            return {
                ...state,
                currentUser: action.payload
            }
            
        default:
            return state;
    }
}

export default userReducer;