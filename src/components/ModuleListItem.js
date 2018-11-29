import React from 'react';
import {Link} from 'react-router-dom';
export default class ModuleListItem
    extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
                <li className={'list-group-item list-group-item-action '+this.props.active}
                    onClick={() => {this.props.select(this.props.position)}}>
                    <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                        <h7 style={{color: 'black'}}>{this.props.title}</h7>
                    </Link>
                    {(this.props.isAdmin) ?
                    <span className="pull-right">
                        <button className='btn bg-transparent' onClick={() => {
                            this.props.delete(this.props.module.id);
                        }}>
                            <i className="fa fa-trash"></i>
                        </button>
                        <i className="fa fa-pencil"></i>
                    </span> : null}
                </li>
        );
    }
}