import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';
import NewCommentForm from './NewCommentForm';

function CommentsContainer({ taskId }) {
    return (
        <Fragment>
            <NewCommentForm taskId={taskId} />
            <Comments taskId={taskId} />
        </Fragment>
    );
}

CommentsContainer.propTypes = {
    taskId: PropTypes.number.isRequired,
};

export default CommentsContainer;