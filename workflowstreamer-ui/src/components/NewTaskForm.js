import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, InputGroup, FormGroup, Intent, Button, TextArea } from "@blueprintjs/core";
import { addTask } from '../actions/app';

class NewTaskForm extends PureComponent {
    constructor(props) {
        super(props);

        this.addTask = this.addTask.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.state = {
            form: {
                title: null,
                description: null,
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

    addTask(e) {
        e.preventDefault();
        console.log(e.target);
        this.props.addTask(this.state.form);
        this.props.onSubmit();
    }

    render() {
        return (
            <Card>
                <form onSubmit={this.addTask}>
                    <FormGroup>
                        <InputGroup onChange={this.handleTitleChange} large={true} type="text" placeholder="Title" style={{ marginBottom: '10px' }} />
                        <TextArea onChange={this.handleDescriptionChange} large={true} fill={true} type="text" placeholder="Description" style={{ marginBottom: '10px' }} />
                        <Button type="submit" intent={Intent.SUCCESS}>Add Task</Button>
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