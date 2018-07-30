import React from 'react'
import {HeadingWidget} from "./HeadingWidget";
import {ListWidget} from "./ListWidget";
import {ParagraphWidget} from "./ParagraphWidget";
import {ImageWidget} from "./ImageWidget";
import {LinkWidget} from "./LinkWidget";

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
                <button className='btn btn-success float-right'
                        onClick={this.props.saveWidgets}>
                    Save
                </button>
                <button className='btn btn-success float-right'
                        onClick={this.props.togglePreview}>
                    Toggle Preview
                </button>
                <h1>Widget List</h1>
                <ul className='list-group'>
                    {this.props.widgets.map((widget, index) => {
                            widget.topicId = this.props.topicId;
                            return (<li className='list-group-item'
                            key={index}>
                                <div hidden={this.props.preview}>
                                    <button className='btn btn-danger float-right ml-1'
                                            onClick={() => this.props.deleteWidget(widget.id)}>
                                        <i className='fa fa-times'/>
                                    </button>
                                    <button className='btn btn-warning float-right ml-1'>
                                        <i className='fa fa-arrow-up'/>
                                    </button>
                                    <button className='btn btn-warning float-right '>
                                        <i className='fa fa-arrow-down'/>
                                    </button>
                                </div>
                            <div>
                                {widget.type === 'LIST' &&
                                <ListWidget preview={this.props.preview} widget={widget}
                                            updateWidget={this.props.updateWidget}/>}
                                {widget.type === 'HEADING' &&
                                <HeadingWidget preview={this.props.preview} widget={widget}
                                               updateWidget={this.props.updateWidget}/>}
                                {widget.type === 'PARAGRAPH' &&
                                <ParagraphWidget preview={this.props.preview} widget={widget}
                                                 updateWidget={this.props.updateWidget}/>}
                                {widget.type === 'IMAGE' &&
                                <ImageWidget preview={this.props.preview} widget={widget}
                                             updateWidget={this.props.updateWidget}/>}
                                {widget.type === 'LINK' &&
                                <LinkWidget preview={this.props.preview} widget={widget}
                                            updateWidget={this.props.updateWidget}/>}
                            </div>
                            </li>)
                        }
                    )}
                </ul>
                <button className='btn btn-info float-right mt-2'
                        onClick={() => {
                            this.props.createWidget()
                        }}>
                    <i className='fa fa-plus-circle'/>
                </button>
            </div>
        )
    }
}