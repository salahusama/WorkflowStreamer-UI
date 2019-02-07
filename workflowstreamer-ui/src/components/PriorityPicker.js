import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button,Popover, Menu, MenuItem, Position, Intent } from '@blueprintjs/core';
import Priority from '../constants/priority';

class PriorityPicker extends PureComponent {
    constructor(props) {
        super(props)
        this.togglePopover = this.togglePopover.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            isOpen: false,
            selectedPriority: {},
        }
    }

    componentDidMount() {
        const { initial } = this.props;
        const { selectedPriority } = this.state;
        if (initial && !selectedPriority.value) {
            this.setState({
                selectedPriority: Priority.find(priority => priority.value === initial)
            })
        }
    }

    togglePopover() {
        const { isOpen } = this.state
        this.setState({ isOpen: !isOpen })
    }

    handleClick(priority) {
        const { selectedPriority } = this.state
        this.togglePopover()
        if (priority.value !== selectedPriority.value) {
            this.setState({ selectedPriority: priority })
            this.props.onChange(priority.value)
        }
    }

    render() {
        const { isOpen, selectedPriority } = this.state
        const displayText = selectedPriority.value
            ? selectedPriority.value.charAt(0) + selectedPriority.value.slice(1).toLowerCase()
            : 'Select Priority'
        const displayIntent = selectedPriority.intent || Intent.NONE

        return (
            <Popover isOpen={isOpen} position={Position.BOTTOM} content={
                <Menu>
                    {Priority.map((priority, index) => (
                        <MenuItem
                            key={index}
                            intent={priority.intent}
                            text={priority.value.charAt(0) + priority.value.slice(1).toLowerCase()}
                            onClick={() => this.handleClick(priority)}
                        />
                    ))}
                </Menu>
            }>
                <Button
                    text={displayText}
                    rightIcon="caret-down"
                    intent={displayIntent}
                    onClick={this.togglePopover}
                    style={{ marginLeft: '10px' }}
                />
            </Popover>
        )
    }
}

PriorityPicker.propTypes = {
    initial: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default PriorityPicker