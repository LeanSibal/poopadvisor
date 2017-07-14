import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    ListView,
    StyleSheet,
} from 'react-native';
import MenuListItem from './MenuListItem';

class MenuList extends Component {

    constructor( props ) {
        super();
        this.state = {
            listItems: []
        };
        this.dataSource = new ListView.DataSource({
            rowHasChanged: ( r1, r2 ) => r1 !== r2
        });
    }
    componentWillReceiveProps(){
        console.log( this.props.listItems );
        this.setState({
            listItems: this.props.listItems 
        });
    }

    componentDidMount(){
        this.setState({
            listItems: this.props.listItems 
        });
    }

    render(){
        const { listItems, renderRow } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff'  }}>
                <ScrollView>
                    <ListView
                        dataSource={ this.dataSource.cloneWithRows( this.state.listItems ) }
                        renderRow={ renderRow ? renderRow : ( rowData => (
                            <MenuListItem { ...rowData } />
                        ) ) }
                        enableEmptySections={ true }
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});

export default MenuList;
