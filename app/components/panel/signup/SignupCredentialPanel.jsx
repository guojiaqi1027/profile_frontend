import React from 'react'

class SignupCredentialPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = props.onChange;
  }
  render() {
    return (
      <div>
        <div className="pa-input-group">
          <div className="pa-input-item">
            <div>Username:</div><input className="pa-input" name='username' onChange={ this.onChange }/>
          </div>
          <div className="pa-input-item">
            <div>Password:</div><input className="pa-input" type='password' name='password' onChange={ this.onChange }/>
          </div>
          <div className="pa-input-item">
            <div>Password Confirm:</div><input className="pa-input" type='password' name='re_password' onChange={ this.onChange }/>
          </div>
        </div>
      </div>
    )
  }
}
export default SignupCredentialPanel;