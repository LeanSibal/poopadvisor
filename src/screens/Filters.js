import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import MenuList from '../components/MenuList';

class Filters extends Component {
    render(){
        return(
            <MenuList listItems={[{
                name: 'Gender',
                image: require('../assets/images/icon-filters.png'),
                action: 'filter_gender',
            }, {
                name: 'Time',
                image: require( '../assets/images/icon-favorites.png' ),
                action: 'filter_time',
            }, {
                name: 'Location',
                image: require( '../assets/images/icon-medal.png' ),
                action: 'filter_location',
            }, {
                name: 'Rating',
                image: require( '../assets/images/icon-about.png' ),
                action: 'filter_rating',
            }]}/>
        );
    }
}

export default Filters;
