import React, { Component } from "react";
import firebase from "firebase";
import $ from "jquery";

class ModalLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInput(field) {
    return event => {
      const newState = Object.assign({}, this.state); // clone state to newState
      newState[field] = event.target.value;
      this.setState(newState);
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    let errors = "";

    if (!email) errors += "Email обязателен.\n";
    if (!password) errors += "Пароль обязателен.\n";
    if (errors) return alert(errors);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ email: "", password: "" });
        this.props.loggedIn(user);
        $(this.rootElement).hide();
      })
      .catch(err => {
        alert(err.message);
        console.error(err.message);
      });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div ref={element => (this.rootElement = element)} id="modal-login">
        <form
          onSubmit={this.handleFormSubmit}
          name="login"
          action=""
          className="hideLoginForm"
        >
          <h3>Введите данные</h3>
          <input
            onChange={this.handleInput("email")}
            value={email}
            type="text"
            id="auth_login"
            placeholder="email"
          />
          <input
            onChange={this.handleInput("password")}
            value={password}
            type="password"
            id="auth_password"
            placeholder="password"
          />
          <button type="submit" id="auth">
            Auth
          </button>
        </form>
        <button onClick={() => $(this.rootElement).hide()} className="cancel">
          CANCEL
        </button>
      </div>
    );
  }
}

export default ModalLogin;
