import React from 'react';
import PropTypes from 'prop-types';
import { Card, Tag, Intent } from "@blueprintjs/core";

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
                <Card
                    key={index}
                    interactive={true}
                    className="task-item"
                >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </Card>
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