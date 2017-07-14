import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import MenuList from '../components/MenuList';
import { updateFilter } from '../actions';
import { connect } from 'react-redux';

class FilterRating extends Component {

    render(){
        const { rating, updateFilter } = this.props;
        return(
            <View style={{ flex: 1 }}>
                <MenuList listItems={[{
                    name: "5",
                    value: '5',
                }, {
                    name: "4 & above",
                    value: "4",
                }, {
                    name: "3 & above",
                    value: "3",
                }, {
                    name: "2 & above",
                    value: "2",
                }, {
                    name: "Any",
                    value: "0",
                }]} renderRow={ rowData => (
                    <TouchableOpacity
                        onPress={ () => updateFilter({ prop: 'rating', value: rowData.value }) }
                    >
                        <View style={ styles.container }>
                            { rating == rowData.value ? (
                                <View style={ styles.imageContainer }>
                                    <Image source={ require('../assets/images/check.png') } />
                                </View>
                            ) : null }
                            { rowData.name ? (
                                <View style={ styles.nameContainer }>
                                    <Text style={ styles.name }>{ rowData.name }</Text>
                                </View>
                            ) : null }
                        </View>
                    </TouchableOpacity>
                )}/>
            </View>
        );
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


export default connect( state => {
    return {
        rating: state.filter.rating
    };
},{
    updateFilter
})(FilterRating);
