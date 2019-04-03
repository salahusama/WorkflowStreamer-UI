import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Intent, Button, TextArea } from "@blueprintjs/core";
import { addComment } from '../actions/app';
import AppToaster from '../utils/AppToaster';

class NewCommentForm extends PureComponent {
    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);
        this.updateText = this.updateText.bind(this);
        this.state = {
            text: null,
        };
    }

    updateText(e) {        
        this.setState({ text: e.target.value });
    }

    addComment(e) {
        const { text } = this.state;
        const { taskId, addComment } = this.props;
        e.preventDefault();

        if (!text) {
            AppToaster.show({
                message: 'Please enter a comment.',
                intent: Intent.WARNING,
            });
            return;
        }

        addComment({ taskId, text });
    }

    render() {
        return (
            <form
                onSubmit={this.addComment}
                style={{ position: 'relative', marginBottom: '45px' }}
            >
                <TextArea
                    name="text"
                    large={true}
                    fill={true}
                    type="text"
                    placeholder="Add a new comment..."
                    onChange={this.updateText}
                    style={{ marginTop: '10px' }}
                />
                <br />
                <Button
                    type="submit"
                    intent={Intent.SUCCESS}
                    text="Add Comment"
                    style={{ position: 'absolute', marginTop: '5px', right: 0 }} />
            </form>
        );
    }
}

NewCommentForm.propTypes = {
    taskId: PropTypes.number.isRequired,
    addComment: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        addComment: (comment) => dispatch(addComment(comment)),
    }
};

export default connect(null, mapDispatchToProps)(NewCommentForm);
