import React from 'react';
import $ from 'jquery';
import FormConfirmPanel from 'components/panel/common/FormConfirmPanel';

var CONSTANTS = require('utils/constants');

class NewEducationCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      education: {
        school: null,
        start_t: null,
        end_t: null,
        major: null,
        degree: null
      }
    };
  };

  doAdd = () => {
    var self = this;

    $.ajax(CONSTANTS.ADD_EDUCATION_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      data: {
        education: JSON.stringify(self.state.education)
      },
      success: function (res) {
        if (res.success == 0) {
          alert(res.msg);
          return;
        }
        window.location.reload();
      }
    });
  };

  onPropertyChange = (event) => {
    var education = this.state.education;
    education[event.target.name] = event.target.value;
    this.setState({
      education: education
    })
  };

  onSubmitClick = (event) => {
    this.doAdd();
  };

  renderEducation = () => {
    var school = (
      <div className="pa-input-group-table">
        <div className="pa-input-item pa-input-item-table-cell"><div>School:</div><input className="pa-input" name="school" onChange={this.onPropertyChange}></input></div>
        <div className="pa-input-item pa-input-item-table-cell"></div>
      </div>
    );
    var time = (
      <div className="pa-input-group-table">
        <div className="pa-input-item pa-input-item-table-cell"><div>From:</div><input className="pa-input" name="start_t" onChange={this.onPropertyChange}></input></div>
        <div className="pa-input-item pa-input-item-table-cell"><div>To:</div><input className="pa-input" name="end_t" onChange={this.onPropertyChange}></input></div>
      </div>
    );
    var desc = (
      <div className="pa-input-group-table">
        <div className="pa-input-item pa-input-item-table-cell"><div>Major:</div><input className="pa-input" name="major" onChange={this.onPropertyChange}></input></div>
        <div className="pa-input-item pa-input-item-table-cell"><div>Degree:</div><input className="pa-input" name="degree" onChange={this.onPropertyChange}></input></div>
      </div>
    );
    return (
      <div className="pa-input-group">
        { school }
        { time }
        { desc }
      </div>
    );
  };

  renderControls = () => {
    return (
      <FormConfirmPanel submit={this.onSubmitClick} cancel={this.props.onCancelClick} />
    );
  };

  render() {
    return (
      <div className="education-card">
        { this.renderEducation() }
        { this.renderControls() }
      </div>
    );
  }
};

export default NewEducationCard;