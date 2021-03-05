import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/css/login.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  state = {
    email: '',
    password: '',
    username: '',
    newEmail: '',
    newPassword: '',
    newUsername: '',
    usertype: '',
    errorMessage: '',
    isLogin: false,
    toProfile: false,
  };
  componentDidMount() {
    this.props.location.pathname === '/login'
      ? this.container.current.classList.remove('right-panel-active')
      : this.container.current.classList.add('right-panel-active');
  }

  onClick = (event) => {
    event.preventDefault();
    event.target.name === 'signIn'
      ? this.container.current.classList.remove('right-panel-active')
      : this.container.current.classList.add('right-panel-active');
    this.setState({ errorMessage: '' });
  };
  signUp = (event) => {
    event.preventDefault();
    const data = {
      username: this.state.newUsername,
      email: this.state.newEmail,
      password: this.state.newPassword,
      type: this.state.usertype,
    };
    console.log(data);
    axios
      .post('/local/signup', data)
      .then((res) => {
        console.log('In here', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  signIn = (event) => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post('/local/login', data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
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
                <a href="http://localhost:5000/google/login" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="/" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
              <input
                type="text"
                placeholder="Username"
                name="newUsername"
                onChange={this.updateValue}
                onKeyDown={this.handleKeyDown}
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
              <select name="usertype" onChange={this.updateValue} required>
                <option selected disabled value="">
                  Account Type
                </option>
                <option value="user">User</option>
                <option value="client">Client</option>
                <option value="verifier">Verifier</option>
              </select>
              <button>Sign Up</button>
              <p>
                Already have an account?{' '}
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
                <a
                  href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fgoogle%2Flogin%2Fcallback&scope=profile%20email&client_id=503681152360-midha3uj2vl06en9sgrp6pokre4u30m2.apps.googleusercontent.com"
                  class="social"
                >
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
              <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.updateValue}
                onKeyDown={this.handleKeyDown}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.updateValue}
                required
              />

              <button>Sign In</button>
              <p>
                New User?{' '}
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
