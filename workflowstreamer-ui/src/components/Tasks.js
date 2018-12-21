import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTasks } from '../actions/app';
import Column from './Column';

class Tasks extends PureComponent {
    componentWillMount() {
        this.props.getTasks();
    }

    render() {
        const { tasks } = this.props;

        return (
            <div className="tasks-container">
                <Column columnName={"Column A"} tasks={tasks} noBorder={true} />
                <Column columnName={"Column B"} tasks={tasks} />
                <Column columnName={"Column C"} tasks={tasks} />
                <Column columnName={"Column D"} tasks={tasks} />
                <Column columnName={"Column E"} tasks={tasks} />
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