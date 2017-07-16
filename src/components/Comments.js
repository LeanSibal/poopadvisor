import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Comment from './Comment';

class Comments extends Component {

    state = {
        comments: null
    }

    componentDidMount() {
        if( this.props.comments ) {
            this.setState({
                comments: this.props.comments
            });
        }
    }

    render(){
        return (
            <View style={ styles.container }>
                { this.state.comments ? (
                    <View>
                    { this.state.comments.map( ( comment, i ) => (
                        <Comment
                            key={i}
                            image={comment.profile_image}
                            name={comment.name}
                            comment={comment.review}
                            date={comment.created_at}
                        />
                    ) ) }
                    </View>
                ) : null }
            </View>
       );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: '#b9b9b9',
        borderTopWidth: StyleSheet.hairlineWidth,
    }
});
export default Comments;
