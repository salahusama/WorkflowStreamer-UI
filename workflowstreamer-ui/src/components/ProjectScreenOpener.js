import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Overlay } from '@blueprintjs/core';
import ProjectScreen from './ProjectScreen';

class ProjectScreenOpener extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggleOverlay() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render() {
        const { isOpen } = this.state;
        const { text } = this.props;

        return (
            <div>
                <Button fill={true} minimal={true} icon="projects" onClick={this.toggleOverlay}>{text}</Button>
                <Overlay
                    className="mid-overlay"
                    backdropClassName="overlay-backdrop"
                    isOpen={isOpen}
                    onClose={this.toggleOverlay}
                >
                    <ProjectScreen />
                </Overlay>
            </div>
        );
    }
}

ProjectScreenOpener.propTypes = {
    text: PropTypes.string,
};

export default ProjectScreenOpener;