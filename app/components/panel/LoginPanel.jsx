import React from 'react'

class LoginPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onUsernameChange = props.onUsernameChange;
    this.onPasswordChange = props.onPasswordChange;
    this.submit = props.submit;
    this.signup = props.signup;
  }
  render() {
        return (
        <div className="login-panel-content">
          <div className="pa-input-group">
            <div className="pa-input-item">
                <div>Username:</div>
                <input className="pa-input" name='username' onChange={ this.onUsernameChange }/>
            </div>
            <div className="pa-input-item">
                <div>Password:</div>
                <input className="pa-input" name='password' type="password" onChange={ this.onPasswordChange }/>
            </div>
          </div>
          <button className="pa-btn pa-btn-transparent-black pa-btn-block pa-btn-lg" onClick={ this.submit }>Login</button>
          <button className="pa-btn pa-btn-transparent-black pa-btn-block pa-btn-lg" onClick={ this.signup }>Register</button>
        </div>
        )
  }
}

export default LoginPanel;