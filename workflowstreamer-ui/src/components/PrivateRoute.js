import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Status from '../constants/status';

class PrivateRoute extends PureComponent {
    render() {
        const { status, component, location, ...props } = this.props;
        
        if (status !== Status.SUCCESS) {
            return <Redirect to={{ pathname: '/login', from: location }} />
        }

        return <Route component={component} {...props} />;
    }
}

const mapStateToProps = (state) => ({
    status: state.auth.status,
})

export default connect(mapStateToProps)(PrivateRoute);