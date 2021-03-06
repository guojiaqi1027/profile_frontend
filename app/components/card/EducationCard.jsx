import React from 'react';
import $ from 'jquery';
import FormConfirmPanel from 'components/panel/common/FormConfirmPanel';
var CONSTANTS = require('utils/constants');

class EducationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      education: {
        start_t: props.education.start_t,
        end_t: props.education.end_t,
        school: props.education.school,
        major: props.education.major,
        degree: props.education.degree,
        education_id: props.education.education_id,
        uid: props.education.uid,
      },
      editState: 0
    };
  }
  editState = {
    0: 'view',
    1: 'edit'
  };

  old_education = {};

  doDelete = () => {
    var self = this;
    $.ajax(CONSTANTS.DELETE_EDUCATION_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      data: {
        'education_id': this.state.education.education_id
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
    var education = {
      start_t: this.state.education.start_t,
      end_t: this.state.education.end_t,
      school: this.state.education.school,
      major: this.state.education.major,
      degree: this.state.education.degree,
      education_id: this.state.education.education_id,
      uid: this.state.education.uid
    };

    $.ajax(CONSTANTS.UPDATE_EDUCATION_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      data: {
        'education_id': this.state.education.education_id,
        'education': JSON.stringify(education)
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
    });
  };

  onEditClick = () => {
    this.old_education = Object.assign({}, this.state.education);
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
      education: this.old_education,
      editState: 0
    });
  };
  renderEducationCard = () => {
    var self = this;
    var time;
    var school;
    var desc;
    if (self.state.editState == 0) {
      school = self.state.education.school;
      time = self.state.education.start_t + " - " + self.state.education.end_t;
      desc = self.state.education.major + " , " + self.state.education.degree;
    }
    else {
      school = <input className="pa-input" name="school" value={ self.state.education.school } class="pa-input"></input>;
      time = (
        <div>
          <input className="pa-input" name="start_t" value={ self.state.education.start_t } class="pa-input"></input> - 
          <input className="pa-input" name="end_t" value={ self.state.education.end_t } class="pa-input"></input>
        </div>
      );
      desc = (
        <div>
          <input className="pa-input" name="major" value={ self.state.education.major } class="pa-input"></input> , 
          <input className="pa-input" name="degree" value={ self.state.education.degree } class="pa-input"></input>
        </div>);
    }
    return (
      <div>
        <div className="education-card-title">{ school }</div>
        <div className="education-card-sub-title">{ time }</div>
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
        { this.renderEducationCard() }
        { this.renderConfirmControl() }
        {}
      </div>
    );
  };
};

export default EducationCard;