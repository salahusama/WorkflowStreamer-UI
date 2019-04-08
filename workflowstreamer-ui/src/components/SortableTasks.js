import React, { PureComponent } from 'react';
import { List, arrayMove } from 'react-movable';

export default class SortableTasks extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        }
    }

    listRenderer(details) {
        return <MyList {...details} />
    }

    itemRenderer(details) {
        return <MyItem {...details} />
    }

    render() {
        const { items } = this.state;
        return (
            <List
                values={items}
                onChange={({ oldIndex, newIndex }) => {
                    this.setState(prevState => ({
                        items: arrayMove(prevState.items, oldIndex, newIndex)
                    }));
                }}
                renderList={(movableProps) => <MyList {...movableProps} />}
                renderItem={(movableProps) => <MyItem {...movableProps} />}
            />
        );
    }
}

class MyList extends PureComponent {
    render() {
        const { props, children } = this.props;
        return (
            <div {...props}>
                {children}
            </div>
        );
    }
}

class MyItem extends PureComponent {
    render() {
        const { props, value } = this.props;
        return (
            <div {...props}>
                {value}
            </div>
        );
    }
}