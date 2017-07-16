import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

class Poops extends Component {
    state = {
        poops: null
    }
    componentDidMount() {
        if( this.props.poops ) {
            this.setState({ poops: this.props.poops });
        }
    }

    _imageSource( i ) {
        let poops = ( Math.floor( this.state.poops * 2 ) ) / 2;
        let floor = Math.floor( poops );
        let round = Math.round( poops );
        if( i > floor && i <= round ) {
            return (
                <Image source={ require('../assets/images/poop-half.png') } />
            );
        } else if ( i <= poops ) {
            return (
                <Image source={ require('../assets/images/poop-full.png') } />
            );
        } else {
            return (
                <Image source={ require('../assets/images/poop-empty.png') } />
            );
        }
    }

    render() {
        return (
            <View>
                { this.state.poops ? ( 
                    <View style={ styles.container }>
                        { this._imageSource(1) }
                        { this._imageSource(2) }
                        { this._imageSource(3) }
                        { this._imageSource(4) }
                        { this._imageSource(5) }
                    </View>
                ) : null }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    }
});

export default Poops;
