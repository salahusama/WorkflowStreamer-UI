import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Button, Alignment, Icon, Tooltip, Position, Overlay } from '@blueprintjs/core';
import Tasks from './Tasks';
import NewTaskForm from './NewTaskForm';
import ProjectSelector from './ProjectSelector';
import { updateSelectedProject } from '../actions/app';
class Page extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.setSelectedProject = this.setSelectedProject.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggleOverlay() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    setSelectedProject(project) {
        this.props.updateSelectedProject(project);
    }

    render() {
        // const { user } = this.props;
        const { isOpen } = this.state;

        return (
            <div>
                <Navbar fixedToTop={true}>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Button minimal={true} icon="menu" />
                        <Navbar.Divider />
                        <ProjectSelector onSelect={this.setSelectedProject} allowAll={true} />
                        <Navbar.Divider />
                        <Tooltip content="New Task" position={Position.RIGHT}>
                            <Button minimal={true} rightIcon="insert" onClick={this.toggleOverlay} />
                        </Tooltip>
                        <Overlay
                            className="mid-overlay"
                            backdropClassName="overlay-backdrop"
                            isOpen={isOpen}
                            onClose={this.toggleOverlay}
                        >
                            <NewTaskForm onSubmit={this.toggleOverlay} />
                        </Overlay>
                    </Navbar.Group>

                    <Navbar.Group align={Alignment.RIGHT}>
                        <Button minimal={true}><Icon icon="user" iconSize={20}></Icon></Button>
                    </Navbar.Group>
                </Navbar>

                <Tasks />
            </div>
        );
    }
}

Page.propTypes = {
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
)(Page);