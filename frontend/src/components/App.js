import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appbar from "./AppBar";

import Listing from "./Listing";

import NavBar from "./AccountPage/NavBar";
import AccountPage from "./AccountPage/AccountPage";
import states from "../states";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard/Dashboard";
//fake json data

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const [items, setItems] = useState([]);

  const getSrc = (datas) => {
    return axios.all(
      datas.map(async (data) => {
        return axios
          .get(
            `https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/${data.imageIDs[0]}`,
            {}
          )
          .then((res) => {
            if (res.status != 200 || !res.data) {
              throw res;
            } else {
              let src = "data:image/jpeg;base64,";
              src += res.data;
              data.url = encodeURI(src);
              //console.log(src);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
    );
  };
  useEffect(() => {
    axios
      .get("https://locally-imagined.herokuapp.com/posts/getpage/0", {})
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          const data = res.data;
          getSrc(data).then(() => {
            setItems(data);
            console.log(JSON.parse(JSON.stringify(data)));
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [login, setLogin] = useState(states.login);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  //Post object
  const [art, setArt] = useState({
    title: "",
    description: "",
    price: "",
    medium:"",
    content: [],

  });
  // console.log(data);

  const filterHandler = (filteredItems) => {
    setItems(filteredItems);
    //console.log(`App.js:${filteredItems}`);
  };
  //verify user login state
  if (sessionStorage.getItem("user") !== null) {
    const user = JSON.parse(sessionStorage.user);
    useEffect(() => {
      setUser(user);
    }, []);
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
              items={items}
              setFilter={filterHandler}
              user={user}
              setUser={setUser}
            />

            <Listing items={items} user={user} />
          </div>
        </Route>
        <Route path="/account">
          <NavBar login={states.login} user={user} setUser={setUser} />
          <AccountPage user={user} items={items} />
        </Route>

        <Route path="/dashboard">
          <NavBar login={states.login} user={user} setUser={setUser} />
          <Dashboard art={art} setArt={setArt} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
