import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, InputGroup, TextArea, Button, Popover, Intent } from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';
import { getDateString, getIntentBasedOnDate } from '../utils/DateUtil';
import { updateTask } from '../actions/app';

class TaskOverlay extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleDatePicker = this.toggleDatePicker.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.state = {
            isOpen: false,
            form: {
                title: null,
                description: null,
                dueDate: null,
            }
        };
    }

    toggleDatePicker() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    handleFormChange(event) {
        const { form } = this.state;
        const field = event.target.name;
        this.setState({
            form: {
                ...form,
                [field]: event.target.value,
            }
        });
    }

    handleDateChange(newDueDate) {
        const { form } = this.state;
        this.toggleDatePicker();
        this.setState({
            form: {
                ...form,
                dueDate: newDueDate && newDueDate.getTime(),
            }
        });
    }

    updateTask() {
        const { form } = this.state;
        this.props.updateTask({
            ...form,
            taskId: this.props.task.taskId,
        });
    }

    render() {
        const { task: { title, description, dueDate } } = this.props;
        const { isOpen, form } = this.state;
        const selectedDueDate = new Date(form.dueDate || dueDate);
        const isTaskEdited = form.title || form.description || form.dueDate;

        return (
            <Card
                className="overlay-task"
                interactive={true}
            >
                <InputGroup
                    name="title"
                    onChange={this.handleFormChange}
                    large={true}
                    type="text"
                    value={form.title || title}
                    style={{ marginBottom: '10px' }}
                    required
                />
                <TextArea
                    name="description"
                    onChange={this.handleFormChange}
                    large={true}
                    fill={true}
                    type="text"
                    value={form.description || description}
                    style={{ marginBottom: '10px' }}
                />

                <Popover isOpen={isOpen}>
                    <Button onClick={this.toggleDatePicker} intent={getIntentBasedOnDate(selectedDueDate)} >
                        {`Due: ${getDateString(selectedDueDate)}`}
                    </Button>
                    <DatePicker
                        value={selectedDueDate}
                        showActionsBar={true}
                        onChange={this.handleDateChange}
                    />
                </Popover>

                {isTaskEdited && (
                    <Button
                        icon="edit"
                        onClick={this.updateTask}
                        intent={Intent.NONE}
                        style={{ right: '20px', position: 'absolute' }}
                    >
                        Save
                    </Button>
                )}
            </Card>
        );
    }
}

TaskOverlay.propTypes = {
    task: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        updateTask: (updatedTask) => dispatch(updateTask(updatedTask)),
    };
}

export default connect(null, mapDispatchToProps)(TaskOverlay);