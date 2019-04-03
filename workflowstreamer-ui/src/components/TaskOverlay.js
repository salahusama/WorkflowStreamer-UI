import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Card, InputGroup, TextArea, Button, Popover, Intent, NumericInput } from '@blueprintjs/core';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime';
import { getDateString, getIntentBasedOnDate } from '../utils/DateUtil';
import { updateTask } from '../actions/app';
import PriorityPicker from './PriorityPicker';
import CommentsContainer from './CommentsContainer';

class TaskOverlay extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleDatePicker = this.toggleDatePicker.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleEstimatedWorkChange = this.handleEstimatedWorkChange.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.state = {
            isOpen: false,
            form: {
                title: null,
                description: null,
                dueDate: null,
				priority: null,
				estimatedWork: null,
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

    handlePriorityChange(newPriority) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                priority: newPriority,
            }
        });
	}
	
	handleEstimatedWorkChange(estimatedWork) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                estimatedWork,
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
        const { task: { taskId, title, description, dueDate, priority, estimatedWork, isRecommended } } = this.props;
        const { isOpen, form } = this.state;
        const selectedDueDate = dueDate || form.dueDate ? new Date(form.dueDate || dueDate) : null;
        const isTaskEdited = form.title || form.description || form.dueDate || form.priority || form.estimatedWork;
        const taskClasses = classNames({
            'overlay-task': true,
            'recommended-task': isRecommended,
        });

        return (
            <Card
                className={taskClasses}
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

				<div style={{ marginBottom: '10px' }}>
					<Popover isOpen={isOpen}>
						<Button onClick={this.toggleDatePicker} intent={getIntentBasedOnDate(selectedDueDate)} >
							{`Due: ${getDateString(selectedDueDate) || 'Not Set'}`}
						</Button>
						<DatePicker
							value={selectedDueDate}
							showActionsBar={true}
							onChange={this.handleDateChange}
							timePrecision={TimePrecision}
						/>
					</Popover>

					<PriorityPicker initial={priority} onChange={this.handlePriorityChange} />
				</div>

				<NumericInput
					name="estimatedWork"
					value={form.estimatedWork || estimatedWork || null}
					onValueChange={this.handleEstimatedWorkChange}
					min={0}
					max={100}
					placeholder="Estimated Work"
					style={{ width: '118px' }}
				/>

                {isTaskEdited && (
                    <Button
                        icon="edit"
                        onClick={this.updateTask}
                        intent={Intent.NONE}
                        style={{ right: '10px', bottom: '10px', position: 'absolute' }}
                    >
                        Save
                    </Button>
                )}

                <CommentsContainer taskId={taskId} />
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
