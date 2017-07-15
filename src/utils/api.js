import axios from 'axios';
import qs from 'qs';

class API {
    static get( url, params, callback ) {
        axios.get( 'http://www.shittableba.com/api/' + url + '?' + qs.stringify( params ) )
        .then( response => {
            callback( response.data )
        })
    }
}

export default API;
