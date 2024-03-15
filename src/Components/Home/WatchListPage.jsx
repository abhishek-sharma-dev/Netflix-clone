import React from "react";
import "./WatchListPage.scss";
import { useSelector } from "react-redux";
import Row from "./Row";

const WatchListPage = () => {
  const { watchlist } = useSelector((store) => store.data);

return (
    <>
    <div className="watchlist-container">
          <Row title={"My Watchlist"} movie={watchlist} />
    </div>
    </>
  );
};

export default WatchListPage;
