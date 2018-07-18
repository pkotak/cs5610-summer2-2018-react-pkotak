import React from 'react';

export default class LessonEditor extends React.Component{
    constructor(props){
        super(props);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.state={
            courseId: '', moduleId: '', lessonId: ''
        };
    }

    setCourseId(courseId){
        this.setState({courseId : courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId){
        this.setState({lessonId: lessonId});
    }

    componentDidMount(){
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setLessonId(this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setLessonId(newProps.match.params.lessonId);
    }
    render(){
        return(
            <div>
                <h1>Lesson Editor</h1>
                <h6>Course: {this.state.courseId}</h6>
                <h6>Module: {this.state.moduleId}</h6>
                <h6>Lesson: {this.state.lessonId}</h6>
            </div>
        );

    }
}