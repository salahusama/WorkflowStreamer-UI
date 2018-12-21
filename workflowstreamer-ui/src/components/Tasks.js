import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, InputGroup, FormGroup, Intent, Button } from "@blueprintjs/core";

import { addTask, getTasks } from '../actions/app';

class Tasks extends PureComponent {
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

    componentWillMount() {
        this.props.getTasks();
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
    }

    renderTasks(tasks) {
        return tasks.map((task, index) => (
            <Card
                key={index}
                interactive={true}
                style={{ marginBottom: '5px' }}
            >
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </Card>
        ));
    }

    render() {
        const { tasks } = this.props;

        return (
            <div style={{ maxWidth: '30vw' }}>
                {this.renderTasks(tasks)}
                <Card>
                    <form onSubmit={this.addTask}>
                        <FormGroup>
                            <InputGroup onChange={this.handleTitleChange} large={true} type="text" placeholder="Title" style={{ marginBottom: '10px' }} />
                            <InputGroup onChange={this.handleDescriptionChange} large={true} type="text" placeholder="Description" style={{ marginBottom: '10px' }} />
                            <Button type="submit" intent={Intent.SUCCESS}>Add Task</Button>
                        </FormGroup>
                    </form>
                </Card>
            </div>
        )
    }
}

Tasks.propTypes = {
    getTasks: PropTypes.func.isRequired,
    tasks: PropTypes.array,
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTasks: () => dispatch(getTasks()),
        addTask: (task) => dispatch(addTask(task)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tasks);