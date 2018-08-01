import * as constants from '../constants/constants'

const MODULE_API_URL = constants.BASE_URL + '/api/course/cId/module';

let _singleton = Symbol();

export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('cId', courseId),
            {   body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    findAllModulesForCourse(courseId) {
        return fetch(MODULE_API_URL.replace('cId', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    deleteModule(moduleId) {
        return fetch(constants.BASE_URL + '/api/module/mId'.replace('mId', moduleId),
            {
                method: 'delete',
                headers: {'Content-Type' : 'application/json'}
            })
            .then(function (response) {
                return response.text();
            });
    }
}
