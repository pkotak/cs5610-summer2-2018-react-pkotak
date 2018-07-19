import React from 'react';
import {Route} from 'react-router-dom';
import LessonEditor from './LessonEditor';
import LessonsTab from "./LessonsTab";

export default class ModuleEditor extends React.Component {
    constructor(props){
        super(props);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.state = {
            courseId: '', moduleId: ''
        };
    }

    setCourseId(courseId){
        this.setState(
            {courseId: courseId}
        );
    }

    setModuleId(moduleId){
        this.setState(
            {moduleId: moduleId}
        );
    }

    componentDidMount(){
        this.setCourseId(
            this.props.match.params.courseId
        );

        this.setModuleId(
            this.props.match.params.moduleId
        );
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(
            newProps.match.params.courseId
        );

        this.setModuleId(
            newProps.match.params.moduleId
        );
    }
    render(){
        return (
            <div className="container-fluid">
                <LessonsTab moduleId={this.state.moduleId} courseId={this.state.courseId}/>
                <div className="tab-content">
                    <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonEditor}/>
                </div>
            </div>
    );
    }
}