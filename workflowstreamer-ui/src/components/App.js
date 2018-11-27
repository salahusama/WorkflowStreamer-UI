import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sayHello } from '../actions/app';

class App extends Component {
    constructor(props) {
        super(props);
        props.sayHello();
    }

    render() {
        const { hello } = this.props;
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        {hello || 'Loading...'}
                    </div>
                </header>
            </div>
        );
    }
}

App.propTypes = {
    hello: PropTypes.string,
    sayHello: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        hello: state.hello.hello,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sayHello: name => dispatch(sayHello(name)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
