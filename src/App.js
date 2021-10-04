import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/login/login";
import DragonList from "./components/dragons-list/dragonsList";
import Dragon from "./components/dragon/dragon";
import "./App.css";

const App = props => {
  const { isLoggedIn } = props;

  const getRoutes = () => {
  return !isLoggedIn ? (
    <Switch>
      <Route path="/" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  ) : (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dragon/:id" render={props => <Dragon {...props} />} />
        <Route path="/list" exact component={DragonList} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="app">
      <header className="app-header">{getRoutes()}</header>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};



export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
