import React from 'react';
import {Link} from 'react-router-dom';

export default class CourseCard extends React.Component {
    constructor(props){
        super(props);
    }

    deleteCourse(courseId){
        this.props.delete(courseId);
    }
    render(){
        return(
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/course/${this.props.course.id}/edit`}>{this.props.course.title}</Link>
                        </h5>
                        <p className="card-text">
                            Created: {this.props.course.created}
                        </p>
                        <button className="btn btn-danger btn-block" onClick={() => {this.deleteCourse(this.props.course.id)}}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </div>
                    <div className='card-footer'>
                        <small className="text-muted">Last updated {this.props.course.modified}</small>
                    </div>
                </div>
        )
    }

}