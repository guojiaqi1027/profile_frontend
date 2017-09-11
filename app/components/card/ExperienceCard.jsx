import React from 'react';
import $ from 'jquery';
import FormConfirmPanel from 'components/panel/common/FormConfirmPanel';
var CONSTANTS = require('utils/constants');

class ExperienceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: {
        start_t: props.experience.start_t,
        end_t: props.experience.end_t,
        company: props.experience.company,
        title: props.experience.title,
        desc: props.experience.desc,
        experience_id: props.experience.experience_id,
        uid: props.experience.uid,
      },
      editState: 0
    };
  }
  editState = {
    0: 'view',
    1: 'edit'
  };

  old_experience = {};

  doDelete = () => {
    var self = this;
    $.ajax(CONSTANTS.DELETE_EXPERIENCE_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      data: {
        'experience_id': this.state.experience.experience_id
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

  doUpdate = () => {
    var self = this;
    var experience = {
      start_t: this.state.experience.start_t,
      end_t: this.state.experience.end_t,
      company: this.state.experience.company,
      title: this.state.experience.title,
      desc: this.state.experience.desc,
      experience_id: this.state.experience.experience_id,
      uid: this.state.experience.uid,
    };

    $.ajax(CONSTANTS.UPDATE_EXPERIENCE_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      data: {
        'experience_id': this.state.experience.experience_id,
        'experience': JSON.stringify(experience)
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
    });
  };

  onEditClick = () => {
    this.old_experience = Object.assign({}, this.state.experience);
    this.setState({
      editState: 1
    })
  };

  onSubmitUpdate = () => {
    this.doUpdate();
  };

  onDeleteClick = () => {
    this.doDelete();
  };

  onCancelUpdate = () => {
    this.setState({
      experience: this.old_experience,
      editState: 0
    });
  };
  renderExperienceCard = () => {
    var self = this;
    var time;
    var company;
    var title;
    var desc;
    if (self.state.editState == 0) {
      company = self.state.experience.company;
      time = self.state.experience.start_t + " - " + self.state.experience.end_t;
      title = self.state.experience.title;
      desc = self.state.experience.desc;
    }
    else {
      company = <input className="pa-input" name="company" value={ self.state.experience.company } class="pa-input"></input>;
      time = (
        <div>
          <input className="pa-input" name="start_t" value={ self.state.experience.start_t } class="pa-input"></input> - 
          <input className="pa-input" name="end_t" value={ self.state.experience.end_t } class="pa-input"></input>
        </div>
      );
      title = (
        <div>
          <input className="pa-input" name="title" value={ self.state.experience.title } class="pa-input"></input>
        </div>
      );
      desc = (
        <div>
          <textarea className="pa-text-area text-area-sm" name="desc" onChange={ this.onPropertyChange } value={ this.state.experience.desc }></textarea>
        </div>
      );
    }
    return (
      <div>
        <div className="education-card-title">{ company }</div>
        <div className="education-card-sub-title">{ time }</div>
        <div className="education-card-sub-title">{ title }</div>
        <div className="education-card-desc">{ desc }</div>
      </div>
    );
  };

  renderControls = () => {
    var buttons;
    if (this.state.editState == 0) {
      buttons = (
        <div className="education-card-controls">
          <button className="pa-btn pa-btn-transparent-black" onClick={ this.onEditClick }>Edit</button>
          <button className="pa-btn pa-btn-transparent-black" onClick={ this.onDeleteClick }>Delete</button>
        </div>
      );
    }
    else buttons = null;
    return buttons;
  };

  renderConfirmControl = () => {
    if (this.state.editState != 1) {
      return null;
    }
    else return (
      <div className="education-card-confirm">
        <FormConfirmPanel submit={this.onSubmitUpdate} cancel={this.onCancelUpdate} />
      </div>
    );
  };

  render() {
    return (
      <div className="education-card">
        { this.renderControls() }
        { this.renderExperienceCard() }
        { this.renderConfirmControl() }
        {}
      </div>
    );
  };
};

export default ExperienceCard;