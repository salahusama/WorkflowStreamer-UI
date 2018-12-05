import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, InputGroup, FormGroup, Intent, Button } from "@blueprintjs/core";

import { getTasks } from '../actions/app';

class Tasks extends PureComponent {
    componentWillMount() {
        this.props.getTasks();
    }

    renderTasks(tasks) {
        return tasks.map(task => (
            <Card interactive={true} style={{ marginBottom: '5px' }}>
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
                    <FormGroup onSubmit={this.addTask}>
                        <InputGroup large={true} type="text" placeholder="Title" style={{ marginBottom: '10px' }} />
                        <InputGroup large={true} type="text" placeholder="Description" style={{ marginBottom: '10px' }} />
                        <Button intent={Intent.SUCCESS}>Add Task</Button>
                    </FormGroup>
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
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tasks);