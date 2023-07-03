import React from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./pages/Cart";

const Main = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/cart' component={Cart} />
      </Switch>
    </Router>
  );
};

export default Main;
