import React, { PureComponent } from 'react';
import { List, arrayMove } from 'react-movable';

let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

export default class SortableTasks extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        }
    }

    listRenderer(details) {
        const { props, children } = details;
        return (
            <div {...props}>
                {children}
            </div>
        );
    }

    itemRenderer(details) {
        const { props, value } = details;
        return (
            <div {...props}>
                {value}
            </div>
        );
    }

    render() {
        console.log(items)
        return (
            <List
                values={items}
                onChange={({ oldIndex, newIndex }) => {
                    console.log({ oldIndex, newIndex })
                    items = arrayMove(items, oldIndex, newIndex)
                }}
                renderList={this.listRenderer}
                renderItem={this.itemRenderer}
            />
        );
    }
}