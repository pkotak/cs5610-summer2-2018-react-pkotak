import React, {Component} from 'react';
import CourseEditor from './CourseEditor';
import CourseList from "./CourseList";
import Login from '../components/Login'
import UserRoles from './UserRoles'

import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {widgetReducer} from "../reducers/WidgetReducer";
import {store} from '../reducers/CombineReducers'
//let store = getStore();

store.subscribe(()=>{
    console.log(store.getState())
})

export default class CourseManager
    extends Component{

    render(){
        return (
            <Provider store={store}>
                <Router>
                    <div className="container-fluid">
                        <Route path="/courses" component={CourseList}/>
                        <Route path="/course/:courseId" component={CourseEditor}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/roles" component={UserRoles} />
                    </div>
                </Router>
            </Provider>
        )
    }
}