import * as constants from '../constants/constants'

let _singleton = Symbol();
const COURSE_API_URL = constants.BASE_URL + '/api/course'
export default class CourseService{
    constructor(singletonToken) {
        if (_singleton != singletonToken)
            throw new Error('Cannot instantiate');
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton];
    }

    findAllCourses(){
        return fetch(COURSE_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    findCourseById(courseId){
        return fetch(COURSE_API_URL + '/' +courseId)
            .then(function (response) {
                return response.json();
            })
    }

    createCourse(course){
        return fetch(COURSE_API_URL, {
            method : 'post',
            body : JSON.stringify(course),
            headers : {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        })
    }

    deleteCourse(courseId){
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'delete'
        }).then(function (response) {
            return response;
        })
    }

    editCourse(course){
        return fetch(COURSE_API_URL + '/' + course.id), {
            method: 'put',
            body: JSON.stringify(course),
            headers: {'Content-Type': 'application/json'}
        }
    }
}