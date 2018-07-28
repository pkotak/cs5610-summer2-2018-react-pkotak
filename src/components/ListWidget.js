import React from 'react'

export const ListWidget = ({widget, updateWidget}) => {
    let text;
    let ordered;
    let widgetType;
    let widgetName;
    return (
        <div>
            <h1>{widget.name} - Widget</h1>
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
            <textarea ref={node => text = node}
                      className='form-control'
                      value={widget.listItems}
                      onChange={() => {
                          widget.listItems = text.value;
                          updateWidget(widget);
                      }}>
            </textarea>
            <label><input ref={node => ordered = node}
                          type='checkbox'
                          checked={widget.ordered}
                          onClick={() => {
                              widget.ordered = ordered.checked;
                              updateWidget(widget)
                          }}/>Ordered</label>
            <label htmlFor='widgetNameText'>Widget Name</label>
            <input id='widgetNameText'
                   ref={(node) => widgetName = node}
                   className='form-control'
                   onChange={() => {
                       widget.name = widgetName.value;
                       updateWidget(widget);
                   }}/>
            <h4>Preview</h4>
            {(!widget.ordered && widget.listItems !== null) &&
            <ul>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            }
            {(widget.ordered && widget.listItems !== null) &&
            <ol>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
            }
        </div>
    )
}