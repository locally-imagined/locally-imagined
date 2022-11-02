import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appbar from "./AppBar";
import LeftBar from "./LeftBar";
import Listing from "./Listing";
import useItems from "../useItems";
import states from "../states";
/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const items = useItems("https://jsonplaceholder.typicode.com/photos"); //fake json data
  let user;
  if (sessionStorage.getItem("user") !== null) {
    user = JSON.parse(sessionStorage.user);
    if (user?.token) states.login = true;
  }
  //console.log(user.token);
  else states.login = false;
  //console.log(states.login);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <Appbar login={states.login} />
            <LeftBar />
            <Listing items={items} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
