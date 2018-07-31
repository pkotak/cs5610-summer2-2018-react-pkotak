import {connect} from 'react-redux'
import WidgetListComponent from '../components/WidgetListComponent'

const stateToPropertyMapper = (state) => ({
    widgets: state.widgets,
    preview: state.preview,
    images: state.images
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
            fetch('http://localhost:8080/api/topic/' + topicId + '/widget')
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
            fetch('http://localhost:8080/api/image/search/' + searchQuery.replace(' ', '-'))
                .then(response => response.json())
                .then(items => dispatch({type: 'SEARCH_IMAGES', images: items}));
        }
    }
)
const WidgetListContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(WidgetListComponent)

export default WidgetListContainer