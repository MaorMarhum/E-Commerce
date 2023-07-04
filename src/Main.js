import React from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

const Main = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/success' component={Success} />
      </Switch>
    </Router>
  );
};

export default Main;
