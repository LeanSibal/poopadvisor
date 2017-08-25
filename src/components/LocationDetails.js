import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

class LocationDetails extends Component {
    state = {
        gender: '',
        type: '',
        time_open: '',
        time_close: '',
    }

    componentWillMount() {
        const { gender, type, time_open, time_close } = this.props;
        this.setState({
            gender: gender,
            type: type,
            time_open: time_open,
            time_close: time_close,
        });
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={ styles.detailContainer }>
                    <Image 
                        style={ styles.smallIcon }
                        source={ require('../assets/images/sign-brown.png') } 
                    />
                    <Text>{ this.state.gender }</Text>
                </View>
                <View style={ styles.detailContainer }>
                    <Image 
                        style={ styles.smallIcon }
                        source={ require('../assets/images/pin-brown.png') } 
                    />
                    <Text>{ this.state.type }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 3,
        paddingRight: 5,
        paddingBottom: 3,
        paddingLeft: 5,
        borderTopColor: '#b9b9b9',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b9b9b9',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    detailContainer: {
        flexDirection: 'row',
    },
    smallIcon: {
        marginRight: 5,
    },
});

export default LocationDetails;
