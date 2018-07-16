import React from 'react';

export default class LessonsTab
    extends React.Component{
    render() {
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item"><a className="nav-link active"
                                            href="#">Active Bar</a>
                </li>
                <li className="nav-item"><a className="nav-link"
                                            href="#">Another Tab</a>
                </li>
            </ul>
        );
    }
}