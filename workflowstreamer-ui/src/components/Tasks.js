import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTasks, getUserStages } from '../actions/app';
import Column from './Column';
import { Spinner, Intent, NonIdealState } from '@blueprintjs/core';

class Tasks extends PureComponent {
    componentWillMount() {
        this.props.getUserStages();
        this.props.getTasks();
    }

    render() {
        const { tasks, selectedProject, userStages } = this.props;
        let tasksToShow = tasks;

        if (selectedProject) {
            tasksToShow = tasks.filter(task => task.projectId === selectedProject.projectId);
        }

        if (tasksToShow && tasksToShow.length === 0) {
            return <NonIdealState
                className="page-non-ideal"
                title="No Tasks Found"
                description="It seems like you don't have any tasks, try adding a task to see it here."
                icon="issue"
            />;
        }

        if (!userStages) {
            return <Spinner
                className="page-spinner"
                intent={Intent.PRIMARY}
                size={Spinner.SIZE_LARGE}
                style={{ marginTop: '30vh' }}
            />;
        }

        return (
            <div className="tasks-container">
                {userStages.map((stage, index) => {
                    const columnTasks = tasksToShow.filter(task => task.stage === stage);
                    return <Column
                        key={index}
                        columnName={stage}
                        tasks={columnTasks}
                        noBorder={index === 0}
                    />
                })}
            </div>
        );
    }
}

Tasks.propTypes = {
    getTasks: PropTypes.func.isRequired,
    getUserStages: PropTypes.func.isRequired,
    tasks: PropTypes.array,
    userStages: PropTypes.array,
    selectedProject: PropTypes.object,
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        userStages: state.userStages,
        selectedProject: state.projects.selectedProject,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTasks: () => dispatch(getTasks()),
        getUserStages: () => dispatch(getUserStages()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tasks);
