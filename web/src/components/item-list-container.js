import _ from 'lodash';
import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Logout from './logout';
import CreateItem from './create-item';
import ItemList from './item-list';
import Providers from './providers';

// load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

const BASE_URL = process.env.BASE_URL.replace(/{stage}/, process.env.STAGE);

var items = [];

export default class ItemListContainer extends React.Component {
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
        var self = this;

        if (!self.getAuthorizationToken()) {
            browserHistory.replace('/');
        }

        axios.get(BASE_URL + '/items/' + self.getUserId() + '/getAll', {
            headers: {
                Authorization: self.getAuthorizationToken()
            }
        }).then(function(response) {
            self.setState({items: response.data.result.Items});            
        }).catch(function(error) {
            console.log(error);
            // Not authorized, return to login page
            browserHistory.replace('/');
        });
    }

    render() {
        return (
            <div>
                <div className="row large-6 large-offset-3 medium-6 medium-offset-3 small-6 small-offset-3 columns">
                    <Logout logout={this.logout.bind(this)}/>
                </div>        
                <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
                    <h3>My Item List</h3>
                </div>
                <CreateItem createItem={this.createItem.bind(this)}/>
                <ItemList items={this.state.items} toggleItem={this.toggleItem.bind(this)} saveItem={this.saveItem.bind(this)} deleteItem={this.deleteItem.bind(this)}/>
            </div>
        );
    }

    logout() {
        localStorage.removeItem('authorization_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        browserHistory.replace('/');
    }

    createItem(event) {
        var self = this;
        event.userId = self.getUserId();               
        axios.post(BASE_URL + '/items/' + self.getUserId() + '/create', event, {
            headers: {
                Authorization: this.getAuthorizationToken()
            }
        }).then(function(response) {
            self.state.items.unshift(response.data);
            self.setState({items: self.state.items});
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    toggleItem(event) {
        var self = this;
        const foundItem = _.find(this.state.items, currentItem => currentItem.id === event.id);
        foundItem.enabled = !foundItem.enabled;
        this.setState({ items: this.state.items });
        axios.put(BASE_URL + '/items/' + self.getUserId() + '/status', {
            id: event.id,
            userId: event.userId,
            enabled: foundItem.enabled            
        }, {
            headers: {
                Authorization: this.getAuthorizationToken()
            }
        }).then(function(response) {            
        }).catch(function(error) {
            console.log(error);
        });
    }

    saveItem(oldItem, newItem) {
        var self = this;
        const foundItem = _.find(self.state.items, event => event.id === oldItem.id);
        foundItem.itemName = newItem.itemName;
        foundItem.itemDate = newItem.itemDate;
        self.setState({items: self.state.items});
        axios.put(BASE_URL + '/items/' + self.getUserId() + '/update', {
            id: oldItem.id,
            userId: oldItem.userId,
            itemName: newItem.itemName,            
            itemDate: newItem.itemDate
        }, {
            headers: {
                Authorization: this.getAuthorizationToken()
            }
        }).then(function(response) {            
        }).catch(function(error) {
            console.log(error);
        });
    }

    deleteItem(event) {
        var self = this;
        _.remove(self.state.items, currentItem => currentItem.id === event.id);
        self.setState({items: self.state.items});
        axios.delete(BASE_URL + '/items/' + self.getUserId() + '/delete/' + event.id, {
            headers: {
                Authorization: this.getAuthorizationToken()
            }
        }).then(function() {
        }).catch(function(error) {
            console.log(error);
        });

    }
}
