import React from 'react'

export const YoutubeWidget = ({widget, updateWidget, preview}) => {
    let iFrameUrl = '';
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
                    <option value='YOUTUBE'>Youtube Widget</option>
                </select>
                <label htmlFor='urlText'>URL</label>
                <input id='urlText'
                       ref={node => iFrameUrl = node}
                       onChange={() => {
                           var id = iFrameUrl.value.substring(iFrameUrl.value.lastIndexOf('/'));
                           widget.iFrame = id;
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
            <iframe width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${widget.iFrame}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen/>
            <iframe width="560"
                    height="315"
                    frameBorder="0"
                    src="https://docs.google.com/document/d/e/2PACX-1vR5LGjQwR6SaXg5jdZMlFVA8-s2YqjfSY7zlpYMQkdmPoEywYbjKHEO0YQTSBpvkAOuzEBnw_FxKsR6/pub?embedded=true">
                allowFullScreen
            </iframe>
            <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vRwPL4Rkvxh7SyxhRz8eLhj-8dqx99QRfhdf_BMLQw6BJ0xaWdzj5jd-Tx5F-UhjiO-9TIJmpUrK-fk/embed?start=false&loop=false&delayms=3000"
                frameBorder="0" width="560" height="315" allowFullScreen="true" mozallowfullscreen="true"
                webkitallowfullscreen="true"></iframe>
        </div>
    )
}