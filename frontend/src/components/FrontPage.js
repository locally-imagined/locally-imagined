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
import ChangePage from "./ChangePage";
import AccountSetting from "./AccountSetting/AccountSetting";
import ContactInfo from "./ContactInfo";
import AlertMsg from "./AlertMsg";
import AboutBar from "./AboutPage/AboutBar";
import AboutPage from "./AboutPage/AboutPage";
import HorizontalScroll from "react-horizontal-scrolling";
import "./FrontPage.css";
/**
 *
 * @return {object} JSX
 */
function FrontPage() {
  //Component related state
  const [curPath, setCurPath] = useState("");
  const [tab, setTab] = React.useState("explore");
  const [items, setItems] = useState([]);
  //User related states
  const [userID, setUserID] = useState("");
  const [artistItem, setArtistItem] = useState([]);
  const [artists, setArtists] = useState([]);
  const [images, setImages] = React.useState([]);
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState({});
  const [avatar, setAvatar] = React.useState("");
  const [myAvatar, setMyAvatar] = React.useState("");
  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [art, setArt] = useState({
    title: "",
    description: "",
    price: "",
    medium: "",
    deliverytype: "",
    content: [],
  });
  //Filter related states
  const [search, setSearch] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const filterOption = {
    medium: "all",
  };
  const filterHandler = (filteredItems) => {
    setItems(filteredItems);
  };
  //utility related states
  const [msg, setMsg] = useState("Login successfully");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [offset, setOffset] = useState(0);
  const noImageID = "00000000-0000-0000-0000-000000000000";
  const imageSet = [];

  //Axios functions
  /*
  Get the user avatar
  input: imageID, option
  output: nil
  */
  const getAvatar = (imageID, option) => {
    // console.log(imageID);
    // console.log("otion:", option);
    if (!imageID) return;

    if (imageID === noImageID) {
      setAvatar("");
      sessionStorage.setItem("myAvatar", noImageID);
      return;
    }
    const url = `https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/${imageID}`;
    return axios
      .get(url, {})
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          let src = "data:image/jpeg;base64,";
          src += res.data;
          if (option === "otherAvatar") {
            setAvatar(encodeURI(src));
            sessionStorage.setItem("currAvatar", imageID);
          }
          if (option === "myAvatar") {
            setMyAvatar(encodeURI(src));
            sessionStorage.setItem("myAvatar", imageID);
          }
        }
      })
      .catch((err) => {
        setError(true);
        setMsg(`error:${err}`);
      });
  };

  /*
  Get the real image src from S3 and add url property to data object
  input: data fetched from API
  output: data
  */
  const getImagesSetSrc = (datas) => {
    return axios.all(
      datas.map(async (id) => {
        // console.log(id);
        return await axios
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
              let index = datas.indexOf(id);
              imageSet[index] = { src: encodeURI(src), imageId: id };
            }
          })
          .catch((err) => {
            setError(true);
            setMsg(`error:${err}`);
          });
      })
    );
  };
  /*
  Get the real image src from S3 and add url property to data object
  input: data: image object fetched from API, option: imageSet or listing
  output: data
  */
  const getSrc = (datas, option) => {
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

  /*
  This is for Artists tab experiments
  */
  const getArtistSrc = (datas, option) => {
    return axios.all(
      datas.map(async (data) => {
        return axios
          .get(
            `https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/${data.profpicID}`,
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
  /*
  Get all images associate with the listing from API
  */
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
        setError(true);
        setMsg(`error:${err}`);
      });
  };
  /*
  Get user's own listings from API
  */
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
  /*
  This is for Artists preview picture experiments
  */
  const getArtistPreviewSrc = (datas) => {
    return axios.all(
      datas.map(async (data) => {
        return axios
          .get(
            `https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/${data.previewDataID}`,
            {}
          )
          .then((res) => {
            if (res.status != 200) {
              throw res;
            } else {
              let src = "data:image/jpeg;base64,";
              src += res.data;
              data.previewUrl = encodeURI(src);
            }
          })
          .catch((err) => {
            setError(true);
            setMsg(`error:${err}`);
          });
      })
    );
  };
  /*
  This is for Artists preview picture experiments
  */

  const getArtistPreview = (datas) => {
    return axios.all(
      datas.map(async (data) => {
        return axios
          .get(
            `https://locally-imagined.herokuapp.com/posts/artistposts/0?userID=${data.userID}`,
            {}
          )
          .then(async (res) => {
            if (res.status != 200 || !res.data) {
              throw res;
            } else {
              const previewDataID = res.data[0].imageIDs[0];
              // console.log(`previewDataID`, previewDataID);
              data.previewDataID = previewDataID;
            }
          })
          .catch((err) => {
            setLoading(false);
            setError(true);
            setMsg(`error:${err}`);
          });
      })
    );
  };
  /*
  Get artists who have made posts
  */
  const getArtists = (userID) => {
    if (!userID) {
      userID = sessionStorage.getItem("currentUserID");
    }
    setLoading(true);
    const url = `https://locally-imagined.herokuapp.com/posts/artists/${offset}`;
    // console.log(`url:${url}`);
    axios
      .get(url, {})
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          const data = res.data;
          // console.log(data);
          getArtistSrc(data).then(() => {
            data.length === 0 ? setNoResult(true) : setNoResult(false);
            getArtistPreview(data).then(() => {
              getArtistPreviewSrc(data).then(() => {
                // console.log(data);
                setArtists(data);
                setLoading(false);
              });
            });
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMsg(`error:${err}`);
      });
  };
  /*
    Get post listings from API
    */
  const getPosts = (_filterQuery) => {
    let url = "";
    let filterQuery;
    filterQuery = _filterQuery ? _filterQuery : "";
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
    console.log(url);
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
            //console.log(JSON.parse(JSON.stringify(data)));
          });
        }
      })
      .catch((err) => {
        setError(true);
        setMsg(`error:${err}`);
        setLoading(false);
      });
  };
  /*
  Get user contact info from API
  */
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
  /*
  Reset the listing when page refresh
  */

  useEffect(() => {
    setLoading(true);
    if (curPath === "/") {
      tab === "explore" ? getPosts(filterQuery) : getArtists();
    }
    if (curPath?.includes("profile")) {
      getArtistPosts(userID);
    }
  }, [offset, curPath, userID]);

  /*
  verify user login state
  */

  if (sessionStorage.getItem("user") !== null) {
    const userState = JSON.parse(sessionStorage.user);
    if (!user.userName) setUser(userState);
    states.login = userState?.token ? true : false;
  } else states.login = false;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <div className="container-box">
            <div className="appbar-box">
              {/* <header> */}
              <Appbar
                items={tab === "explore" ? items : artists}
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
                setError={setError}
                setSuccess={setSuccess}
                setMsg={setMsg}
                setCurPath={setCurPath}
                setUserID={setUserID}
                getPosts={getPosts}
                setAvatar={setAvatar}
                avatar={avatar}
                getAvatar={getAvatar}
                setMyAvatar={setMyAvatar}
                myAvatar={myAvatar}
                getInfo={getInfo}
                filterQuery={filterQuery}
                artist={artists}
                setArtists={setArtists}
              />
            </div>

            {error && (
              <AlertMsg
                error={error}
                type={"error"}
                setError={setError}
                msg={msg}
              />
            )}
            {success && (
              <AlertMsg
                success={success}
                type={"success"}
                setSuccess={setSuccess}
                msg={msg}
              />
            )}
            <article className="listing-box">
              {/* <div> */}
              <Listing
                items={tab === "explore" ? items : artists}
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
                setSuccess={setSuccess}
                setError={setError}
                setMsg={setMsg}
                getArtists={getArtists}
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
                artist={artists}
                setArtists={setArtists}
              />
              {/* <div> */}
              <div className="pagination-container">
                <ChangePage
                  items={tab === "explore" ? items : artists}
                  curPath={curPath}
                  offset={offset}
                  setOffset={setOffset}
                />
              </div>

              {/* <footer> */}
            </article>
            <div className="aboutbar-container">
              <AboutBar />
            </div>
          </div>
        </Route>

        <Route path="/profile">
          <div className="container-box">
            <header className="appbar-box">
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
                artist={artists}
                setArtists={setArtists}
              />
            </header>
            {error && (
              <AlertMsg
                error={error}
                type={"error"}
                setError={setError}
                msg={msg}
              />
            )}
            {success && (
              <AlertMsg
                success={success}
                type={"success"}
                setSuccess={setSuccess}
                msg={msg}
              />
            )}
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
              artist={artists}
              setArtists={setArtists}
            />
            {/* <div> */}
            <div className="pagination-container">
              <ChangePage
                items={tab === "explore" ? items : artists}
                curPath={curPath}
                offset={offset}
                setOffset={setOffset}
              />
            </div>
          </div>
        </Route>
        <Route path="/settings">
          <div>
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
              getInfo={getInfo}
              artist={artists}
              setArtists={setArtists}
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
              artist={artists}
              setArtists={setArtists}
            />
          </div>
        </Route>
        <Route path="/contact">
          <div>
            <header className="appbar-box">
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
                artist={artists}
                setArtists={setArtists}
              />
            </header>
            <ContactInfo
              contact={contact}
              loading={loading}
              user={user}
              getInfo={getInfo}
              setMyAvatar={setMyAvatar}
              myAvatar={myAvatar}
              avatar={avatar}
              getAvatar={getAvatar}
            />
          </div>
        </Route>
        <Route path="/create">
          <div className="container-box-flex">
            <header className="appbar-box">
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
                artist={artists}
                setArtists={setArtists}
              />
            </header>
            <Dashboard
              art={art}
              setArt={setArt}
              setCurPath={setCurPath}
              setArtistItem={setArtistItem}
              setSearch={setSearch}
              setAvatar={setAvatar}
              setUserID={setUserID}
              setMyAvatar={setMyAvatar}
              getAvatar={getAvatar}
              myAvatar={myAvatar}
              getInfo={getInfo}
              artist={artists}
              setArtists={setArtists}
            />
          </div>
        </Route>
        <Route path="/about">
          <div>
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
              artist={artists}
              setArtists={setArtists}
            />
            <AboutPage />
            <AboutBar />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default FrontPage;
