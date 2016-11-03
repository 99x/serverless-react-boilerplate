import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router'
import Providers from './providers';

// load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

const AUTH_URL = process.env.AUTH_URL.replace(/{stage}/, process.env.STAGE);
var items = [];

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items
        };
        this.init();
    }

    getAuthorizationToken() {
        return localStorage.getItem('authorization_token');
    }

    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }

    getUserId() {
        return localStorage.getItem('user_id');
    }

    init() {
        const params = this.props.location.query;
        if (params.authorization_token) {
            localStorage.setItem('authorization_token', params.authorization_token);
            localStorage.setItem('refresh_token', params.refresh_token);
            localStorage.setItem('user_id', params.id);
            browserHistory.replace('/item-list');
        }       
    }

    render() {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        };
        return (
            <div style={style}>
                <h3>Serverless React Auth Boilerplate</h3>
                <Providers login={this.login.bind(this)}/>
            </div>
        );
    }

    login(event) {
        window.location.href = AUTH_URL + '/authentication/signin/' + event.provider;
    }
}
