import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Spinner } from '@blueprintjs/core';
import { getTeamMembers } from '../../actions/teamActions';
import Status from '../../constants/status';

class TeamView extends PureComponent {
    componentDidMount() {
        const { team } = this.props;
        this.props.getTeamMembers(team.teamId);
    }

    componentWillReceiveProps(newProps) {
        const { team } = this.props;

        if (team.teamId !== newProps.team.teamId) {
            this.props.getTeamMembers(team.teamId);
        }
    }

    renderMembersTable(members) {
        return (
            <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-striped bp3-interactive">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Role Description</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.roleDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        const { team, members, status } = this.props;

        return (
            <div className="team-view">
                <Card>
                    <h1>{team.name}</h1>
                    <p>{team.description}</p>
                    
                    <h2>Members</h2>

                    {status !== Status.SUCCESS
                    ? <Spinner />
                    : this.renderMembersTable(members)
                    }
                </Card>
            </div>
        );
    }
}

TeamView.protoTypes = {
    team: PropTypes.object.isRequired,
    getTeamMembers: PropTypes.func.isRequired,
    members: PropTypes.array,
    status: PropTypes.string,
};

const mapStateToProps = state => ({
    members: state.teams.members.members,
    status: state.teams.members.status,
});

const mapDispatchToProps = dispatch => ({
    getTeamMembers: (teamId) => dispatch(getTeamMembers(teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);