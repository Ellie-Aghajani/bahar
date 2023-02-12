import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Plants from "./components/plants";
import PlantForm from "./components/plantForm";
import Customers from "./components/customer";
import Purchase from "./components/purchase";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/plants/:id"  component={PlantForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/plants" component={Plants} />
            <Route path="/customer" component={Customers} />
            <Route path="/purchase" component={Purchase} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/plants" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
