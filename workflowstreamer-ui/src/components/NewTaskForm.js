import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, InputGroup, FormGroup, Intent, Button, TextArea } from "@blueprintjs/core";
import { addTask } from '../actions/app';
import ProjectSelector from './ProjectSelector';
import StageSelector from './StageSelector';
import AppToaster from '../utils/AppToaster';

class NewTaskForm extends PureComponent {
    constructor(props) {
        super(props);

        this.addTask = this.addTask.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleStageChange = this.handleStageChange.bind(this);
        this.state = {
            form: {
                title: null,
                description: null,
                projectId: null,
                stage: null,
            }
        }
    }

    handleTitleChange(event) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                title: event.target.value,
            }
        });
    }

    handleDescriptionChange(event) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                description: event.target.value,
            }
        });
    }

    handleProjectChange(project) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                projectId: project && project.projectId,
            }
        });
    }

    handleStageChange(stage) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                stage: stage,
            }
        });
    }

    addTask(e) {
        const { projectId, stage, description } = this.state.form;
        e.preventDefault();

        if (!projectId) {
            AppToaster.show({
                message: 'Please select the project this task belongs to.',
                intent: Intent.DANGER,
            });
            return;
        }

        if (!stage) {
            AppToaster.show({
                message: 'Please select the stage this task is in.',
                intent: Intent.DANGER,
            });
            return;
        }

        this.props.addTask(this.state.form);
        this.props.onSubmit();
    }

    render() {
        return (
            <Card>
                <form onSubmit={this.addTask}>
                    <FormGroup label="Add a New Task">
                        <InputGroup onChange={this.handleTitleChange} large={true} type="text" placeholder="Title" style={{ marginBottom: '10px' }} required />
                        <TextArea onChange={this.handleDescriptionChange} large={true} fill={true} type="text" placeholder="Description" style={{ marginBottom: '10px' }} />
                        <ProjectSelector onSelect={this.handleProjectChange} minimal={false} filterable={false} />
                        <StageSelector onSelect={this.handleStageChange} className="new-task-stage" />
                        <br />
                        <Button type="submit" intent={Intent.SUCCESS} className="new-task-submit">Add Task</Button>
                    </FormGroup>
                </form>
            </Card>
        );
    }
}

NewTaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
};

function mapStateToProps(dispatch) {
    return {
        addTask: (task) => dispatch(addTask(task)),
    }
};

export default connect(null, mapStateToProps)(NewTaskForm);