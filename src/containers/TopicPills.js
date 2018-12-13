import React from 'react'
import TopicService from '../services/TopicService'
import TopicEditor from './TopicEditor'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
export default class TopicPills extends React.Component{
    constructor(props){
        super(props);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.toggleAddTopicView = this.toggleAddTopicView.bind(this);
        this.topicService = TopicService.instance;
        this.state={
            moduleId: '', courseId: '', lessonId: '', topic:{title: ''}, topics: [],
            selectedTopic: 0,
            showView: false
        }
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
        this.findAllTopicsForLesson(this.props.lessonId, this.props.moduleId, this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.lessonId, newProps.moduleId, newProps.courseId);
    }

    toggleAddTopicView(){
        this.setState({showView: !(this.state.showView)});
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    setTopics(topics){
        this.setState({topics: topics});
    }

    selectTopic = index => {
        this.setState({selectedTopic: index})
    }

    findAllTopicsForLesson(lessonId, moduleId, courseId){
        this.topicService.findAllTopicsForLesson(lessonId, moduleId, courseId)
            .then((topics) => {
                this.setTopics(topics);
            })
    }

    titleChanged(event) {
        this.setState({topic: {title : event.target.value}});
    }

    createTopic(){
        this.topicService.createTopic(this.state.lessonId, this.state.moduleId, this.state.courseId, this.state.topic)
            .then(() => {
                this.findAllTopicsForLesson(this.state.lessonId,this.state.moduleId,this.state.courseId);
            });
    }

    deleteTopic(topicId) {
        this.topicService.deleteTopic(topicId)
            .then(() => {
                this.findAllTopicsForLesson(this.state.lessonId,this.state.moduleId,this.state.courseId);
            });
    }

    renderTopics() {
        let topics = this.state.topics.map((topic, i) => {
            let active = i === this.state.selectedTopic ? 'active' : '';
            return (
                <Link
                    to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${topic.id}`}>
                    <li className="nav-item"
                        onClick={() => this.selectTopic(i)}
                        key={i}>
                        <a className={`nav-link ${active}`}>
                            <div style={{color: 'black'}}>{topic.title}</div>
                            {(this.props.editable)?
                            <i className='fa fa-times ml-2' onClick={() => this.deleteTopic(topic.id)}/> : null}
                        </a>
                    </li>
                </Link>
            )
        });

        if (this.state.showView) {
            return (
                <div className='container-fluid'>
                    <div className='row'>
                        {topics}
                        <li className='nav-item'>
                            <button className="btn btn-outline-info" onClick={() => {this.toggleAddTopicView()}}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </li>
                        <div className="input-group mt-2 mb-2">
                            <input className='form-control'
                                   onChange={this.titleChanged}
                                   placeholder='Topic'/>
                            <div>
                                <button className='btn btn-primary'
                                        onClick={this.createTopic}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>);
        }else {
            return (
            <div className='container-fluid'>
                <div className='row'>
                    {topics}
                    {(this.props.editable)?
                        <li className='nav-item'>
                            <button className="btn btn-outline-info" onClick={() => {
                                this.toggleAddTopicView()
                            }}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </li>:null
                    }
                </div>
            </div>);
        }
    }

    render() {
        return(
            <div>
                <ul className="nav nav-pills">
                    {this.renderTopics()}
                </ul>
                <div className='tab-content'>
                    <Route path='/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId'
                           component={TopicEditor}/>
                </div>
            </div>
        )
    }
}

const mapStatetoProps=(state)=>{
    return{
        course : state.course
    }
}

// connect(mapStatetoProps)(TopicPills)
