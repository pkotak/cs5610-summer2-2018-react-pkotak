import React from 'react';
import ModuleList from "./ModuleList";

export default class CourseEditor
    extends React.Component{

    constructor(props){
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: ''};
    }

    selectCourse(courseId){
        this.setState({courseId: courseId});
    }

    componentDidMount(){
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light"><h3>Course ID: {this.state.courseId}</h3>
                </nav>
                <ModuleList courseId={this.state.courseId}/>
            </div>
        );
    }
}