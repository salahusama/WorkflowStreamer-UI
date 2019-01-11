import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Overlay } from "@blueprintjs/core";

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

    render() {
        const { title, description, projectId } = this.props.task;
        const { isOpen } = this.state;

        return (
            <div>
                <Card
                    interactive={true}
                    className="task-item"
                    onClick={this.toggleOverlay}
                    draggable
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
                    <Card
                        className="overlay-task"
                        interactive={true}
                    >
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </Card>
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
