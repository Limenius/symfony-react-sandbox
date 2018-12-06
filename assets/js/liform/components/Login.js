import React from "react";
import { connect } from "react-redux";
import { login } from "../actions";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "",
      password: ""
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.dispatch(
      login(this.state.username, this.state.password, this.props.baseUrl)
    );
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { loginError } = this.props;
    return (
      <form onSubmit={this.submit}>
        <div>
          Try with
          <ul>
            <li>
              username: <strong>admin</strong>
            </li>
            <li>
              password: <strong>admin</strong>
            </li>
          </ul>
        </div>
        {loginError && (
          <div className="alert alert-danger" role="alert">
            Invalid username or password
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            value={this.state.username}
            onChange={this.setUsername}
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={this.state.password}
            onChange={this.setPassword}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-default" value="Submit" />
        </div>
      </form>
    );
  }
}

export default connect(state => ({
  baseUrl: state.recipesState.baseUrl,
  loginError: state.recipesState.loginError
}))(Login);
