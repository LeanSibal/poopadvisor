import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import MenuList from '../components/MenuList';

class Menu extends Component {
    render(){
        return(
            <MenuList listItems={[{
                name: 'Filters',
                image: require('../assets/images/icon-filters.png'),
                action: 'filters',
            }, {
                name: 'Favorites',
                image: require( '../assets/images/icon-favorites.png' ),
            }, {
                name: 'Most Sh*ttable',
                image: require( '../assets/images/icon-medal.png' ),
            }, {
                name: 'About',
                image: require( '../assets/images/icon-about.png' ),
            }]}/>
        );
    }
}

export default Menu;
