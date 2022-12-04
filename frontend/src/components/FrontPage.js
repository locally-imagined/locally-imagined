import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appbar from "./AppBar";

import Listing from "./Listing";
import { useHistory, useLocation, Redirect, Link } from "react-router-dom";
import NavBar from "./AccountPage/NavBar";
import AccountPage from "./AccountPage/AccountPage";
import states from "../states";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard/Dashboard";
import ChangePage from "./ChangePage";
import AccountSetting from "./AccountSetting/AccountSetting";

/**
 *
 * @return {object} JSX
 */
function FrontPage() {
  const history = useHistory();
  const [tab, setTab] = React.useState("explore");
  const [items, setItems] = useState([]);
  const [artistItem, setArtistItem] = useState([]);
  const [curPath, setCurPath] = useState("");
  const [images, setImages] = React.useState([]);
  const [search, setSearch] = useState("");
  const [userID, setUserID] = useState("");

  const [filterQuery, setFilterQuery] = useState("");
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
  const imageSet = [];
  //Post object
  const [art, setArt] = useState({
    title: "",
    description: "",
    price: "",
    medium: "",
    deliverytype: "",
    content: [],
  });
  const filterOption = {
    medium: "all",
  };
  const filterHandler = (filteredItems) => {
    setItems(filteredItems);
  };

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
            // console.log(imageSet);
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const getArtistPosts = (userID) => {
    if (!userID) {
      userID = sessionStorage.getItem("currentUserID");
    }
    setLoading(true);
    const url = `https://locally-imagined.herokuapp.com/posts/artistposts/${offset}?userID=${userID}`;
    // console.log(`url:${url}`);
    axios
      .get(url, {})
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          const data = res.data;
          // console.log(data);
          getSrc(data).then(() => {
            data.length === 0 ? setNoResult(true) : setNoResult(false);
            setArtistItem(data);
            setLoading(false);
            // console.log(JSON.parse(JSON.stringify(data)));
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const getPosts = (filterQuery) => {
    let url = "";
    setLoading(true);
    if (!filterQuery && !search) {
      const baseUrl = `https://locally-imagined.herokuapp.com/posts/getpage/`;
      url = `${baseUrl}${offset}`;
    } else {
      const baseUrl = `https://locally-imagined.herokuapp.com/posts/getpagefiltered/`;
      url = `${baseUrl}${offset}?${
        search ? `keyword=${encodeURIComponent(search)}` : ``
      }${search ? `&${filterQuery}` : filterQuery}`;
    }

    // console.log(url);
    axios
      .get(url, {})
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          const data = res.data;
          getSrc(data).then(() => {
            data.length === 0 ? setNoResult(true) : setNoResult(false);
            setItems(data);
            setLoading(false);
            // console.log(JSON.parse(JSON.stringify(data)));
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (curPath.includes("/getpage")) {
      // console.log(`current path:`, curPath);
      tab === "explore" ? getPosts(filterQuery) : getArtistPosts();
    }
    if (curPath.includes("/posts/artistposts")) {
      // console.log(curPath);
      getArtistPosts(userID);
    }
  }, [offset, curPath, userID]);

  //verify user login state

  if (sessionStorage.getItem("user") !== null) {
    const userState = JSON.parse(sessionStorage.user);
    if (!user.userName) setUser(userState);
    states.login = userState?.token ? true : false;
  } else states.login = false;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect from="/" to={`/getpage`}></Redirect>
        </Route>
        <Route path="/getpage">
          <Appbar
            items={tab === "explore" ? items : artistItem}
            login={states.login}
            loading={loading}
            noResult={noResult}
            offset={offset}
            search={search}
            tab={tab}
            user={user}
            setTab={setTab}
            getSrc={getSrc}
            getArtistPosts={getArtistPosts}
            setOffset={setOffset}
            setUser={setUser}
            setLoading={setLoading}
            setSearch={setSearch}
            setFilter={filterHandler}
            setNoResult={setNoResult}
            setCurPath={setCurPath}
            setUserID={setUserID}
            getPosts={getPosts}
          />
          <Listing
            items={tab === "explore" ? items : artistItem}
            images={images}
            noResult={noResult}
            loading={loading}
            offset={offset}
            tab={tab}
            user={user}
            artistItem={artistItem}
            setArtistItem={setArtistItem}
            setTab={setTab}
            setOffset={setOffset}
            getArtistPosts={getArtistPosts}
            getImagesSet={getImagesSet}
            setImages={setImages}
            setFilterQuery={setFilterQuery}
            filterOption={filterOption}
            getPosts={getPosts}
            setUserID={setUserID}
          />
          <ChangePage
            items={tab === "explore" ? items : artistItem}
            curPath={curPath}
            offset={offset}
            setOffset={setOffset}
          />
        </Route>

        <Route path="/posts/artistposts/userID:userID">
          <NavBar
            login={states.login}
            offset={offset}
            setUser={setUser}
            user={user}
            setArtistItem={setArtistItem}
            setSearch={setSearch}
            setUserID={setUserID}
          />
          <AccountPage
            artistItem={artistItem}
            items={items}
            images={images}
            deleteCheck={deleteCheck}
            loading={loading}
            noResult={noResult}
            offset={offset}
            user={user}
            getImagesSet={getImagesSet}
            getSrc={getSrc}
            setImages={setImages}
            setOffset={setOffset}
            setDeleteCheck={setDeleteCheck}
            setCurPath={setCurPath}
            setArtistItem={setArtistItem}
            setUserID={setUserID}
          />
        </Route>
        <Route path="/setting">
          <NavBar
            login={states.login}
            offset={offset}
            setUser={setUser}
            user={user}
            setArtistItem={setArtistItem}
            setSearch={setSearch}
            setUserID={setUserID}
          />
          <AccountSetting
            artistItem={artistItem}
            items={items}
            images={images}
            deleteCheck={deleteCheck}
            loading={loading}
            noResult={noResult}
            offset={offset}
            user={user}
            getImagesSet={getImagesSet}
            getSrc={getSrc}
            setImages={setImages}
            setOffset={setOffset}
            setDeleteCheck={setDeleteCheck}
            setCurPath={setCurPath}
            setArtistItem={setArtistItem}
            setUserID={setUserID}
          />
        </Route>
        <Route path="/dashboard">
          <NavBar
            login={states.login}
            offset={offset}
            setUser={setUser}
            user={user}
            setArtistItem={setArtistItem}
            setSearch={setSearch}
            setUserID={setUserID}
          />
          <Dashboard
            art={art}
            setArt={setArt}
            setCurPath={setCurPath}
            setSearch={setSearch}
            setUserID={setUserID}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default FrontPage;
