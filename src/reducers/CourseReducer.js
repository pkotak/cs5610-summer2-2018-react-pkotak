/**
 * Created by Akshay on 11/30/2018.
 */


import { combineReducers, createStore } from 'redux'

let initialState = {
    course :{
    editable : false
}};

export const CourseReducer =(state=initialState,action)=>{
    switch (action.type) {
        case 'SET_SELECTED_COURSE':
            return{
                course : action.payload
            }
        default:
            return state
    }
}