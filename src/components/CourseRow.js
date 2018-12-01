import React from 'react'
import {Link} from 'react-router-dom';

export default class CourseRow extends React.Component{
    constructor(props){
        super(props);
    }

    deleteCourse(courseId){
        this.props.delete(courseId);
    }

    render(){
        return(
            <tr>
                <td>
                    <i className='fa fa-file-text'>&nbsp;</i>
                    <Link to={`/course/${this.props.course.id}`}>
                        {this.props.course.title}</Link>
                </td>
                <td>me</td>
                <td>{this.props.course.modified}</td>
                <td>{this.props.course.created}</td>
                <td><button className="btn btn-danger" onClick={() => {this.deleteCourse(this.props.course.id)}}>
                    <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        )
    }
}