import React from 'react'
import {HeadingWidget} from "./HeadingWidget";
import {ListWidget} from "./ListWidget";
import {ParagraphWidget} from "./ParagraphWidget";
import {ImageWidget} from "./ImageWidget";
import {LinkWidget} from "./LinkWidget";

export default class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgets();
    }

    render() {
        return (
            <div className='mb-4'>
                <button className='btn btn-success float-right'
                        onClick={this.props.saveWidgets}>Save
                </button>
                <h1>Widget List ({this.props.widgets.length})</h1>
                <ul className='list-group'>
                    {this.props.widgets.map((widget, index) =>
                        <li className='list-group-item'
                            key={index}>
                            <button className='btn btn-danger float-right'
                                    onClick={() => this.props.deleteWidget(widget.id)}>
                                <i className='fa fa-times'/>
                            </button>
                            <button className='btn btn-warning float-right'>
                                <i className='fa fa-arrow-up'/>
                            </button>
                            <button className='btn btn-warning float-right'>
                                <i className='fa fa-arrow-down'/>
                            </button>
                            <div>
                                {widget.type === 'LIST' &&
                                <ListWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.type === 'HEADING' &&
                                <HeadingWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.type === 'PARAGRAPH' &&
                                <ParagraphWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.type === 'IMAGE' &&
                                <ImageWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.type === 'LINK' &&
                                <LinkWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                            </div>
                        </li>
                    )}
                </ul>
                <button className='btn btn-info float-right mt-2'
                        onClick={() => {
                            let widget = {
                                name: '',
                                id: ((new Date()).getTime()).toString().slice(0, 4),
                                type: 'HEADING'
                            };
                            this.props.createWidget(widget)
                        }}>
                    <i className='fa fa-plus-circle'/>
                </button>
            </div>
        )
    }
}