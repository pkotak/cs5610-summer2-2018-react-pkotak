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
                    <Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}</Link>
                </td>
                <td>{this.props.course.modified}</td>
                <td><button className="btn btn-danger" onClick={() => {this.deleteCourse(this.props.course.id)}}>
                        Remove
                    </button>
                </td>
            </tr>
        )
    }
}