import React from 'react';
import LessonService from "../services/LessonService";
import LessonTabItem from "../components/LessonTabItem";
import LessonEditor from '../containers/LessonEditor';
import {BrowserRouter as Router,Route} from 'react-router-dom';

export default class LessonsTab
    extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedLesson: 0,
            moduleId: '', courseId: '',
            lesson: {title: ''}, lessons:[]
        }

        this.selectLesson = this.selectLesson.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setLessonTitle(event){
        this.setState({
            lesson: {
                title: event.target.value
            }
        });
    }

    setLessons(lessons){
        this.setState({lessons : lessons})
    }

    selectLesson(lessonIndex){
        this.setState({selectedLesson: lessonIndex});
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.findAllLessonsForModule(this.props.moduleId, this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setState({selectedLesson: 0});
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.moduleId, newProps.courseId);

    }

    createLesson(){
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule(this.state.moduleId, this.state.courseId);
            })
    }

    deleteLesson(lessonId){
        this.lessonService.deleteLesson(lessonId)
            .then(() => {
               this.findAllLessonsForModule(this.state.moduleId, this.state.courseId)
            });
    }

    findAllLessonsForModule(moduleId, courseId){
        this.lessonService.findAllLessonsForModule(moduleId, courseId)
            .then((lessons) => {
                this.setLessons(lessons);
            })
    }

    renderLessons(){
       let lessons = this.state.lessons.map((lesson, index) => {
           let active = this.state.selectedLesson === index ? 'active' : '';
           return (
               <LessonTabItem key={index}
                              position={index}
                              moduleId={this.props.moduleId}
                              courseId={this.props.courseId}
                              active={active}
                              lesson={lesson}
                              select={this.selectLesson}
                              delete={this.deleteLesson}/>
           )
       });

        return (
            <nav>
                <div className="nav nav-tabs" id='nav-tab' role='tablist'>
                    {lessons}
                </div>
            </nav>);
    }

    render() {
        return (
            <Router>
              <div className='container-fluid'>
                  <h4>Lesson Tabs for Course: {this.state.courseId} Module: {this.state.moduleId}</h4>
                  <input className='form-control'
                         onChange={this.setLessonTitle}
                         placeholder='Lesson Name'/>
                  <button onClick={this.createLesson} className="btn btn-success btn-block">Create</button>
                  <ul className="nav nav-tabs">
                      {this.renderLessons()}
                  </ul>
                  <div className='tab-content'>
                    <Route path='/course/:courseId/module/:moduleId/lesson/:lessonId' component={LessonEditor}/>
                  </div>
              </div>
            </Router>
        );
    }
}