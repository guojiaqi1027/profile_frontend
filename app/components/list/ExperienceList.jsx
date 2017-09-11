import React from 'react';
import $ from 'jquery';
import ExperienceCard from 'components/card/ExperienceCard';
import NewExperienceCard from 'components/card/NewExperienceCard';
var CONSTANTS = require('utils/constants');

class ExperienceList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      experienceList: [],
      listState: 0
    };
    this.init();
    this.listState = {
      0: 'view',
      1: 'Add'
    };
  };

  init = () => {
    var self = this;
    $.ajax(CONSTANTS.GET_EXPERIENCES_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      success: function (res) {
        if (res.success == 0) {
          alert(res.msg);
          return;
        }
        self.setState({
          experienceList: res.experiences
        });
      }
    });
  };

  onAddClick = () => {
    this.setState({
      listState: 1
    });
  };

  onCancelNewClick = () => {
    this.setState({
      listState: 0
    });
  };

  renderControls = () => {
    var button;
    if (this.state.listState == 0) {
      button = <button className="pa-btn pa-btn-transparent-white pa-panel-edit-button" onClick={ this.onAddClick }>Add</button>;
    }
    else {
      button = null;
    }
    return (
      <div className="pa-panel-head">
        <h4>experience</h4>
        { button }
      </div>
    );
  };

  renderList = () => {
    var self = this;
    var list = [];
    $.each(this.state.experienceList, function (index, value) {
      var card = <ExperienceCard experience={ value } />;
      list.push(card);
    })
    return (
      <div>
        { list }
      </div>
    );
  };

  renderNewExperience = () => {
    if (this.state.listState == 1) {
      return (
        <div>
          <NewExperienceCard onCancelClick={ this.onCancelNewClick } />
        </div>
      )
    }
    else {
      return null;
    }
  };

  render() {
    return (
      <div className="pa-editable-panel">
        { this.renderControls() }
        { this.renderNewExperience() }
        { this.renderList() }
      </div>
    );
  };
};

export default ExperienceList;