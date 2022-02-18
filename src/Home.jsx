import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "./axios";

const Home = () => {
  const initialState = {
    userCount: 0,
    earning: 0,
  };
  const [state, setState] = useState(initialState);
  const [dateEarn, setDateEarn] = useState(0);
  const [earn, setEarn] = useState(0);
  const [dateState, setDateState] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  useEffect(async () => {
    await axiosInstance.get("/user/count").then((resp) => {
      setState({ ...state, userCount: resp.data.count });
    });
    await axiosInstance.get("/admin/earnings").then((resp) => {
      let totalEarn = 0;
      resp.data.requests.forEach((req) => {
        totalEarn = +totalEarn + +req.amt;
      });
      setEarn(totalEarn);
    });
  }, []);

  const onSubmit = () => {
    if (!dateState.startDate && !dateState.endDate) {
      toast.dark("Please select date");
      return;
    }
    if (new Date(dateState.startDate) > new Date(dateState.endDate)) {
      toast.dark("Start Date cannot be greater than End Date!");
      return;
    }
    axiosInstance
      .post("/admin/earningDates", {
        startDate: dateState.startDate,
        endDate: dateState.endDate,
      })
      .then((resp) => {
        let totalEarn = 0;
        resp.data.requests.forEach((req) => {
          totalEarn = +totalEarn + +req.amt;
        });
        setDateEarn(totalEarn);
      });
  };

  const onDateChange = (e) => {
    setDateState({ ...dateState, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div
        className="card container margin-top bg-dark trading-card text-white"
        style={{ width: "45rem" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center">Home</h3>
          <div className="d-flex justify-content-around my-4 current-price p-4">
            <div className="d-flex">
              <div className="h4">Registered Users:&nbsp;&nbsp;</div>
              <div className="h4">{`  ${state.userCount}`}</div>
            </div>
            <div className="d-flex">
              <div className="h4">Total Earnings:&nbsp;&nbsp;</div>
              <div className="h4">{`  ${earn}`}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card container margin-top bg-dark trading-card text-white"
        style={{ width: "45rem" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center">Earning</h3>
          <div className="my-4 current-price p-4">
            <div className="d-flex justify-content-around">
              <div>
                From:{" "}
                <input
                  value={dateState.startDate}
                  type="date"
                  id="startDate"
                  onChange={onDateChange}
                />
              </div>
              <div>
                TO:{" "}
                <input
                  value={dateState.endDate}
                  type="date"
                  id="endDate"
                  onChange={onDateChange}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={onSubmit}>
              Submit
            </button>
          </div>
          <div className="d-flex justify-content-around mt-4">
            <div className="h4">
              Total Earnings between this time period:&nbsp;&nbsp;{" "}
              {` ${dateEarn}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
