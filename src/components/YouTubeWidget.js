import React from 'react'

export const YoutubeWidget = ({widget, updateWidget, preview, editable}) => {
    let iFrameUrl = '';
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
                    <option value='YOUTUBE'>Youtube Widget</option>
                    <option value='SLIDE'>Google Slides Widget</option>
                    <option value='DOC'>Google Doc Widget</option>
                </select>
                <label htmlFor='urlText'>URL</label>
                <input id='urlText'
                       ref={node => iFrameUrl = node}
                       onChange={() => {
                           var id = iFrameUrl.value.substring(iFrameUrl.value.lastIndexOf('/'));
                           widget.youtubeIframe = id;
                           updateWidget(widget);
                       }}
                       className='form-control'
                       placeholder='Link'/>
                <label htmlFor='widgetNameText'>Widget Name</label>
                <input id='widgetNameText'
                       ref={(node) => widgetName = node}
                       className='form-control'
                       onChange={() => {
                           widget.name = widgetName.value;
                           updateWidget(widget);
                       }}/>
                <h3>Preview</h3>
            </div>
            </div> : null}
            <iframe width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${widget.youtubeIframe}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen/>
        </div>
    )
}