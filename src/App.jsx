import React from 'react'
import { Switch, Route } from "react-router-dom";
import StartPage from "./components/startPage";
import User from "./components/userEdit"

function App() {
  return (
    <Switch>
        <Route path={'/user'} component={User} />
        <Route path={'/'} component={StartPage}  />
        <Route path={'/'} exact component={StartPage} />
    </Switch>
  );
}

export default App;
