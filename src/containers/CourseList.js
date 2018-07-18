import React from'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";
import '../styles/styles.css';

export default class CourseList extends React.Component{
    constructor(){
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.renderDate = this.renderDate.bind(this);
        this.state = {course:{},courses: []};
    }

    componentDidMount(){
        this.findAllCourses();
    }

    renderDate(date){
        if(date !== null)
            return (date.slice(0,date.indexOf('T')) + ', ' +
                    date.slice(date.indexOf('T')+1, date.indexOf('.')));
        else
            return null;
    }

    renderCourseRow(){
        var courses = this.state.courses.map(
            (course) => {
                var updatedCourse = {
                    id: course.id,
                    title: course.title,
                    modified: this.renderDate(course.modified),
                    created: course.created,
                    modules: course.modules
                }
                // course.modified = this.renderDate(course.modified);
                return <CourseRow key={course.id} course={updatedCourse} delete={this.deleteCourse}/>
            }
        )

        return(
            courses
        )
    }

    titleChanged(event){
        var currentDate = new Date().toISOString();
        this.setState({
            course: {title: event.target.value, created: currentDate, modified: currentDate}
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
            <div>
                <div className='heading-bar'>
                    <table className='table table-borderless'>
                        <thead>
                            <tr>
                                <th width="20%"><h4>Course Manager</h4></th>
                                <th width="60%"><input onChange={this.titleChanged}
                                           className="form-control"
                                           id="titleFld"
                                           placeholder="cs101"/></th>
                                <th width="40%" className='pull-right'><button onClick={this.createCourse}
                                            className="btn btn-primary btn-block"
                                            id="addBtn">
                                    <i className='fa fa-plus'></i>
                                </button>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div>
                    <table className='table table-striped'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Title</th>
                                <th>Owner</th>
                                <th>Last Modified</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCourseRow()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}