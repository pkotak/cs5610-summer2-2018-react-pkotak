import React from 'react';
import {Link} from 'react-router-dom';

export default class LessonTabItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <li className='nav-item'
                onClick={() => {this.props.select(this.props.position)}}
                key={this.props.position}>
                <div className='col-sm-12'>
                    <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                        <a className={'nav-link '+this.props.active}>
                            {this.props.lesson.title}
                            <i className="fa fa-times ml-2" onClick={() => {
                                this.props.delete(this.props.lesson.id)
                            }}/>
                        </a>
                    </Link>
                </div>
            </li>
        )
    }
}