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

class FilterTime extends Component {

    render(){
        const { time, updateFilter } = this.props;
        return(
            <View style={{ flex: 1 }}>
                <MenuList listItems={[{
                    name: "Open Anytime",
                    value: ''
                }, {
                    name: "Open Now",
                    value: "Open Now",
                }]} renderRow={ rowData => (
                    <TouchableOpacity
                        onPress={ () => updateFilter({ prop: 'time', value: rowData.value }) }
                    >
                        <View style={ styles.container }>
                            { time == rowData.value ? (
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
        time: state.filter.time
    };
},{
    updateFilter
})(FilterTime);
