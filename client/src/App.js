import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Plants from "./components/movies";
import Form from "./components/form";
import Customers from "./components/customers";
import Purchase from "./components/purchase";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/plants/:id" component={PlantForm} />
            <Route path="/plants" component={Plants} />
            <Route path="/customers" component={Customers} />
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
