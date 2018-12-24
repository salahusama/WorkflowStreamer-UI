import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTasks } from '../actions/app';
import { getUserStages } from '../actions/app';
import Column from './Column';
import { Spinner, Intent } from '@blueprintjs/core';

class Tasks extends PureComponent {
    componentWillMount() {
        this.props.getUserStages();
        this.props.getTasks();
    }

    render() {
        const { tasks, userStages } = this.props;

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
                    const columnTasks = tasks.filter(task => task.stage === stage);
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
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        userStages: state.userStages,
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