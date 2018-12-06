import {connect} from 'react-redux'
import WidgetListComponent from '../components/WidgetListComponent'
import * as constants from '../constants/constants'

const stateToPropertyMapper = (state) => ({
    widgets: state.widget.widgets,
    preview: state.widget.preview,
    images: state.widget.images,
    course : state.course.course
})

const dispatcherToPropertyMapper = dispatch => (
    {
        deleteWidget: wid => dispatch({
            type: 'DELETE_WIDGET',
            widgetId: wid
        }),
        createWidget: () => dispatch({
            type: 'CREATE_WIDGET'
        }),
        updateWidget: widget => dispatch({
            type: 'UPDATE_WIDGET',
            widget: widget
        }),
        saveWidgets: () => dispatch({
            type: 'SAVE_WIDGETS'
        }),
        findAllWidgets: (topicId) => {
            fetch(constants.BASE_URL + '/api/topic/' + topicId + '/widget')
                .then(response => (response.json()))
                .then(items => dispatch({type: 'FIND_ALL_WIDGETS', widgets: items}))
        },
        togglePreview: () => dispatch({
            type: 'PREVIEW'
        }),
        moveUp: widget => dispatch({
            type: 'MOVE_UP',
            widget: widget
        }),
        moveDown: widget => dispatch({
            type: 'MOVE_DOWN',
            widget: widget
        }),
        searchGoogleImages: (searchQuery) => {
            fetch(constants.BASE_URL + '/api/image/search/' + searchQuery.replace(' ', '-'))
                .then(response => response.json())
                .then(items => dispatch({type: 'SEARCH_IMAGES', images: items}));
        }
    }
)
const WidgetListContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(WidgetListComponent)

export default WidgetListContainer