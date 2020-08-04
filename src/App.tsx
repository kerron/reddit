import React from "react";
import { Home } from "./presentation/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Entry from "./presentation/entry/Entry";

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/r/:subreddit/:postId">
          <Entry />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
