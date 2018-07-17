import React from 'react';
import LessonService from "../services/LessonService";
import LessonTabItem from "../components/LessonTabItem";

export default class LessonsTab
    extends React.Component{
    constructor(props){
        super(props);
        this.state={
            moduleId: '', courseId: '',
            lesson: {title: ''}, lessons:[]
        }

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

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.moduleId, newProps.courseId)

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
       let lessons = this.state.lessons.map((lesson) =>
           <LessonTabItem key={lesson.id}
                          moduleId={this.props.moduleId}
                          courseId={this.props.courseId}
                          lesson={lesson}
                          delete={this.deleteLesson}/>
       )

        return (
            <nav>
                <ul className="nav nav-pills nav-justified">
                    {lessons}
                </ul>
            </nav>);
    }

    render() {
        return (
          <div className='container-fluid'>
              <table className='table'>
                  <tbody>
                    <tr>
                        <td>
                            <input value={this.state.lesson.title}
                                   className='form-control'
                                   onChange={this.setLessonTitle}/>
                        </td>
                        <td>
                            <button onClick={this.createLesson} className="btn btn-primary">Create</button>
                        </td>
                    </tr>
                  </tbody>
              </table>
              {this.renderLessons()}
          </div>
        );
    }
}