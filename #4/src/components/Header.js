import React, { Component } from "react";
import firebase from "firebase";
import $ from "jquery";
import logo from "./../logo.png";
import ModalReg from "./ModalReg";
import ModalLogin from "./ModalLogin";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val: true
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSidebarClick = this.handleSidebarClick.bind(this);
  }

  handleRegistrationClick(event) {
    event.preventDefault();
    $("#modal-reg").show("slow");
  }

  handleLoginClick(event) {
    event.preventDefault();
    $("#modal-login").show("slow");
  }

  handleLogoutClick(event) {
    firebase
      .auth()
      .signOut()
      .then(this.props.logOut)
      .catch(err => {
        console.log(err);
      });
  }

  handleSidebarClick() {
    if (this.state.val == false) {
      $(".sidebar").show("slow");
      this.setState({ val: true });
    } else if (this.state.val == true) {
      $(".sidebar").hide("slow");
      this.setState({ val: false });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <header>
        <div id="errors" />
        <div className="menu-container">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <ul className="menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Portfolio</a>
            </li>
            <li>
              <a href="/">Services</a>
            </li>
            <li>
              <a href="/">Blog</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
            {user && (
              <li>
                <i
                  className="fa fa-bars"
                  aria-hidden="true"
                  id="burger"
                  onClick={this.handleSidebarClick}
                />
              </li>
            )}
          </ul>
          {!user ? (
            <ul className="authmenu">
              <li className="Login" onClick={this.handleLoginClick}>
                <a href="/">Login</a>
              </li>
              <li className="Reg">
                <a href="/" onClick={this.handleRegistrationClick}>
                  Registration
                </a>
              </li>
            </ul>
          ) : (
            <div>
              <div className="name">{user && user.displayName}</div>
              {user && (
                <button onClick={this.handleLogoutClick} id="logOut">
                  log out
                </button>
              )}
            </div>
          )}
        </div>

        <ModalReg loggedIn={this.props.loggedIn} />
        <ModalLogin loggedIn={this.props.loggedIn} />
      </header>
    );
  }
}

export default Header;
