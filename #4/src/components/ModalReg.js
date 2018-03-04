import React, { Component } from "react";
import firebase from "firebase";
import $ from "jquery";

class ModalReg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      email: "",
      password: "",
      repeatPassword: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
  }

  handleInput(field) {
    return event => {
      const newState = Object.assign({}, this.state); // clone state to newState
      newState[field] = event.target.value;
      this.setState(newState);
    };
  }

  handleClickRegister(event) {
    event.preventDefault();

    const { login, email, password, repeatPassword } = this.state;
    let errors = "";

    if (!email) errors += "Email обязателен.\n";
    if (password !== repeatPassword) errors += "Пароли не совпадают.\n";
    if (login.length === 0) errors += "Введите имя.\n";

    if (errors) return alert(errors);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.updateProfile({ displayName: login }).then(() => {
          this.props.loggedIn(user);
          $(this.rootElement).hide();
        });
      })
      .catch(err => {
        alert(err.message);
        console.error(err.message);
      });
  }

  render() {
    const { login, email, password, repeatPassword } = this.state;
    return (
      <div ref={element => (this.rootElement = element)} id="modal-reg">
        <form name="register" action="" className="hideRegForm">
          <h3>Введите данные</h3>
          <input
            onChange={this.handleInput("login")}
            value={login}
            type="text"
            id="register_login"
            placeholder="Login"
          />
          <input
            onChange={this.handleInput("email")}
            value={email}
            type="email"
            id="register_email"
            placeholder="Email"
          />
          <input
            onChange={this.handleInput("password")}
            value={password}
            type="password"
            id="register_password"
            placeholder="Password"
          />
          <input
            onChange={this.handleInput("repeatPassword")}
            value={repeatPassword}
            type="password"
            id="register_confirmation"
            placeholder="Repeat password "
          />
          <button
            type="submit"
            id="register"
            onClick={this.handleClickRegister}
          >
            Register
          </button>
        </form>
        <button onClick={() => $(this.rootElement).hide()} className="cancel">
          CANCEL
        </button>
      </div>
    );
  }
}

export default ModalReg;
