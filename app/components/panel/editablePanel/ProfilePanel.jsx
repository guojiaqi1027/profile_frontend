import React from 'react';
import $ from 'jquery';
import Cookies from 'js.cookie';
import FormConfirmPanel from 'components/panel/common/FormConfirmPanel';
import AlertPanel from 'components/panel/common/AlertPanel';
var CONSTANTS = require('utils/constants');
class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      panelState: 0
    };
    this.old_profile = {};
    this.panelStates = {
      0: 'Initialing',
      1: 'View',
      2: 'Edit'
    };
    this.init();
  };

  init = () => {
    var self = this;
    $.ajax(CONSTANTS.GET_PROFILE_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      success: function (res) {
        if (res.success == 0) {
          alert(res.msg);
          return;
        }
        else {
          self.setState({
            profile: res.profile,
            panelState: 1
          });
        }
      }
    });
  };

  onPropertyChange = (event) => {
    var profile = this.state.profile;
    profile[event.target.name] = event.target.value;
    var state = this.state;
    this.setState({
      profile: profile,
      panelState: state.panelState
    });
  };

  onEditClick = () => {
    this.old_profile = Object.assign({}, this.state.profile);
    this.setState({
      panelState: 2
    });
  };

  onSubmitUpdate = () => {
    var self = this;
    $.ajax(CONSTANTS.UPDATE_PROFILE_URL, {
      data: {
        profile: JSON.stringify(self.state.profile)
      },
      xhrFields: { withCredentials: true },
      method: 'POST',
      success: function (res) {
        if (res.success == 0 ){
          alert(res.msg);
          return;
        }
        window.location.reload();
      }
    });
  };

  onCancelUpdate = () => {
    this.setState({
      profile: this.old_profile,
      panelState: 1
    });
  };

  renderInitializing = () => {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  };
  renderUserProfile = () => {
    var self = this;
    var name;
    var title;
    var phone;
    var address;
    if (self.state.panelState == 1) {
      name = self.state.profile.name;
      title = self.state.profile.title;
      phone = self.state.profile.phone;
      address = self.state.profile.address;
    }
    else {
      name = <input className="pa-input" name="name" value={ self.state.profile.name } onChange={ self.onPropertyChange }></input>;
      title = <input className="pa-input" name="title" value={ self.state.profile.title } onChange={ self.onPropertyChange }></input>;
      phone = <input className="pa-input" name="phone" value={ self.state.profile.phone } onChange={ self.onPropertyChange }></input>;
      address = <input className="pa-input" name="address" value={ self.state.profile.address } onChange={ self.onPropertyChange }></input>;
    }
    return (
      <div className="pa-editable-panel-body">
        <div className="pa-profile-panel-item font-xl font-bold">{ name }</div>
        <div className="pa-profile-panel-item font-md">{ title }</div>
        <div className="pa-profile-panel-item font-md">{ phone }</div>
        <div className="pa-profile-panel-item font-md">{ address }</div>
      </div>
    );
  };
  renderEditBtn = () => {
    var button = this.state.panelState == 1 ? (<button className="pa-btn pa-btn-transparent-black" onClick={ this.onEditClick }>Edit</button>) : null;
    return (
      <div className="pa-panel-body-control">
        { button }
      </div>
    );
  }
  renderPanelHead = () => {
    var button = this.state.panelState == 1 ? (<button className="pa-btn pa-btn-transparent-white pa-panel-edit-button" onClick={ this.onEditClick }>Edit</button>) : null;
    return (
      <div className="pa-panel-head">
        { button }
      </div>
    );
  };

  renderConfirmControl = () => {
    if (this.state.panelState != 2) {
      return null;
    }
    else return (
      <div className="pa-editable-panel-confirm">
        <FormConfirmPanel submit={this.onSubmitUpdate} cancel={this.onCancelUpdate} />
      </div>
    );
  };

  renderAlertPanel = () => {
    if (this.state.err_msg) {
      return (<AlertPanel msg={ this.state.error_msg } />);
    }
    else return null;
  };

  render() {
    if (this.state.panelState == 0) {
      return (
        <div>
          { this.renderInitializing() }
        </div>
      );
    }
    return (
      <div className="pa-editable-panel">
        { this.renderEditBtn() }
        { this.renderAlertPanel() }
        { this.renderUserProfile() }
        { this.renderConfirmControl() }
      </div>
    );
  }
};

export default ProfilePanel;