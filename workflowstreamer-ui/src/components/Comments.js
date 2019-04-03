import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, NonIdealState } from "@blueprintjs/core";
import { getTaskComments } from '../actions/app';

class Comments extends PureComponent {
    componentDidMount() {
        const { taskId, getTaskComments } = this.props;
        getTaskComments(taskId);
    }

    render() {
        const { comments, taskId } = this.props;
        const taskComments = comments[taskId];

        if (!taskComments || taskComments.length === 0) {
            return <NonIdealState
                title="No Comments"
                icon="zoom-out"
            />;
        }

        return (
            <div className="comments-container">
                {taskComments.map(({ commentId, text, creatorId }) => (
                    <Card key={commentId} className="comment-card">
                        <b>{creatorId}</b>
                        <br />
                        {text}
                    </Card>
                ))}
            </div>
        );
    }
}

Comments.propTypes = {
    taskId: PropTypes.number.isRequired,
    getTaskComments: PropTypes.func.isRequired,
    comments: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    comments: state.tasks.comments,
});

const mapDispatchToProps = dispatch => ({
    getTaskComments: (taskId) => dispatch(getTaskComments(taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
