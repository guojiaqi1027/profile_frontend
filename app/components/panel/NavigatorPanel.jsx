import React from 'react'
import Cookies from 'js.cookie'
import $ from 'jquery'

var CONSTANTS = require('../../utils/constants');

class NavigatorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init = () => {
    this.state = {
      profile: null
    };
    if (Cookies.get('token')) {
      this.getProfile();
    }
  }

  getProfile = () => {
    var self = this;
    $.ajax(CONSTANTS.GET_PROFILE_URL, {
      method: 'POST',
      xhrFields: { withCredentials: true },
      success: function (res) {
        if (res.success == 0) {
          alert(res.msg);
          return;
        }
        var profile = res.profile;
        self.setState({
          profile: profile
        });
      },
      error: false
    });
  }

  onLogoutClick = (event) => {
     this.setState({
      profile: null
    });
    Cookies.remove('token');
    window.location.replace('/');
    return;
  }

  onLogoClick = () => {
    window.location.replace('/');
  }

  renderUserControl = () => {
    if (this.state.profile) {
      return (
        <div className="pa-user-control">
          <div className="pa-user-control-username"> { this.state.profile.name }</div>
          <button className="pa-btn pa-btn-transparent-white" onClick={ this.onLogoutClick }> Log out </button>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
    <div className="pa-navbar-wrapper">
      <div className="pa-navbar">
        <div className="pa-navbar-logo" onClick={ this.onLogoClick }>ProfileWebapp</div>
          { this.renderUserControl() }
        </div>
    </div>
    )
  }
}

export default NavigatorPanel;