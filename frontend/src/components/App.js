import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appbar from "./AppBar";
import LeftBar from "./LeftBar";
import Listing from "./Listing";
/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
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
            <Listing />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
