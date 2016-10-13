import React from 'react';
import axios from 'axios';
import CreateTodo from './create-todo';
import TodoList from './todo-list';

const BASE_URL = 'http://localhost:3000';
var todos = [];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos
        };
        this.init();
    }

    init() {
        var self = this;
        axios.get(BASE_URL + '/todos/getAll').then(function(response) {
            self.setState({todos: response.data.result.Items});
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h1>Serverless Todo App</h1>
                <CreateTodo createTask={this.createTask.bind(this)}/>
                <TodoList todos={this.state.todos} toggleTask={this.toggleTask.bind(this)} saveTask={this.saveTask.bind(this)} deleteTask={this.deleteTask.bind(this)}/>
            </div>
        );
    }

    createTask(task) {
        var self = this;
        self.state.todos.unshift(task);
        self.setState({todos: self.state.todos});
        axios.post(BASE_URL + '/todos', task).then(function(response) {})
        .catch(function(error) {
            console.log(error);
        });
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.id === task.id);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
        axios.put(BASE_URL + '/todos/status', {
            id: task.id,
            isCompleted: foundTodo.isCompleted
        }).then(function(response) {            
        }).catch(function(error) {
            console.log(error);
        });
    }

    saveTask(oldTask, newTask) {
        var self = this;
        const foundTodo = _.find(self.state.todos, todo => todo.id === oldTask.id);
        foundTodo.task = newTask;
        self.setState({todos: self.state.todos});
        axios.put(BASE_URL + '/todos/update', {
            id: oldTask.id,
            task: newTask
        }).then(function(response) {            
        }).catch(function(error) {
            console.log(error);
        });
    }

    deleteTask(taskToDelete) {
        var self = this;
        _.remove(self.state.todos, todo => todo.id === taskToDelete.id);
            self.setState({todos: self.state.todos});
        axios.delete(BASE_URL + '/todos/delete/'+ taskToDelete.id).then(function(response) {            
        }).catch(function(error) {
            console.log(error);
        });

    }
}
