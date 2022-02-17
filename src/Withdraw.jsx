import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "./axios";

function Withdraw() {
  const [state, setState] = useState({
    amt: undefined,
    accountNo: undefined,
    ifsc: undefined,
    amtTrans: undefined,
    transactionId: undefined,
    withdrawId: undefined,
  });

  const [pastRequests, setPastRequests] = useState({});
  const [runUseEffect, setRunUseEffect] = useState(true);

  useEffect(async () => {
    await axiosInstance
      .get("/admin/withdrawRequests")
      .then((resp) => {
        setPastRequests({ ...resp.data.requests });
        console.log("past requests", resp.data.requests);
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
        amt: record.amt,
        accountNo: record.accountNo,
        ifsc: record.ifsc,
        withdrawId: record._id,
      });
  };

  const onSubmit = () => {
    if (state.transactionId && state.amtTrans) {
      axiosInstance
        .post("withdraw", {
          withdrawId: state.withdrawId,
          amtTrans: state.amtTrans,
          transactionId: state.transactionId,
        })
        .then((resp) => {
          toast.info("Request placed!");
          setRunUseEffect(!runUseEffect);
          setState({
            amt: undefined,
            accountNo: undefined,
            ifsc: undefined,
            amtTrans: undefined,
            transactionId: undefined,
            withdrawId: undefined,
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
                      <p>User Id - {result.userId}</p>
                    </div>
                    <div className="d-flex justify-content-around mt-2">
                      <p>Amount - {result.amt}</p>
                      <p>
                        Status - {result.withdrawId ? "Complete" : "Pending"}
                      </p>
                    </div>
                    {result.withdrawId && (
                      <div className="d-flex justify-content-around mt-2">
                        <p>Transaction Id - {result.transactionId}</p>
                        <p>Amount Transferred: {result.amtTrans}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="py-3 card margin-top container bg-dark trading-card text-white">
            <div className="card-body">
              <div className="h1 text-center">Edit Request Form</div>
              <div
                className="row mt-5"
                style={{ paddingLeft: "25%", paddingRight: "25%" }}
              >
                <p className="mt-1 mb-0">Amount:</p>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="Amount"
                  value={state.amt}
                  onChange={(e) => onAmtInput(e)}
                  disabled
                />
                <p className="mt-1 mb-0">Account Number:</p>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="Amount"
                  value={state.accountNo}
                  onChange={(e) => onAmtInput(e)}
                  disabled
                />
                <p className="mt-1 mb-0">IFSC Code:</p>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="Amount"
                  value={state.ifsc}
                  onChange={(e) => onAmtInput(e)}
                  disabled
                />{" "}
                <p className="mt-1 mb-0">Amount Transferred:</p>
                <input
                  type="text"
                  className="form-control"
                  id="amtTrans"
                  aria-describedby="Amount"
                  value={state.amtTrans}
                  onChange={(e) => onAmtInput(e)}
                />
                <p className="mt-1 mb-0">Transaction Id:</p>
                <input
                  type="text"
                  className="form-control"
                  id="transactionId"
                  aria-describedby="Amount"
                  value={state.transactionId}
                  onChange={(e) => onAmtInput(e)}
                />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
