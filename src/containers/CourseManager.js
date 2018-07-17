import React, {Component} from 'react';
import CourseEditor from './CourseEditor';
import CourseList from "./CourseList";
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class CourseManager
    extends Component{
    render(){
        return (
                <Router>
                    <div className="container-fluid">
                        <Route path="/courses" component={CourseList}/>
                        <Route path="/course/:courseId/edit" component={CourseEditor}/>
                    </div>
                </Router>
        )
    }
}