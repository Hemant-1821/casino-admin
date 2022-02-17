import React from "react";

const navbar = (props) => {
  const onLogout = () => {
    props.logout();
    window.location.reload(false);
  };

  return (
    <nav className="navbar fixed-top background-dark justify-content-between">
      <div className="container">
        <a className="navbar-brand text-white" href="/">
          CASINO(Admin)
        </a>
        {props.userId && (
          <div className="d-flex flex-row">
            <a className="nav-link text-white" href="/">
              Home
            </a>
            <a className="nav-link text-white" href="/Trading">
              Trading
            </a>
            <a className="nav-link text-white" href="/game">
              Play Game
            </a>
            <a className="nav-link text-white" href="/profile">
              Profile
            </a>
            <a className="nav-link text-white" href="/withdraw">
              Withdraw
            </a>
            <a className="nav-link text-white" href="/Users">
              Users
            </a>
            <div
              role="menuitem"
              tabIndex={0}
              onKeyDown={onLogout}
              className="nav-link text-white cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default navbar;
