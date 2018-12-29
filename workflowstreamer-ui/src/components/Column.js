import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Intent } from "@blueprintjs/core";
import Task from './Task';

function Column({ tasks, columnName, noBorder }) {
    let style = noBorder ? { border: 'none' } : {};

    return (
        <div className="tasks-column" style={style}>
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

Column.defaultProps = {
    noBorder: false,
}

Column.propTypes = {
    columnName: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    noBorder: PropTypes.bool,
};

export default Column;