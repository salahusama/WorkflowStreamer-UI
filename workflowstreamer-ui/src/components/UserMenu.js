import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../actions/app';
import { Position, Button, Icon, Menu, MenuItem, Intent, Popover } from '@blueprintjs/core';

class Tasks extends PureComponent {
    constructor(props) {
        super(props);
        this.togglePopover = this.togglePopover.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    togglePopover() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }
    
    render() {
        const { isOpen } = this.state;

        return (
            <Popover
                isOpen={isOpen}
                position={Position.BOTTOM_LEFT}
            >
                <Button minimal={true} onClick={this.togglePopover}>
                    <Icon icon="user" iconSize={20} />
                </Button>
                <Menu>
                    <MenuItem text="Logout" intent={Intent.WARNING} onClick={this.props.logout} />
                </Menu>
            </Popover>
        );
    }
}

Tasks.propTypes = {
    logout: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
    };
}

export default connect(null, mapDispatchToProps)(Tasks);