import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";
/**
 * Loading
 * @return {object} JSX
 */
const Loading = (props) => {
  return (
    <div className="loading">
      <ReactLoading
        className="loadingLogo"
        type="bars"
        color="grey"
        height={100}
        width={100}
      />
    </div>
  );
};
export default Loading;
