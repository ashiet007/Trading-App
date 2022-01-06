import React from "react";
import Ticker from "./Ticker";
import Chart from "./Chart";
import Feed from "../Feed";
import BuySell from "./BuySell";
import Order from "./Order";

const Crypto = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Ticker />
        <div className="col-xl-6">
          <Chart />
          <Feed />
        </div>
        <div className="col-xl-3">
          <BuySell />
          <Order />
        </div>
      </div>
    </div>
  );
};

export default Crypto;
