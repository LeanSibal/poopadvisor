import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Map from '../components/Map';
import Footer from '../components/Footer';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
    componentDidMount(){
    }
    render(){
        return(
            <View style={ styles.container }>
                <Map />
                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default Home;
