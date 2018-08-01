import * as constants from '../constants/constants'

let _singleton = Symbol();

export default class TopicService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate');
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton];
    }

    findAllTopicsForLesson(lessonId, moduleId, courseId){
        return fetch(constants.BASE_URL + '/api/course/cId/module/mId/lesson/lId/topic'
            .replace('cId', courseId)
            .replace('mId', moduleId)
            .replace('lId', lessonId))
            .then((response) => {
                return response.json();
            })
    }

    createTopic(lessonId, moduleId, courseId, topic){
        return fetch(constants.BASE_URL + '/api/course/cId/module/mId/lesson/lId/topic'
            .replace('cId', courseId)
            .replace('mId', moduleId)
            .replace('lId', lessonId),{
            method: 'post',
            body: JSON.stringify(topic),
            headers: {
                'content-type': 'application/json'
            }})
            .then((response) => {
                return response.json();
            })
    }

    deleteTopic(topicId) {
        return fetch(constants.BASE_URL + '/api/topic/tId'.replace('tId', topicId), {
            method: 'delete'
        }).then((response) => {
            return response.text();
        })
    }
}