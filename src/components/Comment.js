import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

class Comment extends Component {
    state = {
        image: null,
        name: null,
        comment: null,
        date: null,

    };
    componentDidMount() {
        if( this.props.image ) {
            this.setState({ image: this.props.image });
        }
        if( this.props.name ) {
            this.setState({ name: this.props.name });
        }
        if( this.props.comment ) {
            this.setState({ comment: this.props.comment });
        }
        if( this.props.date ) {
            this.setState({ date: this.props.date });
        }

    }
    render() {
        return(
            <View style={ styles.container }>
                <View style={ styles.imageContainer }>
                    { this.state.image ? ( 
                        <Image 
                            style={ styles.image }
                            source={{ uri: this.state.image }}
                        />
                    ) : null }
                </View>
                <View style={ styles.commentContainer }>
                    <Text multiline={ true } style={ styles.name }>{ this.state.name }</Text>
                    <Text style={ styles.date }>{ this.state.date }</Text>
                    <Text style={ styles.comment }>{ this.state.comment }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b9b9b9',
    },
    imageContainer: {
        borderRadius:25,
        width:50,
        height:50,
        margin:10,
    },
    image: {
        borderRadius:25,
        width:50,
        height:50,
    },
    commentContainer: {
        marginTop:10,
        marginBottom:10,
        alignSelf: 'stretch',

    },
    name: {
        fontWeight: 'bold',
        fontSize:16,
    },
    date: {
        fontFamily: 'raleway',
        fontSize:10,
        color:'#b9b9b9'
    },
    comment: {
        marginTop:5,
        paddingRight: 80,
        fontFamily: 'raleway',
    }
});

export default Comment;
