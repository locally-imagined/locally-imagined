import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appbar from "./AppBar";

import Listing from "./Listing";
import { useHistory } from "react-router-dom";
import NavBar from "./AccountPage/NavBar";
import AccountPage from "./AccountPage/AccountPage";
import states from "../states";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard/Dashboard";
import ChangePage from "./ChangePage";

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [images, setImages] = React.useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [offset, setOffset] = useState(0);
  const [deleteCheck, setDeleteCheck] = useState([]);
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
    medium: "",
    content: [],
  });
  const imageSet = [];
  const getImagesSetSrc = (datas) => {
    return axios.all(
      datas.map(async (id) => {
        return axios
          .get(
            `https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/${id}`,
            {}
          )
          .then((res) => {
            if (res.status != 200 || !res.data) {
              throw res;
            } else {
              let src = "data:image/jpeg;base64,";
              src += res.data;
              // console.log(src);

              imageSet.push({ src: encodeURI(src), imageId: id });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
    );
  };
  const getImagesSet = (postID) => {
    axios
      .get(
        `https://locally-imagined.herokuapp.com/posts/getimages/${postID}`,
        {}
      )
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          const data = res.data;
          // console.log(data);
          getImagesSetSrc(data).then(() => {
            setImages(imageSet);
            setDeleteCheck(Array(imageSet.length).fill(false));
            console.log(imageSet);
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

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
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
    );
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://locally-imagined.herokuapp.com/posts/getpage/${offset}${
          search ? `?keyword=${search}` : ``
        }`,
        {}
      )
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          const data = res.data;
          getSrc(data).then(() => {
            data.length === 0 ? setNoResult(true) : setNoResult(false);
            setItems(data);
            setLoading(false);

            console.log(JSON.parse(JSON.stringify(data)));
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset]);

  const filterHandler = (filteredItems) => {
    setItems(filteredItems);
  };
  //verify user login state

  if (sessionStorage.getItem("user") !== null) {
    const userState = JSON.parse(sessionStorage.user);
    if (!user.userName) setUser(userState);
    states.login = userState?.token ? true : false;
  } else states.login = false;

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/`} exact>
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
              offset={offset}
              getSrc={getSrc}
              setSearch={setSearch}
              search={search}
              setOffset={setOffset}
              loading={loading}
              setLoading={setLoading}
              noResult={noResult}
              setNoResult={setNoResult}
            />
            <Listing
              items={items}
              loading={loading}
              user={user}
              images={images}
              offset={offset}
              setImages={setImages}
              getImagesSet={getImagesSet}
              noResult={noResult}
            />
            <ChangePage setOffset={setOffset} offset={offset} items={items} />
          </div>
        </Route>

        <Route path="/account">
          <NavBar
            login={states.login}
            user={user}
            offset={offset}
            setUser={setUser}
          />
          <AccountPage
            user={user}
            items={items}
            setOffset={setOffset}
            offset={offset}
            images={images}
            setImages={setImages}
            getImagesSet={getImagesSet}
            deleteCheck={deleteCheck}
            setDeleteCheck={setDeleteCheck}
            getSrc={getSrc}
          />
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
