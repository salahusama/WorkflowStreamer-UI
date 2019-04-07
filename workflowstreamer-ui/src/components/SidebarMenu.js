import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Alignment, ButtonGroup, Divider } from '@blueprintjs/core';
import { Redirect, withRouter } from 'react-router-dom';

const SideBarMenuItems = [{
    path: '/app',
    text: 'Kanban View',
    icon: 'comparison',
}, {
    path: '/analytics',
    text: 'Analytics',
    icon: 'chart',
}, {
    path: '/teams',
    text: 'Teams',
    icon: 'people',
}]

class SidebarMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.redirectTo = this.redirectTo.bind(this);
        this.state = {
            target: null,
        };
    }
    
    redirectTo(target) {
        this.setState({ target });
    }

    render() {
        const { target } = this.state;
        const { pathname } = this.props.location;
        
        if (target) {
            return <Redirect push to={target} />;
        }

        return (
            <Card className="side-menu">
                <ButtonGroup
                    large={true}
                    minimal={true}
                    alignText={Alignment.LEFT}
                    vertical={true}
                    style={{ width: '25vw' }}
                >
                    {SideBarMenuItems.map(({ text, path, icon }, index) => (
                        <Fragment key={index}>
                            <Button disabled={pathname === path} icon={icon} text={text} onClick={() => this.redirectTo(path)} />
                            <Divider />
                        </Fragment>
                    ))}
                </ButtonGroup>
            </Card>
        );
    }
}

export default withRouter(SidebarMenu);
