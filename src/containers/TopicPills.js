import React from 'react';
import TopicService from '../services/TopicService';
export default class TopicPills extends React.Component{
    constructor(props){
        super(props);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.topicService = TopicService.instance;
        this.state={
            moduleId: '', courseId: '', lessonId: '', topics: [],
            selectedTopic: 0
        }
    }

    componentDidMount() {
        this.selectTopic(0);
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
        this.findAllTopicsForLesson(this.props.lessonId, this.props.moduleId, this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectTopic(0);
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.lessonId, newProps.moduleId, newProps.courseId);
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

    renderTopics(){
        let topics =  this.state.topics.map((topic, i) => {
            let active = i === this.state.selectedTopic ? 'active' : '';
            return(
                <li className="nav-item"
                    onClick={() => this.selectTopic(i)}
                    key={i}>
                    <a className={`nav-link ${active}`}>{topic.title}</a>
                </li>
            )
        });

        return (topics);
    }

    render() {
        return(
            <div>
                <h2>Topics</h2>
                <ul className="nav nav-pills">
                    {this.renderTopics()}
                </ul>
            </div>
        )
    }
}