import React from 'react'

class SignupProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = props.onChange;
  }

  render() {
    return (
      <div className="pa-input-group">
        <div className="pa-input-item">
          <div>name:</div><input className="pa-input" name="name" onChange={ this.onChange }/>
        </div>
        <div className="pa-input-item">
          <div>title:</div><input className="pa-input" name="title" onChange={ this.onChange }/>
        </div>
        <div className="pa-input-item">
          <div>company:</div><input className="pa-input" name="company" onChange={ this.onChange }/>
        </div>
        <div className="pa-input-item">
          <div>address:</div><input className="pa-input" name="address" onChange={ this.onChange }/>
        </div>
        <div className="pa-input-item">
          <div>birth:</div><input className="pa-input" name="birth" onChange={ this.onChange }/>
        </div>
        <div className="pa-input-item">
          <div>email:</div><input className="pa-input" name="email" onChange={ this.onChange }/>
        </div>
        <div className="pa-input-item">
          <div>phone:</div><input className="pa-input" name="phone" onChange={ this.onChange }/>
        </div>
      </div>
    )
  }
}

export default SignupProfilePanel;