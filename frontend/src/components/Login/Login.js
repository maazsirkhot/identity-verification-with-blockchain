import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/login.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  state = {
    email: "",
    password: "",
    newEmail: "",
    newPassword: "",
    fullname: "",
    errorMessage: "",
    isLogin: false,
    toProfile: false,
  };
  componentDidMount() {
    this.props.location.pathname === "/login"
      ? this.container.current.classList.remove("right-panel-active")
      : this.container.current.classList.add("right-panel-active");
  }

  onClick = (event) => {
    event.preventDefault();
    event.target.name === "signIn"
      ? this.container.current.classList.remove("right-panel-active")
      : this.container.current.classList.add("right-panel-active");
    this.setState({ errorMessage: "" });
  };
  signUp = (event) => {
    event.preventDefault();
  };

  signIn = (event) => {
    event.preventDefault();
  };

  updateValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="register">
        <div
          class="registercontainer "
          id="registercontainer"
          ref={this.container}
        >
          <div class="form-container sign-up-container">
            <form onSubmit={this.signUp}>
              <h2>Create Account</h2>
              <div class="social-container">
                <a href="/" class="social">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="/" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="/" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <div style={{ color: "red" }}>{this.state.errorMessage}</div>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={this.updateValue}
                required
              />

              <input
                type="email"
                placeholder="Email"
                name="newEmail"
                onChange={this.updateValue}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="newPassword"
                onChange={this.updateValue}
                required
              />
              <select name="usertype" required>
                <option selected disabled value="">
                  Account Type
                </option>
                <option value="user">User</option>
                <option value="issuer">Issuer</option>
                <option value="verifier">Verifier</option>
              </select>
              <button>Sign Up</button>
              <p>
                Already have an account?{" "}
                <Link class="custom-link" onClick={this.onClick} name="signIn">
                  Login here!
                </Link>
              </p>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form onSubmit={this.signIn}>
              <h2>Sign in</h2>
              <div class="social-container">
                <a href="/" class="social">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="/" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="/" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <div style={{ color: "red" }}>{this.state.errorMessage}</div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.updateValue}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.updateValue}
              />

              <button>Sign In</button>
              <p>
                New User?{" "}
                <Link class="custom-link" onClick={this.onClick}>
                  Sign up here!
                </Link>
              </p>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  class="ghost"
                  id="signIn"
                  name="signIn"
                  onClick={this.onClick}
                >
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start the journey with us</p>
                <button
                  class="ghost"
                  id="signUp"
                  name="signUp"
                  onClick={this.onClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
