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
                <h1>
                    Serverless Todo App</h1>
                <CreateTodo createTask={this.createTask.bind(this)}/>
                <TodoList todos={this.state.todos} toggleTask={this.toggleTask.bind(this)} saveTask={this.saveTask.bind(this)} deleteTask={this.deleteTask.bind(this)}/>
            </div>
        );
    }

    createTask(task) {
        var self = this;
        axios.post(BASE_URL + '/todos', task).then(function(response) {
            self.state.todos.push(task);
            self.setState({todos: self.state.todos});
        }).catch(function(error) {
            console.log(error);
        });
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.id === task.id);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({todos: this.state.todos});
    }

    saveTask(oldTask, newTask) {
        var self = this;
        axios.put(BASE_URL + '/todos/update', {
            id: oldTask.id,
            task: newTask
        }).then(function(response) {
            const foundTodo = _.find(self.state.todos, todo => todo.id === oldTask.id);
            foundTodo.task = newTask;
            self.setState({todos: self.state.todos});
        }).catch(function(error) {
            console.log(error);
        });
    }

    deleteTask(taskToDelete) {
        var self = this;
        axios.delete(BASE_URL + '/todos/delete/'+ taskToDelete.id).then(function(response) {
            _.remove(self.state.todos, todo => todo.id === taskToDelete.id);
            self.setState({todos: self.state.todos});
        }).catch(function(error) {
            console.log(error);
        });

    }
}
