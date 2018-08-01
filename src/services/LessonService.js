import * as constants from '../constants/constants'

let _singleton = Symbol();

export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate');
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton];
    }

    findAllLessonsForModule(moduleId, courseId){
        return fetch(constants.BASE_URL + '/api/course/cId/module/mId/lesson'
            .replace('cId', courseId)
            .replace('mId', moduleId))
            .then((response) => {
                return response.json();
            })
    }

    deleteLesson(lessonId){
        return fetch(constants.BASE_URL + '/api/lesson/lId'.replace('lId', lessonId), {
            method: 'delete',
            headers: {'Content-Type' : 'application/json'}
        }).then((response) => {
            return response.text();
        });
    }

    createLesson(courseId, moduleId, lesson){
        return fetch(constants.BASE_URL + '/api/course/cId/module/mId/lesson'
            .replace('cId', courseId)
            .replace('mId', moduleId), {
            method: 'post',
            body: JSON.stringify(lesson),
            headers: {'content-type': 'application/json'}
        }).then((response) => {
                return response.json();
            }
        );
    }

}