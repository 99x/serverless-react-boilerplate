import _ from 'lodash';
import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Logout from './logout';
import CreateTodo from './create-todo';
import TodoList from './todo-list';
import Providers from './providers';

// load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

const BASE_URL = process.env.BASE_URL.replace(/{stage}/, process.env.STAGE);

var todos = [];

export default class TodoListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos
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

        axios.get(BASE_URL + '/todos/' + self.getUserId() + '/getAll', {
            headers: {
                Authorization: self.getAuthorizationToken()
            }
        }).then(function(response) {
            self.setState({todos: response.data.result.Items});            
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
                    <h3>My Todo List</h3>
                </div>
                <CreateTodo createTodo={this.createTodo.bind(this)}/>
                <TodoList todos={this.state.todos} toggleTodo={this.toggleTodo.bind(this)} saveTodo={this.saveTodo.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
            </div>
        );
    }

    logout() {
        localStorage.removeItem('authorization_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        browserHistory.replace('/');
    }

    createTodo(event) {
        var self = this;
        event.userId = self.getUserId();               
        axios.post(BASE_URL + '/todos/' + self.getUserId() + '/create', event, {
            headers: {
                Authorization: this.getAuthorizationToken()
            }
        }).then(function(response) {
            self.state.todos.unshift(response.data);
            self.setState({todos: self.state.todos});
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    toggleTodo(event) {
        var self = this;
        const foundTodo = _.find(this.state.todos, currentTodo => currentTodo.id === event.id);
        foundTodo.enabled = !foundTodo.enabled;
        this.setState({ todos: this.state.todos });
        axios.put(BASE_URL + '/todos/' + self.getUserId() + '/status', {
            id: event.id,
            userId: event.userId,
            enabled: foundTodo.enabled            
        }, {
            headers: {
                Authorization: this.getAuthorizationToken()
            }
        }).then(function(response) {            
        }).catch(function(error) {
            console.log(error);
        });
    }

    saveTodo(oldTodo, newTodo) {
        var self = this;
        const foundTodo = _.find(self.state.todos, event => event.id === oldTodo.id);
        foundTodo.todoName = newTodo.todoName;
        foundTodo.todoDate = newTodo.todoDate;
        self.setState({todos: self.state.todos});
        axios.put(BASE_URL + '/todos/' + self.getUserId() + '/update', {
            id: oldTodo.id,
            userId: oldTodo.userId,
            todoName: newTodo.todoName,            
            todoDate: newTodo.todoDate
        }, {
            headers: {
                Authorization: this.getAuthorizationToken()
            }
        }).then(function(response) {            
        }).catch(function(error) {
            console.log(error);
        });
    }

    deleteTodo(event) {
        var self = this;
        _.remove(self.state.todos, currentTodo => currentTodo.id === event.id);
        self.setState({todos: self.state.todos});
        axios.delete(BASE_URL + '/todos/' + self.getUserId() + '/delete/' + event.id, {
            headers: {
                Authorization: this.getAuthorizationToken()
            }
        }).then(function() {
        }).catch(function(error) {
            console.log(error);
        });

    }
}
