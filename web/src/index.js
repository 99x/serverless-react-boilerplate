import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Login from './components/login';
import TodoListContainer from './components/todo-list-container';

render ((
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/todo-list" component={TodoListContainer}/>
  </Router>
), document.getElementById('app'));
