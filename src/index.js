import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import CourseManager from './containers/CourseManager';
import '../node_modules/font-awesome/css/font-awesome.css';
import $ from 'jquery';
window.$ = window.jQuery = $;
ReactDOM.render(
    <CourseManager/>,
    document.getElementById('root')
);