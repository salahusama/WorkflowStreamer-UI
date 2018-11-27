import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../components/App';

const initialState = {
    hello: {},
};
const middleware = [ thunk ];
const mockStore = configureStore(middleware);
let wrapper;
let store;

beforeEach(() => {
    store = mockStore(initialState);
    wrapper = <App store={store}/>;
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(wrapper, div);
    ReactDOM.unmountComponentAtNode(div);
});
