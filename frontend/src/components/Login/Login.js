import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../assets/css/login.css';
import axiosInstance from '../../utils/axiosInstance.js';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      password: '',
      username: '',
      newEmail: '',
      newPassword: '',
      newUsername: '',
      usertype: '',
      errorMessage: '',
      logintype: '',
    };
  }

  componentDidMount() {
    if (this.props.location.pathname === '/login') {
      this.container.current.classList.remove('right-panel-active');
    } else {
      this.container.current.classList.add('right-panel-active');
    }
  }

  onClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'signIn') {
      this.container.current.classList.remove('right-panel-active');
    } else {
      this.container.current.classList.add('right-panel-active');
    }
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

    axiosInstance()
      .post('/local/signup', data)
      .then((res) => {
        if (res.status === 200) {
          const logindata = {
            username: this.state.newUsername,
            password: this.state.newPassword,
          };
          axiosInstance()
            .post('/local/login', logindata)
            .then((response) => {
              if (response.status === 200 && response.data.dataAvailable) {
                localStorage.setItem('userName', response.data.data.username);
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('userType', response.data.data.type);
                setTimeout(() => {
                  this.setState({ logintype: response.data.data.type });
                }, 1000);
              } else {
                alert(response.data.message);
              }
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        }
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
    axiosInstance()
      .post('/local/login', data)
      .then((res) => {
        if (res.status === 200 && res.data.dataAvailable) {
          localStorage.setItem('userName', res.data.data.username);
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('userType', res.data.data.type);
          setTimeout(() => {
            this.setState({ logintype: res.data.data.type });
          }, 1000);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
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
    let redirectvar = '';

    if (this.state.logintype === 'user') {
      redirectvar = <Redirect to="/user/wallet" />;
    } else if (this.state.logintype === 'client') {
      redirectvar = <Redirect to="/client/requests" />;
    } else if (this.state.logintype === 'verifier') {
      redirectvar = <Redirect to="/verifier/requests" />;
    }

    return (
      <div className="register">
        {redirectvar}
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
                  <i class="fab fa-facebook-f" />
                </a>
                <a href="http://localhost:5000/google/login" class="social">
                  <i class="fab fa-google-plus-g" />
                </a>
                <a href="/" class="social">
                  <i class="fab fa-linkedin-in" />
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
              <button type="submit">Sign Up</button>
              <p>
                Already have an account?{' '}
                <span
                  aria-hidden="true"
                  class="custom-link"
                  onClick={this.onClick}
                  name="signIn"
                >
                  Login here!
                </span>
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
                  <i class="fab fa-facebook-f" />
                </a>
                <a href="/" class="social">
                  <i class="fab fa-google-plus-g" />
                </a>
                <a href="/" class="social">
                  <i class="fab fa-linkedin-in" />
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

              <button type="submit">Sign In</button>
              <p>
                New User?{' '}
                <span
                  aria-hidden="true"
                  class="custom-link"
                  onClick={this.onClick}
                >
                  Sign up here!
                </span>
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
                  type="button"
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
                  type="button"
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
