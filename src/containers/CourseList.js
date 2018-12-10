import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";
import '../styles/styles.css';
import Sidebar from 'react-sidebar';
import CourseCard from "../components/CourseCard";
import {connect} from 'react-redux'
class CourseList extends React.Component{
    constructor(){
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.renderDate = this.renderDate.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.renderView = this.renderView.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.state = {view: 'list', course: {}, courses: [], sidebarOpen: false};
    }

    onSetSidebarOpen = function(open) {
        this.setState({sidebarOpen: open});
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

    renderView(){
        if(this.state.view === 'list'){
            return (
                <table className='table table-striped'>
                    <thead className='thead-light'>
                    <tr>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Last Modified</th>
                        <th>Created</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRow()}
                    </tbody>
                </table>
            );
        }
        else {
            return (
                <div className='card-deck'>
                    {this.renderCourseRow()}
                </div>
            )
        }
    }

    renderCourseRow(){
        var courses = this.state.courses.map(
            (course, index) => {
                var updatedCourse = {
                    id: course.id,
                    title: course.title,
                    modified: this.renderDate(course.modified),
                    created: this.renderDate(course.created),
                    modules: course.modules
                }

                if(this.state.view === 'list')
                    return <CourseRow key={index} course={updatedCourse} delete={this.deleteCourse}
                                      faculty={this.props.user.faculty} />
                else
                    return <CourseCard key={index} course={updatedCourse} delete={this.deleteCourse}
                                       faculty={this.props.user.faculty}
                    />
            }
        )

        return(
            courses
        )
    }

    toggleView(){
        if(this.state.view === 'list')
            this.setState({view: 'tabs'});
        else
            this.setState({view: 'list'});
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
                <Sidebar sidebar={<div className='container side-bar'>
                    <ul className='list-group'>
                        <li className='list-inline-item'>
                            <h4>Option 1</h4>
                        </li>
                        <li className='list-inline-item'>
                            <h4>Option 2</h4>
                        </li>
                        <li className='list-inline-item'>
                            <h4>Option 3</h4>
                        </li>
                        <li className='list-inline-item'>
                            <h4>Option 4</h4>
                        </li>
                    </ul>
                </div>}
                         open={this.state.sidebarOpen}
                         onSetOpen={this.onSetSidebarOpen}>
                    <div className='heading-bar'>
                        <table className='table table-borderless'>
                            <thead>
                            <tr>
                                <th><i className='fa fa-bars' onClick={this.onSetSidebarOpen}></i></th>
                                <th width="20%"><h4>Course Manager</h4></th>
                                <th width="60%"><input onChange={this.titleChanged}
                                                       className="form-control"
                                                       id="titleFld"
                                                       placeholder="cs101"/></th>
                                {(this.props.user.faculty)?
                                <th width="70%" className='pull-right'>
                                    <button onClick={this.createCourse}
                                            className="btn btn-primary btn-block"
                                            id="addBtn">
                                        <i className='fa fa-plus'></i>
                                    </button>
                                </th>:null}

                                <th>
                                    <button onClick={this.toggleView}
                                            className='btn btn-warning'
                                            id='toggleBtn'>
                                        <i className='fa fa-th'></i>
                                    </button>
                                </th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div>
                        {this.renderView()}
                    </div>
                </Sidebar>
            </div>
        )
    }
}

const mapStatetoProps=(state)=>{
    return{
        user : state.user
    }
}

export default connect(mapStatetoProps)(CourseList)