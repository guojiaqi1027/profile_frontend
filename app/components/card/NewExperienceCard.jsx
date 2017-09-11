import React from 'react';
import $ from 'jquery';
import FormConfirmPanel from 'components/panel/common/FormConfirmPanel';

var CONSTANTS = require('utils/constants');

class NewExperienceCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      experience: {
        company: null,
        start_t: null,
        end_t: null,
        title: null,
        desc: null
      }
    };
  };

  doAdd = () => {
    var self = this;

    $.ajax(CONSTANTS.ADD_EXPERIENCE_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      data: {
        experience: JSON.stringify(self.state.experience)
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
    var experience = this.state.experience;
    experience[event.target.name] = event.target.value;
    this.setState({
      experience: experience
    })
  };

  onSubmitClick = (event) => {
    this.doAdd();
  };

  renderExperience = () => {
    var company = (
      <div className="pa-input-group-table">
        <div className="pa-input-item pa-input-item-table-cell"><div>Company:</div><input className="pa-input" name="company" onChange={this.onPropertyChange}></input></div>
        <div className="pa-input-item pa-input-item-table-cell"><div>Title:</div><input className="pa-input" name="title" onChange={this.onPropertyChange}></input></div>
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
        <div className="pa-input-item"><div>Description:</div><textarea className="pa-text-area text-area-sm" name="desc" onChange={ this.onPropertyChange } value={ this.state.experience.desc }></textarea></div>
      </div>
    );
    return (
      <div className="pa-input-group">
        { company }
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
        { this.renderExperience() }
        { this.renderControls() }
      </div>
    );
  }
};

export default NewExperienceCard;