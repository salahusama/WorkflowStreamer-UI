import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Alignment, Tooltip, Position } from '@blueprintjs/core';
import Tasks from './Tasks';
import NewTaskForm from './NewTaskForm';
import ProjectSelector from './ProjectSelector';
import { getTeams, updateSelectedProject } from '../actions/app';
import UserMenu from './UserMenu';
import ScreenOpener from './ScreenOpener';
import ProjectScreen from './ProjectScreen';
import StageScreen from './StageScreen';
import MenuOpener from './MenuOpener';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.setSelectedProject = this.setSelectedProject.bind(this);
    }

    componentWillMount() {
        this.props.getTeams();
    }

    setSelectedProject(project) {
        this.props.updateSelectedProject(project);
    }

    render() {
        const { teamId } = this.props.match.params;

        return (
            <div>
                <Navbar fixedToTop={true}>
                    <Navbar.Group align={Alignment.LEFT}>
                        <MenuOpener />
                        <Navbar.Divider />
                        <ProjectSelector onSelect={this.setSelectedProject} allowAll={true} />
                        <Navbar.Divider />
                        <Tooltip content="Project Screen" position={Position.BOTTOM}>
                            <ScreenOpener icon="projects">
                                <ProjectScreen />
                            </ScreenOpener>
                        </Tooltip>
                        <Navbar.Divider />
                        <Tooltip content="Stage Settings" position={Position.BOTTOM}>
                            <ScreenOpener icon="exchange">
                                <StageScreen />
                            </ScreenOpener>
                        </Tooltip>
                        <Navbar.Divider />
                        <Tooltip content="New Task" position={Position.BOTTOM}>
                            <ScreenOpener icon="insert" toggleOnSubmit={true}>
                                <NewTaskForm />
                            </ScreenOpener>
                        </Tooltip>
                    </Navbar.Group>

                    <Navbar.Group align={Alignment.RIGHT}>
                        <UserMenu currTeamId={Number(teamId)} />
                    </Navbar.Group>
                </Navbar>

                <Tasks />
            </div>
        );
    }
}

App.propTypes = {
    user: PropTypes.object.isRequired,
    updateSelectedProject: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedProject: (project) => dispatch(updateSelectedProject(project)),
        getTeams: () => dispatch(getTeams()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);