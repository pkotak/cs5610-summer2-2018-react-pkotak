import React from 'react';
import ModuleList from "./ModuleList";
import CourseService from '../services/CourseService';
import {connect} from 'react-redux'

 class CourseEditor
    extends React.Component{

    constructor(props){
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.courseService = CourseService.instance;
        this.state = {
            courseId:'',
            course:{
                modules:[{
                    title: '',
                    lessons: [{
                        title:'',
                        topics:[{
                            title:''
                        }]
                    }]
                }]
            }
        };
    }

    selectCourse(courseId){
        this.setState({courseId: courseId});
    }

    componentDidMount(){
        this.selectCourse(this.props.match.params.courseId);
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then(course => {
                this.setState({course: course})
                this.props.dispatch(setSelectedCourse(course))
                console.log(this.props.course)
            });
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light"><h3>{this.state.course.title}</h3>
                </nav>
                <ModuleList course={this.props.course} courseId={this.state.courseId}/>

            </div>
        );
    }
}

const setSelectedCourse =(course)=>{
    return{
        type:"SET_SELECTED_COURSE",
        payload:course
    }
}

const mapStatetoProps=(state)=>{
    return{
        course : state.course.course
    }
}

export default connect(mapStatetoProps)(CourseEditor)


