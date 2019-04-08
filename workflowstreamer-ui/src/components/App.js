import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Alignment, Tooltip, Position } from '@blueprintjs/core';
import SortableTasks from './SortableTasks';
import NewTaskForm from './NewTaskForm';
import ProjectSelector from './ProjectSelector';
import { updateSelectedProject } from '../actions/app';
import UserMenu from './UserMenu';
import ScreenOpener from './ScreenOpener';
import ProjectScreen from './ProjectScreen';
// import StageScreen from './StageScreen';
import MenuOpener from './MenuOpener';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.setSelectedProject = this.setSelectedProject.bind(this);
    }

    setSelectedProject(project) {
        this.props.updateSelectedProject(project);
    }

    render() {
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
                        {/* Stages are universal. This has no point for now */}
                        {/* <Navbar.Divider />
                        <Tooltip content="Stage Settings" position={Position.BOTTOM}>
                            <ScreenOpener icon="exchange">
                                <StageScreen />
                            </ScreenOpener>
                        </Tooltip> */}
                        <Navbar.Divider />
                        <Tooltip content="New Task" position={Position.BOTTOM}>
                            <ScreenOpener icon="insert" toggleOnSubmit={true}>
                                <NewTaskForm />
                            </ScreenOpener>
                        </Tooltip>
                    </Navbar.Group>

                    <Navbar.Group align={Alignment.RIGHT}>
                        <UserMenu />
                    </Navbar.Group>
                </Navbar>

                <SortableTasks />
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
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);