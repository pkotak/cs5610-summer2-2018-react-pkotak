import React from 'react';

export default class ModuleListItem
    extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <li className="list-group-item">
                {this.props.title}
                <span className="pull-right">
                    <button className='btn bg-transparent' onClick={() => {
                        this.props.delete(this.props.module.id);
                    }}>
                        <i className="fa fa-trash"></i>
                    </button>
                    <i className="fa fa-pencil"></i>
                </span>
            </li>
        );
    }
}