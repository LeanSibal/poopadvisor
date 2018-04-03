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
import { Actions } from 'react-native-router-flux';

class Footer extends Component {
    state = {
        fontLoaded: false
    }
    async componentDidMount() {
        await Font.loadAsync({
            'bubbleboddy': require('../assets/fonts/bubbleboddy.ttf'),
        });
        this.setState({ fontLoaded: true });
    }
    render() {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={ () => Actions.filters() }
                >
                    <Image
                        source={ require('../assets/images/left-button.png') }
                    />
                </TouchableOpacity>
				{
					this.state.fontLoaded ? (
						<Text style={styles.branding}>pwet</Text>
					) : null
				}
                <TouchableOpacity
                    onPress={ () => Actions.location_add() }
                >
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
        backgroundColor:'#a48511',
        alignSelf: 'stretch',
        height:60
    },
	logo: {
		height:60
	},
    branding: {
        fontFamily: 'bubbleboddy',
        color:'#fff',
        fontSize: 45,
		textShadowColor: '#694501',
		textShadowOffset: {
			width:1,
			height:1
		},
		
    }
});

export default Footer;
