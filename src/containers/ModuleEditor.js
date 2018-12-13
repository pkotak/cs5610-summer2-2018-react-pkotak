import React from 'react';
import LessonsTab from "./LessonsTab";
import {connect} from 'react-redux'
class ModuleEditor extends React.Component {
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
                <LessonsTab editable={this.props.course.editable} moduleId={this.state.moduleId} courseId={this.state.courseId}/>
            </div>
    );
    }
}

const mapStatetoProps=(state)=>{
    return{
        course : state.course.course
    }
}

export default connect(mapStatetoProps)(ModuleEditor)