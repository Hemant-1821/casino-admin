import React from "react";
import { axiosInstance } from "./axios";

function Trading() {
  const platinum = "platinum";
  const gold = "gold";
  const silver = "silver";

  const initialState = {
    inEditMode: false,
    metalsPrice: {
      [gold]: undefined,
      [silver]: undefined,
      [platinum]: undefined,
    },
    newPrices: {
      [gold]: undefined,
      [silver]: undefined,
      [platinum]: undefined,
    },
  };

  const [state, setState] = React.useState(initialState);
  const [runUseEffect, setRunUseEffect] = React.useState(false);

  React.useEffect(async () => {
    const metalPrices = await axiosInstance
      .get("/trading/price")
      .then((res) => {
        return {
          [gold]: res.data.gold,
          [silver]: res.data.silver,
          [platinum]: res.data.platinum,
        };
      });

    setState({
      ...state,
      metalsPrice: { ...metalPrices },
      newPrices: { ...metalPrices },
    });
    setRunUseEffect(false);
  }, [runUseEffect]);

  const onSubmit = () => {
    if (
      state.newPrices.gold &&
      state.newPrices.silver &&
      state.newPrices.platinum
    ) {
      axiosInstance
        .post(
          "/trading/price",
          {
            userId: localStorage.getItem("adminId"),
            gold: state.newPrices.gold,
            silver: state.newPrices.silver,
            platinum: state.newPrices.platinum,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          setRunUseEffect(true);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Not valid!");
    }
  };

  const onPriceChange = (e) => {
    setState({
      ...state,
      newPrices: { ...state.newPrices, [e.target.name]: e.target.value },
    });
  };

  return (
    <div>
      <div
        className="card container margin-top bg-dark trading-card text-white"
        style={{ width: "45rem" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center">Metal Trading</h3>
          <div className="d-flex justify-content-around my-4 current-price p-4">
            <div className="h4">Current Price:</div>
            <div className="h5">{`Platinum: ${state.metalsPrice.platinum}`}</div>
            <div className="h5">{`Gold: ${state.metalsPrice.gold}`}</div>
            <div className="h5">{`Silver: ${state.metalsPrice.silver}`}</div>
          </div>
          <div className="row mt-5">
            <div class="form-group col-md-4">
              <label for="inputCity">Platinum</label>
              <input
                type="text"
                class="form-control"
                name={platinum}
                value={state.newPrices[platinum]}
                disabled={!state.inEditMode}
                onChange={onPriceChange}
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputCity">Gold</label>
              <input
                type="text"
                class="form-control"
                name={gold}
                value={state.newPrices[gold]}
                disabled={!state.inEditMode}
                onChange={onPriceChange}
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputCity">Silver</label>
              <input
                type="text"
                class="form-control"
                name={silver}
                value={state.newPrices[silver]}
                disabled={!state.inEditMode}
                onChange={onPriceChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center my-4">
            <button
              type="button"
              className="btn btn-light"
              onClick={
                state.inEditMode
                  ? onSubmit
                  : () => setState({ ...state, inEditMode: true })
              }
            >
              {state.inEditMode ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trading;
