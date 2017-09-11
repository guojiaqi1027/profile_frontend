import React from 'react';

class FormConfirmPanel extends React.Component {
  constructor(props) {
    super(props);
    this.submit = props.submit;
    this.cancel = props.cancel;
  }
  render () {
    return (
      <div>
        <button className="pa-btn pa-btn-black pa-btn-block pa-btn-lg" onClick= {this.submit} >Submit</button>
        <button className="pa-btn pa-btn-transparent-black pa-btn-block pa-btn-lg" onClick={this.cancel}>Cancel</button>
      </div>
    )
  };
}
export default FormConfirmPanel;