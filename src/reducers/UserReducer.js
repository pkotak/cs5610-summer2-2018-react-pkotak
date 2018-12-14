/**
 * Created by Akshay on 12/10/2018.
 */

const initialState = {faculty : false}
export const userReducer = (state=initialState,action)=>{
    switch(action.type){

        case 'SET_USER':
            return {
                faculty : action.payload.primaryRole==='FACULTY',
                userInfo : action.payload
            }

        default:
            return state
    }
}