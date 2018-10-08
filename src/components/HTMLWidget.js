/**
 * Created by Akshay on 9/29/2018.
 */

import React from 'react'

import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';



export const HTMLWidget = ({preview, widget, updateWidget}) => {
    let text;
    let widgetType;
    widget.html = (widget.html)? widget.html : ""
    console.log(widget);
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
                    <option value='HTML'>HTML widget</option>

                </select>
                <label htmlFor='html'>HTML Text</label>
                <FroalaEditor tag="textarea"
                              model={widget.html}
                              onModelChange={(updatedHTML)=>{
                                  widget.html = updatedHTML;
                                  updateWidget(widget);
                              }}
                />

            </div>
            <h4>Preview </h4>
            {widget.html}
        </div>
    )
}
/*

<Editor id="html"
        editorState={widget.html}
        onEditorStateChange={(updatedHTML)=>{
            widget.html = updatedHTML;
            //console.log(updatedHTML)
            updateWidget(widget);

            {console.log(widget)}
        }}

/>*/
