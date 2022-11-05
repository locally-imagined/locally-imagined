import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appbar from "./AppBar";
import LeftBar from "./LeftBar";
import Listing from "./Listing";
import useItems from "../useItems";
import dummyData from "./dummyData.json";
import states from "../states";
import { useState } from "react";
//fake json data

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const imgaes = useItems("https://jsonplaceholder.typicode.com/photos");
  const [items, setItems] = useState(dummyData);

  // console.log(data);

  const filterHandler = (filteredItems) => {
    setItems(filteredItems);
    //console.log(`App.js:${filteredItems}`);
  };
  //verify user login state
  if (sessionStorage.getItem("user") !== null) {
    const user = JSON.parse(sessionStorage.user);
    if (user?.token) states.login = true;
  } else states.login = false;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <Appbar
              login={states.login}
              items={imgaes}
              setFilter={filterHandler}
            />
            <LeftBar />
            <Listing items={items} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
