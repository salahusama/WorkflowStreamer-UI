import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tag, Intent } from "@blueprintjs/core";
import MovableTask from './MovableTask';
import { updateTask } from '../actions/app';
import { List, arrayMove } from 'react-movable';
import { updateTaskOrderForColummn, orderTasks } from '../utils/orderUtils';

class MovableColumn extends PureComponent {
    constructor(props) {
        super(props);
        this.handleReorder = this.handleReorder.bind(this);
        this.updateStage = this.updateStage.bind(this);
        this.state = {
            tasks: [],
        };
    }

    componentWillMount() {
        const { columnName, tasks } = this.props;
        const orderedTasks = orderTasks(columnName, tasks);
        this.setState({ tasks: orderedTasks });
    }

    componentWillReceiveProps(newProps) {
        const { tasks } = this.props;

        if (tasks.length !== newProps.tasks.length) {
            const { columnName } = this.props;
            const orderedTasks = orderTasks(columnName, newProps.tasks);
            this.setState({ tasks: orderedTasks });
        }
    }

    handleReorder({ oldIndex, newIndex }) {
        const { columnName } = this.props;
        const { tasks } = this.state;
        const tasksInNewOrder = arrayMove(tasks, oldIndex, newIndex);
        this.setState({ tasks: tasksInNewOrder });
        updateTaskOrderForColummn(columnName, tasksInNewOrder);
    }

    updateStage(taskId, stage) {
        this.props.updateTask({ taskId, stage });
    }

    render() {
        const { columnName, noBorder } = this.props;
        let style = noBorder ? { border: 'none' } : {};

        const { tasks } = this.state;

        return (
            <div className="tasks-column" style={style}>
                <div className="flex-col">
                    <div className="flex-row">
                        <Tag large={true} round={true} intent={Intent.PRIMARY}>{columnName}</Tag>
                    </div>
                </div>

                <List
                    values={tasks}
                    onChange={this.handleReorder}
                    renderList={({ children, props }) => <div {...props}>{children}</div>}
                    renderItem={(movableProps) => <MovableTask key={movableProps.value.taskId} movableProps={movableProps} onStageUpdate={this.updateStage} />}
                />
            </div>
        );
    }
}

MovableColumn.defaultProps = {
    noBorder: false,
}

MovableColumn.propTypes = {
    columnName: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    noBorder: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
    updateTask: (details) => dispatch(updateTask(details)),
});

export default connect(null, mapDispatchToProps)(MovableColumn);
