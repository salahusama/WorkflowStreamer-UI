import React from 'react';
import { Card, Tag } from '@blueprintjs/core';
import { getDateString, getIntentBasedOnDate } from '../utils/DateUtil';

export default function TaskOverlay({ task: { title, description, dueDate } }) {
    return (
        <Card
            className="overlay-task"
            interactive={true}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <Tag intent={getIntentBasedOnDate(dueDate)} >
                {`Due: ${getDateString(dueDate)}`}
            </Tag>
        </Card>
    );
}