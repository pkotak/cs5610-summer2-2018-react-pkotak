import React from 'react';

export const ParagraphWidget = ({preview, widget, updateWidget,editable}) => {
    let text;
    let widgetType;
    let widgetName;
    return (
        <div>
            {(editable)?
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
                    <option value='HTML'>HTML widget</option>
                    <option value='YOUTUBE'>Youtube Widget</option>
                    <option value='SLIDE'>Google Slides Widget</option>
                    <option value='DOC'>Google Doc Widget</option>
                </select>
                <label htmlFor='paraText'>Paragraph Text</label>
                <textarea id='paraText'
                          className="form-control"
                          placeholder="Paragraph Content"
                          onChange={() => {
                              widget.text = text.value;
                              updateWidget(widget);
                          }}
                          value={widget.text}
                          ref={node => text = node}/>
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
            </div> : null}
            <p>{widget.text}</p>
        </div>
    )
}