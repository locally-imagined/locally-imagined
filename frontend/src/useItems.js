import { useEffect, useState } from "react";
import states from "./states";

const useItems = (url) => {
  const [items, setItems] = useState(states.items);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        states.items = json;
        states.filteredItems = states.items;

        setItems(json);
      })
      .catch(() => {
        states.items = [];
        states.filteredItems = [];
        setItems([]);
      });
  }, [url]);

  return items;
};

export default useItems;
