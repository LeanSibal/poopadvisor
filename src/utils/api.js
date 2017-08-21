import axios from 'axios';
import qs from 'qs';
import {
    AsyncStorage
} from 'react-native';

const oauth_credentials = {
    client_secret : 'uuNhPNpEoPc0pdGbMyK6jmJ0KWVyy5PAGva1Cgv3',
    client_id : '4',
    grant_type: 'password'
};

class API {
    static get( url, params, callback ) {
        axios.get( 'http://www.shittableba.com/api/' + url + '?' + qs.stringify( params ) )
        .then( response => {
            callback( response.data )
        })
    }

    static async post( url, params, callback ) {
        var post_data = {
            url: 'http://www.shittableba.com/api/' + url,
            data: params,
            method: 'post'
        };
        const access_token = await AsyncStorage.getItem('@PoopAdvisor:access_token');
        if( access_token ) {
            post_data['headers'] = {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + access_token
            };
        }
        axios.request( post_data ).then( response => {
            callback( response.data );
        });
    }

    static async access_token( username, password ) {
        const params = {
            client_secret: oauth_credentials.client_secret,
            client_id: oauth_credentials.client_id,
            grant_type: 'password',
            username: username,
            password: password
        };
        const token = await AsyncStorage.getItem('@PoopAdvisor:access_token');
        axios.post( 'http://www.shittableba.com/oauth/token', params ).then( response => {
            const { access_token, expires_in, refresh_token } = response.data;
            AsyncStorage.setItem('@PoopAdvisor:access_token', access_token );
        });
    }
}

export default API;
