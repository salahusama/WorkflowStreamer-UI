import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Position, Button, Icon, Menu, MenuItem, Intent, Popover } from '@blueprintjs/core';
import { logout } from '../actions/app';

class Tasks extends PureComponent {
    constructor(props) {
        super(props);
        this.togglePopover = this.togglePopover.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.state = {
            isOpen: false,
            newTeamId: null,
        };
    }

    togglePopover() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    changeTeam(newTeamId) {
        this.setState({ newTeamId });
    }

    render() {
        const { isOpen, newTeamId } = this.state;
        const { teams, currTeamId, location: { pathname } } = this.props;

        if (newTeamId && newTeamId !== currTeamId) {
            const target = pathname.split('/').slice(-1)[0];
            return <Redirect to={{ pathname: `/${newTeamId}/${target}` }} />
        }

        return (
            <Popover
                isOpen={isOpen}
                position={Position.BOTTOM_LEFT}
            >
                <Button minimal={true} onClick={this.togglePopover}>
                    <Icon icon="user" iconSize={20} />
                </Button>
                <Menu>
                    <MenuItem text="Change Team">
                        {teams.map(({ teamId, name }) => (
                            <MenuItem
                                key={teamId}
                                text={name}
                                intent={teamId === currTeamId ? Intent.PRIMARY : Intent.NONE}
                                onClick={() => this.changeTeam(teamId)}
                            />
                        ))}
                    </MenuItem>
                    <MenuItem text="Logout" intent={Intent.WARNING} onClick={this.props.logout} />
                </Menu>
            </Popover>
        );
    }
}

Tasks.propTypes = {
    logout: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
    currTeamId: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
    teams: state.auth.user.teams,
});

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tasks));