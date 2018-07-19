let _singleton = Symbol();
const LESSON_API_URL = 'http://localhost:8080';

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
        return fetch(LESSON_API_URL+'/api/course/cId/module/mId/lesson/lId/topic'
            .replace('cId', courseId)
            .replace('mId', moduleId)
            .replace('lId', lessonId))
            .then((response) => {
                return response.json();
            })
    }
}