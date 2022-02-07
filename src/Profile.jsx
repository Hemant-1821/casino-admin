import React, { useState, useEffect } from "react";
import { axiosInstance } from "./axios";

const Profile = () => {
  const initialState = {
    email: "",
    password: "",
    inEditMode: "",
  };
  const [state, setState] = useState(initialState);

  useEffect(async () => {
    await axiosInstance
      .get("/user", {
        params: {
          userId: localStorage.getItem("adminId"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setState({
          ...state,
          email: resp.data.user.email,
          password: resp.data.user.password,
        });
      });
  }, []);

  const handlePasswordChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onSubmit = async () => {
    await axiosInstance
      .post("/user", {
        userId: localStorage.getItem("adminId"),
        email: state.email,
        password: state.password,
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.resCode === 200) {
          setState({
            ...state,
            inEditMode: false,
          });
        }
      });
  };

  return (
    <div>
      <div className="margin-top">
        <div
          className="py-3 card container bg-dark trading-card text-white"
          style={{ width: "25rem" }}
        >
          <div className="card-body">
            <div className="h3 text-center">Admin Profile</div>
            <form>
              <div className="my-4">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={state.email}
                  disabled={true}
                />
              </div>
              <div className="my-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={state.inEditMode ? "Text" : "password"}
                  className="form-control"
                  id="password"
                  value={state.password}
                  onChange={handlePasswordChange}
                  disabled={!state.inEditMode}
                />
              </div>
              <div className="mt-4 text-center">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
