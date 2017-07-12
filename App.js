import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import Router from './src/Router';

export default class App extends Component {
    render() {
        return (
            <Provider store={ createStore(reducers) }>
                <Router />
            </Provider>
        );
    }
}

console.ignoredYellowBox = ['Warning: View.propTypes'];

