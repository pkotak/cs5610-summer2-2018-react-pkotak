import React, {Component} from 'react';
import CourseEditor from './CourseEditor';
import CourseList from "./CourseList";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {widgetReducer} from "../reducers/WidgetReducer";

let store = createStore(widgetReducer);

export default class CourseManager
    extends Component{

    render(){
        return (
            <Provider store={store}>
                <Router>
                        <div className="container-fluid">
                            <Route path="/courses" component={CourseList}/>
                            <Route path="/course/:courseId" component={CourseEditor}/>
                        </div>
                </Router>
            </Provider>
        )
    }
}