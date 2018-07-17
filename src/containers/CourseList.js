import React from'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

export default class CourseList extends React.Component{
    constructor(){
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.state = {courses: []};
    }

    componentDidMount(){
        this.findAllCourses();
    }

    renderCourseRow(){
        var courses = this.state.courses.map(
            (course) => {
                return <CourseRow key={course.id} course={course} delete={this.deleteCourse}/>
            }
        )

        return(
            courses
        )
    }

    titleChanged(event){
        this.setState({
            course: {title: event.target.value}
        });
    }

    createCourse(){
        this.courseService
            .createCourse(this.state.course)
            .then(() => {this.findAllCourses(); });
    }

    findAllCourses(){
        this.courseService
            .findAllCourses()
            .then((courses) => {
                this.setState({courses : courses});
            })
    }

    deleteCourse(courseId){
        this.courseService
            .deleteCourse(courseId)
            .then(() => {
                this.findAllCourses();
            })
    }

    render(){
        return (
            <div className='container-fluid'>
                <table className='table table-striped'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Title</th>
                            <th>Last Modified</th>
                            <th>&nbsp;</th>
                        </tr>
                        <tr>
                            <th><input onChange={this.titleChanged} className="form-control" id="titleFld" placeholder="cs101"/></th>
                            <th>&nbsp;</th>
                            <th><button onClick={this.createCourse} className="btn btn-primary" id="addBtn"> <i className="fa fa-plus"></i></button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCourseRow()}
                    </tbody>
                </table>
            </div>
        )
    }
}