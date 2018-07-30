import React from 'react'

export const ImageWidget = ({preview, updateWidget, widget}) => {
    let text;
    let widgetType;
    let widgetName;
    return (
        <div>
            <div hidden={preview}>
                <h3>{widget.name} - Widget</h3>
                <select ref={node => widgetType = node}
                        className='float-right'
                        onChange={() => {
                            widget.type = widgetType.value;
                            updateWidget(widget);
                        }}
                        value={widget.type}>
                    <option value='HEADING'>Heading Widget</option>
                    <option value='LIST'>List Widget</option>
                    <option value='PARAGRAPH'>Paragraph Widget</option>
                    <option value='IMAGE'>Image Widget</option>
                    <option value='LINK'>Link Widget</option>
                </select>
                <label htmlFor='urlText'>Image URL</label>
                <input id='urlText'
                       ref={node => text = node}
                       onChange={() => {
                           widget.src = text.value;
                           updateWidget(widget);
                       }}
                       value={widget.src}
                       className='form-control'
                       placeholder='Image URL'/>
                <label htmlFor='widgetNameText'>Widget Name</label>
                <input id='widgetNameText'
                       ref={(node) => widgetName = node}
                       className='form-control'
                       value={widget.name}
                       onChange={() => {
                           widget.name = widgetName.value;
                           updateWidget(widget);
                       }}/>
                <h3>Preview</h3>
            </div>
            <img width='600px' height='200px' src={widget.src}/>
        </div>
    )
}