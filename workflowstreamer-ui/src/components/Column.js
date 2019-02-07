import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tag, Intent } from "@blueprintjs/core";
import Task from './Task';
import { updateTask } from '../actions/app';
import AppToaster from '../utils/AppToaster';

class Column extends PureComponent {
    constructor(props) {
        super(props);
        this.updateStage = this.updateStage.bind(this);
    }

    updateStage(e) {
        const { columnName } = this.props;
        const taskId = e.dataTransfer.getData("taskId");
        const oldColumn = e.dataTransfer.getData("oldColumn");
        
        // Prevent Tasks from updating when same column
        if (oldColumn === columnName) {
            AppToaster.show({
                message: 'To change a task\'s stage, please drop it in a different column.',
                intent: Intent.WARNING,
            });
            return;
        }

        this.props.updateTask({
            taskId,
            stage: columnName
        });
    }

    render() {
        const { tasks, columnName, noBorder } = this.props;
        let style = noBorder ? { border: 'none' } : {};

        return (
            <div
                className="tasks-column"
                style={style}
                onDrop={this.updateStage}
                onDragOver={(e) => e.preventDefault()} // Allows drag & drop
            >
                <div className="flex-col">
                    <div className="flex-row">
                        <Tag large={true} round={true} intent={Intent.PRIMARY}>{columnName}</Tag>
                    </div>
                </div>
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </div>
        );
    }
}

Column.defaultProps = {
    noBorder: false,
}

Column.propTypes = {
    columnName: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    noBorder: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
    updateTask: (details) => dispatch(updateTask(details)),
});

export default connect(null, mapDispatchToProps)(Column);
