import React from 'react';
import {Link} from 'react-router-dom';

export default class LessonTabItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className='nav-pills' data-toggle='tab' role='tab'>
                    <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                        {this.props.lesson.title}
                    </Link>
                    <button className="btn bg-transparent" onClick={() => {
                        this.props.delete(this.props.lesson.id)}}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </div>
        )
    }
}