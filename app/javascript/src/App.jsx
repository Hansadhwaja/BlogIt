import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "./components/Home";
import { Create, Show } from "./components/Post";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Show} path="/posts/:slug/show" />
      <Route exact component={Create} path="/posts/create" />
      <Route exact component={Home} path="/" />
    </Switch>
  </Router>
);

export default App;
