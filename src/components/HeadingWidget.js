import React from 'react'

export const HeadingWidget = ({preview, widget, updateWidget}) => {
    let text;
    let size;
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
                <label htmlFor='text'>Heading Text</label>
                <input id='text'
                       ref={node => text = node}
                       onChange={() => {
                           widget.text = text.value;
                           updateWidget(widget);
                       }}
                       value={widget.text}
                       className='form-control'
                       placeholder='Heading Text'/>
                <label htmlFor='size'>Heading Size</label>
                <select id='size'
                        onChange={() => {
                            widget.size = parseInt(size.value);
                            updateWidget(widget);
                        }}
                        ref={node => size = node}
                        className='form-control'>
                    <option value='1'>Heading 1</option>
                    <option value='2'>Heading 2</option>
                    <option value='3'>Heading 3</option>
                    <option value='4'>Heading 4</option>
                </select>
                <label htmlFor='widgetNameText'>Widget Name</label>
                <input id='widgetNameText'
                       ref={(node) => widgetName = node}
                       className='form-control'
                       value={widget.name}
                       onChange={() => {
                           widget.name = widgetName.value;
                           updateWidget(widget);
                       }}/>
                <h4>Preview</h4>
            </div>
            {widget.size === 1 && <h1>{widget.text}</h1>}
            {widget.size === 2 && <h2>{widget.text}</h2>}
            {widget.size === 3 && <h3>{widget.text}</h3>}
            {widget.size === 4 && <h4>{widget.text}</h4>}
        </div>
    )
}