/**
 * Created by Akshay on 11/30/2018.
 */

import {CourseReducer} from './CourseReducer'
import {widgetReducer} from './WidgetReducer'
import {combineReducers,createStore } from 'redux'


const rootReducer = combineReducers({
    course : CourseReducer,
    widget : widgetReducer
});

export const store = createStore(rootReducer);

