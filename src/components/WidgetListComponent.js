import React from 'react'
import {HeadingWidget} from "./HeadingWidget";
import {ListWidget} from "./ListWidget";
import {ParagraphWidget} from "./ParagraphWidget";
import {ImageWidget} from "./ImageWidget";
import {LinkWidget} from "./LinkWidget";
import ToggleButton from 'react-toggle-button';
import {HTMLWidget} from './HTMLWidget'
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import {YoutubeWidget} from "./YouTubeWidget";
import {GoogleSlideWidget} from "./GoogleSlideWidget";
import {GoogleDocWidget} from "./GoogleDocWidget";
import {connect} from 'react-redux'

 export default class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
        if (newProps.topicId !== this.props.topicId) {
            this.props.findAllWidgets(newProps.topicId);
        }
    }

    render() {
        return (
            <div className='mb-4'>

                {(this.props.course.editable)?
                <div>
                    <button className='btn btn-success float-right'
                        onClick={this.props.saveWidgets}>
                    Save
                </button>
                <div className='float-right mr-4 mt-2'>
                    <ToggleButton value={this.props.preview}
                                  onToggle={this.props.togglePreview}/>
                </div>

                <h5 className='float-right mr-2'>Preview</h5>
                </div>
                    :null}
                <h1>Widget List</h1>
                <ul className='list-group'>
                    {this.props.widgets.sort((w1, w2) => w1.position - w2.position).map((widget, index) => {
                            widget.topicId = this.props.topicId;
                        widget.position = index;
                        return (
                            <li className='list-group-item'
                                key={index}>
                                {(this.props.editable)?
                                <div hidden={this.props.preview}>
                                    <button className='btn btn-danger float-right ml-1'
                                            onClick={() => this.props.deleteWidget(widget.id)}>
                                        <i className='fa fa-times'/>
                                    </button>
                                    <button className='btn btn-warning float-right ml-1'
                                            hidden={widget.position === 0}
                                            onClick={() => this.props.moveUp(widget)}>
                                        <i className='fa fa-arrow-up'/>
                                    </button>
                                    <button className='btn btn-warning float-right'
                                            onClick={() => this.props.moveDown(widget)}>
                                        <i className='fa fa-arrow-down'/>
                                    </button>
                                </div> : null}

                                <div>
                                    {widget.type === 'LIST' &&
                                    <ListWidget preview={this.props.preview} widget={widget}
                                                updateWidget={this.props.updateWidget}
                                                editable = {this.props.editable}
                                    />}
                                    {widget.type === 'HEADING' &&
                                    <HeadingWidget preview={this.props.preview} widget={widget}
                                                   updateWidget={this.props.updateWidget}
                                                   editable = {this.props.editable}/>}
                                    {widget.type === 'PARAGRAPH' &&
                                    <ParagraphWidget preview={this.props.preview} widget={widget}
                                                     updateWidget={this.props.updateWidget}
                                                     editable = {this.props.editable}/>}
                                    {widget.type === 'IMAGE' &&
                                    <ImageWidget preview={this.props.preview}
                                                 widget={widget}
                                                 updateWidget={this.props.updateWidget}
                                                 images={this.props.images}
                                                 searchImages={this.props.searchGoogleImages}
                                                 editable = {this.props.editable}/>}
                                    {widget.type === 'LINK' &&
                                    <LinkWidget preview={this.props.preview} widget={widget}
                                                updateWidget={this.props.updateWidget}
                                                editable = {this.props.editable}/>}
                                    {widget.type=== 'HTML' &&
                                    <HTMLWidget preview={this.props.preview} widget={widget}
                                                updateWidget={this.props.updateWidget}
                                                editable = {this.props.editable}/>


                                    }
                                    {widget.type === 'YOUTUBE' &&
                                    <YoutubeWidget preview={this.props.preview} widget={widget}
                                                updateWidget={this.props.updateWidget}
                                                   editable = {this.props.editable}/>}
                                    {widget.type === 'SLIDE' &&
                                    <GoogleSlideWidget preview={this.props.preview} widget={widget}
                                                   updateWidget={this.props.updateWidget}
                                                       editable = {this.props.editable}/>}
                                    {widget.type === 'DOC' &&
                                    <GoogleDocWidget preview={this.props.preview} widget={widget}
                                                       updateWidget={this.props.updateWidget}
                                                     editable = {this.props.editable}/>}
                                </div>
                            </li>)
                        }
                    )}
                </ul>
                {(this.props.course.isEditable)?
                <button className='btn btn-info float-right mt-2'
                        onClick={() => {
                            this.props.createWidget()
                        }}>
                    <i className='fa fa-plus-circle'/>
                </button> : null}
            </div>
        )
    }
}

