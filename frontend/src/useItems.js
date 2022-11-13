import { useEffect, useState } from "react";
import axios from "axios";
import states from "./states";

const useItems = (offset) => {
  const [items, setItems] = useState([]);

  const getSrc = (datas) => {
    return axios.all(
      datas.map((data) => {
        return axios
          .get(
            `https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/${data.imageID}`,
            {}
          )
          .then((res) => {
            if (res.status != 200 || !res.data) {
              throw res;
            } else {
              let src = "data:image/jpeg;base64,";
              src += res.data;

              data.url = src;
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
      .get(`https://locally-imagined.herokuapp.com/posts/getpage/${offset}`, {})
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          setItems(res.data);
          const data = res.data;

          getSrc(data).then(() => {
            setItems(data);
            console.log(data);

            sessionStorage.setItem("items", JSON.stringify(data));
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, [offset]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://bucketeer-8e1fe0c2-5dfb-4787-8878-55a22a5940a8.s3.amazonaws.com/public/8eb1870a-b2a1-4a8d-80a5-858b85190d2b",
  //       {}
  //     )
  //     .then((res) => {
  //       if (res.status != 200 || !res.data) {
  //         throw res;
  //       } else {
  //         //console.log(res.data);
  //         let src = "data:image/jpeg;base64,";
  //         src += res.data;
  //         //console.log(src);

  //         // setItems(img);
  //         setItems(() => {
  //           images[0].url = src;
  //           return images;
  //         });
  //         localStorage.setItem("items", JSON.stringify(items));
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [offset]);

  return items;
};

export default useItems;
