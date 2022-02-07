import React, { useEffect, useState } from "react";
import { axiosInstance } from "./axios";

const Home = () => {
  const initialState = {
    userCount: 0,
    earning: 0,
  };
  const [state, setState] = useState(initialState);
  useEffect(async () => {
    await axiosInstance.get("/user/count").then((resp) => {
      setState({ ...state, userCount: resp.data.count });
    });
  });
  return (
    <div
      className="card container margin-top bg-dark trading-card text-white"
      style={{ width: "45rem" }}
    >
      <div className="card-body">
        <h3 className="card-title text-center">Metal Trading</h3>
        <div className="d-flex justify-content-around my-4 current-price p-4">
          <div className="d-flex">
            <div className="h4">Registered Users:&nbsp;&nbsp;</div>
            <div className="h4">{`  ${state.userCount}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
