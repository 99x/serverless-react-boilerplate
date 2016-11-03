import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Login from './components/login';
import ItemListContainer from './components/item-list-container';

render ((
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/item-list" component={ItemListContainer}/>
  </Router>
), document.getElementById('app'));
