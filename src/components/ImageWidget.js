import React from 'react'

export const ImageWidget = ({preview, updateWidget, widget, searchImages, images}) => {
    let text;
    let search;
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
<<<<<<< HEAD
                    <option value='HTML'>HTML widget</option>
=======
                    <option value='YOUTUBE'>Youtube Widget</option>
                    <option value='SLIDE'>Google Slides Widget</option>
                    <option value='DOC'>Google Doc Widget</option>
>>>>>>> iframe
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

                <div className="input-group mb-3 mt-2">
                    <div className="input-group-prepend">
                            <span className="input-group-text"
                                  id="basic-addon1">
                                 <i className="fa fa-search"></i>
                            </span>
                    </div>
                    <input id='imageSearchText'
                           placeholder='Google Search Images'
                           className='form-control'
                           ref={(node) => search = node}/>
                    <button className='btn btn-outline-success ml-2 mt-2'
                            onClick={() => {
                                searchImages(search.value);
                            }}>
                        Search
                    </button>
                </div>
                {/*<button className='btn btn-success mt-2'*/}
                {/*onClick={() => {*/}
                {/*searchImages(search.value);*/}
                {/*}}>*/}
                {/*Search*/}
                {/*</button>*/}
                <h3>Preview</h3>
            </div>
            <img width='200px'
                 height='200px'
                 src={widget.src}/>
            {images !== undefined &&
            images.map((img) => {
                return <img src={img}
                            width='200px'
                            onClick={() => {
                                widget.src = img;
                                updateWidget(widget);
                            }}
                            height='200px'/>
            })}
        </div>
    )
}