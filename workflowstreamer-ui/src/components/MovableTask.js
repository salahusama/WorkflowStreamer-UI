import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Card, Overlay, Elevation, Popover, Menu, MenuItem } from "@blueprintjs/core";
import TaskOverlay from './TaskOverlay';

class MovableTask extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isOverlayOpen: false,
            isMenuOpen: false,
        };
    }

    toggleOverlay() {
        console.log('wth');
        
        const { isOverlayOpen } = this.state;
        this.setState({ isOverlayOpen: !isOverlayOpen });
    }

    toggleMenu(e) {
        const { isMenuOpen } = this.state;
        e.preventDefault();
        this.setState({ isMenuOpen: !isMenuOpen });
    }

    getProjectName(id) {
        const { projects } = this.props;
        const project = projects && projects.find(({projectId}) => projectId === id);
        return project && project.name;
    }

    render() {
        const { movableProps, userStages, onStageUpdate } = this.props;
        const { isOverlayOpen, isMenuOpen } = this.state;

        const task = movableProps.value;
        const { taskId, title, projectId, isRecommended, stage } = task;

        const taskClasses = classNames({
            'task-item': true,
            'recommended-task': isRecommended,
        });

        return (
            <div {...movableProps.props}>
                <Popover
                    isOpen={isMenuOpen}
                    content={
                        <Menu>
                            <MenuItem text="Move To...">
                                {userStages.map((stageName, index) => (
                                    <MenuItem
                                        key={index}
                                        text={stageName}
                                        disabled={stageName === stage}
                                        onClick={() => onStageUpdate(taskId, stageName)}
                                    />
                                ))}
                            </MenuItem>
                        </Menu>
                    }
                >
                    <Card
                        interactive={true}
                        className={taskClasses}
                        elevation={Elevation.ONE}
                        onContextMenu={this.toggleMenu}
                    >
                        {/* eslint-disable jsx-a11y/anchor-is-valid */}
                        <a onClick={this.toggleOverlay} style={{ color: 'inherit' }}>{title}</a>
                        <div className="task-project-name">{this.getProjectName(projectId)}</div>
                    </Card>
                </Popover>
                <Overlay
                    className="mid-overlay"
                    backdropClassName="overlay-backdrop"
                    isOpen={isOverlayOpen}
                    onClose={this.toggleOverlay}
                >
                    <TaskOverlay task={task} />
                </Overlay>
            </div>
        );
    }
}

MovableTask.propTypes = {
    projects: PropTypes.array.isRequired,
    userStages: PropTypes.array.isRequired,
    onStageUpdate: PropTypes.func.isRequired,
};

export default connect(state => ({
    projects: state.projects.projects,
    userStages: state.userStages,
}))(MovableTask);
