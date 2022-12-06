import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appbar from "./AppBar";

import Listing from "./Listing";
import { useHistory, Redirect } from "react-router-dom";
import NavBar from "./AccountPage/NavBar";
import AccountPage from "./AccountPage/AccountPage";
import states from "../states";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard/Dashboard";
import ChangePage from "./ChangePage";
import AccountSetting from "./AccountSetting/AccountSetting";
import ContactInfo from "./ContactInfo";
import AlertMsg from "./AlertMsg";
/**
 *
 * @return {object} JSX
 */
function FrontPage() {
  const [tab, setTab] = React.useState("explore");
  const [items, setItems] = useState([]);
  const [artistItem, setArtistItem] = useState([]);
  const [curPath, setCurPath] = useState("");
  const [images, setImages] = React.useState([]);
  const [search, setSearch] = useState("");
  const [bio, setBio] = useState("");
  const [userID, setUserID] = useState("");
  const [contact, setContact] = useState({});
  const [filterQuery, setFilterQuery] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("Login successfully");
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [offset, setOffset] = useState(0);
  const [deleteCheck, setDeleteCheck] = useState([]);
  const [avatar, setAvatar] = React.useState("");
  const [myAvatar, setMyAvatar] = React.useState("");
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
  const getAvatar = (imageID) => {
    // console.log(imageID);
    if (!imageID) return;
    const noImageID = "00000000-0000-0000-0000-000000000000";
    if (imageID === noImageID) {
      setAvatar("");
      sessionStorage.setItem("currAvatar", noImageID);
      return;
    }
    const url = `https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/${imageID}`;
    // console.log(url);

    return axios
      .get(url, {})
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          let src = "data:image/jpeg;base64,";
          src += res.data;
          setAvatar(encodeURI(src));
          sessionStorage.setItem("currAvatar", imageID);
          // console.log("avatar src:", encodeURI(src));
        }
      })
      .catch((err) => {
        setError(true);
        setMsg(`error:${err}`);
      });
  };

  const getMyAvatar = (imageID) => {
    // console.log(imageID);
    if (!imageID) return;
    const noImageID = "00000000-0000-0000-0000-000000000000";
    if (imageID === noImageID) {
      setAvatar("");
      sessionStorage.setItem("myAvatar", noImageID);
      return;
    }
    const url = `https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/${imageID}`;
    // console.log(url);

    return axios
      .get(url, {})
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          let src = "data:image/jpeg;base64,";
          src += res.data;
          setMyAvatar(encodeURI(src));
          sessionStorage.setItem("myAvatar", imageID);
          // console.log("avatar src:", encodeURI(src));
        }
      })
      .catch((err) => {
        setError(true);
        setMsg(`error:${err}`);
      });
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
            setError(true);
            setMsg(`error:${err}`);
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
            if (res.status != 200) {
              throw res;
            } else {
              let src = "data:image/jpeg;base64,";
              src += res.data;
              data.url = encodeURI(src);
            }
          })
          .catch((err) => {
            setError(true);
            setMsg(`error:${err}`);
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
        setError(true);
        setMsg(`error:${err}`);
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
        setError(true);
        setMsg(`error:${err}`);
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
        setError(true);
        setMsg(`error:${err}`);
        setLoading(false);
      });
  };
  const getInfo = (userID) => {
    if (!userID) return;
    setLoading(true);
    const url = `https://locally-imagined.herokuapp.com/users/info?userID=${userID}`;
    axios
      .get(url, {})
      .then((res) => {
        if (res.status != 200) {
          throw res;
        } else {
          const data = res.data;
          // console.log(JSON.parse(JSON.stringify(data)));
          setContact(JSON.parse(JSON.stringify(data)));
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setMsg(`error:${err}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);

    if (curPath === "/") {
      // console.log(`current path:`, curPath);
      tab === "explore" ? getPosts(filterQuery) : getArtistPosts();
    }
    if (curPath?.includes("profile")) {
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
            setAvatar={setAvatar}
            avatar={avatar}
            getAvatar={getAvatar}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            getMyAvatar={getMyAvatar}
            getInfo={getInfo}
          />
          <span
            style={{
              marginTop: "-4px",
              width: "100vw",
              position: "absolute",
              zIndex: 1,
            }}
          >
            {error && (
              <AlertMsg
                error={error}
                type={"error"}
                setError={setError}
                msg={msg}
              />
            )}
          </span>

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
            setUser={setUser}
            getInfo={getInfo}
            setContact={setContact}
            setAvatar={setAvatar}
            avatar={avatar}
            getAvatar={getAvatar}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            bio={bio}
            setBio={setBio}
          />
          <ChangePage
            items={tab === "explore" ? items : artistItem}
            curPath={curPath}
            offset={offset}
            setOffset={setOffset}
          />
        </Route>

        <Route path="/profile">
          <NavBar
            login={states.login}
            offset={offset}
            setUser={setUser}
            user={user}
            setArtistItem={setArtistItem}
            setSearch={setSearch}
            setUserID={setUserID}
            setAvatar={setAvatar}
            avatar={avatar}
            getAvatar={getAvatar}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            getMyAvatar={getMyAvatar}
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
            setUser={setUser}
            getInfo={getInfo}
            contact={contact}
            setContact={setContact}
            setAvatar={setAvatar}
            avatar={avatar}
            getAvatar={getAvatar}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            getMyAvatar={getMyAvatar}
          />
        </Route>
        <Route path="/settings">
          <NavBar
            login={states.login}
            offset={offset}
            setUser={setUser}
            user={user}
            setArtistItem={setArtistItem}
            setSearch={setSearch}
            setUserID={setUserID}
            setAvatar={setAvatar}
            avatar={avatar}
            getAvatar={getAvatar}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            getMyAvatar={getMyAvatar}
            getInfo={getInfo}
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
            setAvatar={setAvatar}
            avatar={avatar}
            contact={contact}
            getAvatar={getAvatar}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            getInfo={getInfo}
          />
        </Route>
        <Route path="/contact">
          <NavBar
            login={states.login}
            offset={offset}
            setUser={setUser}
            user={user}
            setArtistItem={setArtistItem}
            setSearch={setSearch}
            setUserID={setUserID}
            setAvatar={setAvatar}
            avatar={avatar}
            getAvatar={getAvatar}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            getMyAvatar={getMyAvatar}
          />

          <ContactInfo
            contact={contact}
            loading={loading}
            user={user}
            getInfo={getInfo}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            avatar={avatar}
            getAvatar={getAvatar}
            getMyAvatar={getMyAvatar}
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
            setAvatar={setAvatar}
            avatar={avatar}
            getAvatar={getAvatar}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
            getMyAvatar={getMyAvatar}
          />

          <Dashboard
            art={art}
            setArt={setArt}
            setCurPath={setCurPath}
            setSearch={setSearch}
            setUserID={setUserID}
            setMyAvatar={setMyAvatar}
            myAvatar={myAvatar}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default FrontPage;
