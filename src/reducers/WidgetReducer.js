let initialState = {
    widgets: [],
    preview: false
}

export const widgetReducer = (
    state = initialState,
    action) => {
    switch (action.type) {
        case 'DELETE_WIDGET':
            return {
                widgets:
                    state.widgets.filter(widget => (
                        widget.id !== action.widgetId)).map(widget => {
                        if (widget.widgetOrder > action.widgetOrder)
                            widget.widgetOrder = widget.widgetOrder--;
                        return widget;
                    })
            }

        case 'CREATE_WIDGET':
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: '',
                        type: 'HEADING',
                        name: 'Default',
                        size: '1',
                        widgetOrder: state.widgets.length + 1
                    }
                ]
            }

        case 'UPDATE_WIDGET':
            return {
                widgets: state.widgets.map(widget => {
                        if (widget.id === action.widget.id) {
                            return action.widget
                        }
                        return widget
                })
            }

        case 'SAVE_WIDGETS':
            var topicId = state.widgets[0].topicId;
            fetch('http://localhost:8080/api/topic/' + topicId + '/widget', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(state.widgets)
            }).then(response => response.json());
            return state;

        case 'FIND_ALL_WIDGETS':
            return {widgets: action.widgets}

        case 'PREVIEW':
            return {
                widgets: state.widgets,
                preview: !state.preview
            }

        case 'MOVE_UP':
            let upState = {
                widgets: state.widgets.map(widget => {
                    if (widget.widgetOrder === (action.widgetOrder - 1))
                        widget.widgetOrder = widget.widgetOrder + 1
                    if (widget.id === action.id)
                        widget.widgetOrder = widget.widgetOrder - 1
                    return Object.assign({}, widget)
                })
            }
            return Object.assign({}, upState);

        case 'MOVE_DOWN':
            let downState = {
                widgets: state.widgets.map(widget => {
                    if (widget.widgetOrder === (action.widgetOrder - 1))
                        widget.widgetOrder = widget.widgetOrder + 1
                    if (widget.id === action.id)
                        widget.widgetOrder = widget.widgetOrder - 1
                    return Object.assign({}, widget)
                })
            }
            return Object.assign({}, downState);

        default:
            return state
    }
}