import React, { PureComponent } from 'react';
import { Card, Button, Alignment, ButtonGroup, Divider } from '@blueprintjs/core';
import { Redirect, withRouter } from 'react-router-dom';

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
                    <Button disabled={pathname === '/app'} icon="comparison" text="Kanban View" onClick={() => this.redirectTo('/app')} />
                    <Divider />
                    <Button disabled={pathname === '/analytics'} icon="chart" text="Analytics" onClick={() => this.redirectTo('/analytics')} />
                    <Divider />
                </ButtonGroup>
            </Card>
        );
    }
}

export default withRouter(SidebarMenu);
