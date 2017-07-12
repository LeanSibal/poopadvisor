import React, { Component } from 'react';
import { 
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import {
    Font
} from 'expo';

class Footer extends Component {
    state = {
        fontLoaded: false
    }
    async componentDidMount() {
        await Font.loadAsync({
            'lobster': require('../assets/fonts/lobster.otf'),
        });
        this.setState({ fontLoaded: true });
    }
    render() {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                >
                    <Image
                        source={ require('../assets/images/left-button.png') }
                    />
                </TouchableOpacity>
                {
                    this.state.fontLoaded ? (
                        <Text style={styles.branding}>Shittable ba?</Text>
                    ) : null
                }
                <TouchableOpacity>
                    <Image
                        source={ require('../assets/images/right-button.png') }
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    footer: {
        paddingLeft:10,
        paddingRight:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'#A4842F',
        alignSelf: 'stretch',
        height:60
    },
    branding: {
        fontFamily: 'lobster',
        color:'#fff',
        fontSize: 30
    }
});

export default Footer;
