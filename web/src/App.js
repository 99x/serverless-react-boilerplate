import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodoComponent from "./components/todo-component";
import PageNotFound from "./components/page-not-found";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={TodoComponent} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
