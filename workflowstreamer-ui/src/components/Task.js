import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Card, Overlay, Elevation } from "@blueprintjs/core";
import TaskOverlay from './TaskOverlay';

class Task extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggleOverlay() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    getProjectName(id) {
        const { projects } = this.props;
        const project = projects.find(({projectId}) => projectId === id);
        return project && project.name;
    }

    dragTask(e, taskId) {
        e.dataTransfer.setData("taskId", taskId);
    }

    render() {
        const { task, task: { taskId, title, projectId, isRecommended } } = this.props;
        const { isOpen } = this.state;
        const taskClasses = classNames({
            'task-item': true,
            'recommended-task': isRecommended,
        });

        return (
            <div>
                <Card
                    interactive={true}
                    className={taskClasses}
                    onClick={this.toggleOverlay}
                    draggable
                    onDragStart={(e) => this.dragTask(e, taskId)}
                    elevation={Elevation.ONE}
                >
                    <div>{title}</div>
                    <div className="task-project-name">{this.getProjectName(projectId)}</div>
                </Card>
                <Overlay
                    className="mid-overlay"
                    backdropClassName="overlay-backdrop"
                    isOpen={isOpen}
                    onClose={this.toggleOverlay}
                >
                    <TaskOverlay task={task} />
                </Overlay>
            </div>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
};

export default connect(state => ({
    projects: state.projects.projects,
}))(Task);
