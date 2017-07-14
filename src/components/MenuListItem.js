import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class MenuListItem extends Component {

    _handleOnPress( action ) {
        if( action && typeof action == 'string' ) {
            Actions[ action ]();
        } else if ( action && typeof action == 'function' ) {
            action();
        }
    }
    render(){
        const { name, image, action } = this.props;
        return (
            <TouchableOpacity
                onPress={ () => this._handleOnPress( action ) }
            >
                <View style={ styles.container }>
                    { image ? (
                        <View style={ styles.imageContainer }>
                            <Image source={ image } />
                        </View>
                    ) : null }
                    { name ? (
                        <View style={ styles.nameContainer }>
                            <Text style={ styles.name }>{ name }</Text>
                        </View>
                    ) : null }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b9b9b9',
        padding: 10,
    },
    imageContainer: {
        width: 40,
        alignItems: 'center',
    },
    nameContainer: {
        paddingLeft: 15,
        justifyContent: 'center',
    },
    name: {
        fontSize: 25,
    }
});

export default MenuListItem;
