import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Home from './screens/Home';
import MainMenu from './screens/MainMenu';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="home" component={Home} hideNavBar={true}/>
                <Scene key="menu" component={MainMenu} title="Menu" />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
