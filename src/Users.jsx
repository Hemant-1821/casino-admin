import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "./axios";

function Users() {
  const [state, setState] = useState({
    _id: undefined,
    name: undefined,
    phoneNumber: undefined,
    email: undefined,
    password: undefined,
    wallet: undefined,
    metals: undefined,
    walletAmt: undefined,
  });

  const [pastRequests, setPastRequests] = useState({});
  const [runUseEffect, setRunUseEffect] = useState(true);

  useEffect(async () => {
    await axiosInstance
      .get("/allUsers")
      .then((resp) => {
        setPastRequests({ ...resp.data.users });
        console.log("Users", resp.data.users);
      })
      .catch((e) => {
        console.error(e);
        toast.error("Something went wrong!");
      });
  }, [runUseEffect]);

  const onAmtInput = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onRecordSelect = (index, e) => {
    console.log(index);
    const record = pastRequests[index];
    if (record)
      setState({
        ...state,
        _id: record._id,
        name: record.name,
        phoneNumber: record.phoneNumber,
        email: record.email,
        password: record.password,
        wallet: record.wallet,
        metals: record.metals,
        walletAmt: record.wallet.totalAmt,
      });
  };

  const onSubmit = () => {
    if (state.name && state.email && state.phoneNumber && state.password) {
      axiosInstance
        .post("allUser", {
          _id: state._id,
          name: state.name,
          phoneNumber: state.phoneNumber,
          email: state.email,
          password: state.password,
          wallet: state.wallet,
          metals: state.metals,
        })
        .then((resp) => {
          toast.info("Updated!");
          setRunUseEffect(!runUseEffect);
          setState({
            _id: undefined,
            name: undefined,
            phoneNumber: undefined,
            email: undefined,
            password: undefined,
            wallet: undefined,
            metals: undefined,
            walletAmt: undefined,
          });
        })
        .catch((e) => {
          console.error(e);
          toast.dark("Something went wrong!");
        });
    } else {
      toast.dark("Please provide all inputs");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 px-1">
          <div
            className="py-3 card margin-top container bg-dark trading-card text-white"
            style={{ width: "28rem" }}
          >
            <div className="card-body">
              <div className="h1 text-center">All requests</div>
              {Object.values(pastRequests).map((result, index) => {
                console.log(result, index);
                return (
                  <div
                    className="card container my-2 cursor-pointer"
                    style={{ width: "24rem", color: "black" }}
                    onClick={(e) => {
                      onRecordSelect(index, e);
                    }}
                    key={result._id}
                  >
                    <div className="d-flex justify-content-around mt-2">
                      <p>User Id - {result._id}</p>
                    </div>
                    <div className="d-flex justify-content-around mt-2">
                      <p>Name - {result.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="py-3 card margin-top container bg-dark trading-card text-white">
            <div className="card-body">
              <div className="h1 text-center">Edit User Form</div>
              <div
                className="container mt-5"
                style={{ paddingLeft: "25%", paddingRight: "25%" }}
              >
                <p className="mt-1">Name:</p>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="Amount"
                  id={"name"}
                  value={state.name}
                  onChange={(e) => onAmtInput(e)}
                />
                <p className="mt-1">Phone Number:</p>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="Amount"
                  id={"phoneNumber"}
                  value={state.phoneNumber}
                  onChange={(e) => onAmtInput(e)}
                />
                <p className="mt-1">Email:</p>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="Amount"
                  value={state.email}
                  id={"email"}
                  onChange={(e) => onAmtInput(e)}
                />
                <p className="mt-1">Password:</p>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  aria-describedby="Amount"
                  value={state.password}
                  onChange={(e) => onAmtInput(e)}
                />
                <p className="mt-1">Wallet Amount:</p>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="Amount"
                  value={state.walletAmt}
                  disabled
                />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={onSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
