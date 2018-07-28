import {connect} from 'react-redux'
import WidgetListComponent from '../components/WidgetListComponent'


const stateToPropertyMapper = state => ({
    widgets: state.widgets
})

const dispatcherToPropertyMapper = dispatch => (
    {
        deleteWidget: wid => dispatch({
            type: 'DELETE_WIDGET',
            widgetId: wid
        }),
        createWidget: widget => dispatch({
            type: 'CREATE_WIDGET',
            widget: widget
        }),
        updateWidget: widget => dispatch({
            type: 'UPDATE_WIDGET',
            widget: widget
        }),
        saveWidgets: () => dispatch({
            type: 'SAVE_WIDGETS'
        }),
        findAllWidgets: () => {
            fetch('http://localhost:8080/api/widget')
                .then(response => (response.json()))
                .then(items => dispatch({type: 'FIND_ALL_WIDGETS', widgets: items}))
        }
    }
)
const WidgetListContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(WidgetListComponent)

export default WidgetListContainer