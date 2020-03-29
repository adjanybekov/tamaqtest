import { UserActionTypes } from "./user.types"

export const setCurrentUser=(truefalse)=>{
    return{
        type:UserActionTypes.SIGN_IN,
        payload:truefalse
    }
}