import React, { PureComponent } from 'react';
import { Button, Overlay } from '@blueprintjs/core';
import SidebarMenu from './SidebarMenu';

class MenuOpener extends PureComponent {
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

        return (
            <div>
                <Button minimal={true} icon="menu" onClick={this.toggleOverlay} />
                <Overlay
                    backdropClassName="overlay-backdrop"
                    className="left-overlay"
                    isOpen={isOpen}
                    onClose={this.toggleOverlay}
                    hasBackdrop={true}
                >
                    <SidebarMenu />
                </Overlay>
            </div>
        );
    }
}

export default MenuOpener;
