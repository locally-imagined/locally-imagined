import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appbar from "./AppBar";
import LeftBar from "./LeftBar";
import Listing from "./Listing";
import useItems from "../useItems";
/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const items = useItems("https://jsonplaceholder.typicode.com/photos"); //fake json data

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <Appbar />
            <LeftBar />
            <Listing items={items} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
