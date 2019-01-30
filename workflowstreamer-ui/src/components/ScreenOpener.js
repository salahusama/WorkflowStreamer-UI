import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Button, Overlay } from '@blueprintjs/core';

class ScreenOpener extends PureComponent {
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
        const { btnText, icon, toggleOnSubmit, children } = this.props;
        const childProps = toggleOnSubmit ? { onSubmit: this.toggleOverlay } : {};

        return (
            <div>
                <Button fill={true} minimal={true} icon={icon} onClick={this.toggleOverlay}>{btnText}</Button>
                <Overlay
                    className="mid-overlay"
                    backdropClassName="overlay-backdrop"
                    isOpen={isOpen}
                    onClose={this.toggleOverlay}
                >
                    {cloneElement(children, childProps)}
                </Overlay>
            </div>
        );
    }
}

ScreenOpener.propTypes = {
    btnText: PropTypes.string,
    icon: PropTypes.string,
    toggleOnSubmit: PropTypes.bool,
};

export default ScreenOpener;
