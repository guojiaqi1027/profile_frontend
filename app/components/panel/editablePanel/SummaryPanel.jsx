import React from 'react';
import $ from 'jquery';
import FormConfirmPanel from 'components/panel/common/FormConfirmPanel';
import AlertPanel from 'components/panel/common/AlertPanel';
var CONSTANTS = require('utils/constants');
class SummaryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      panelState: 0
    };
    this.init();
    this.old_summary = "";
    this.panelStates = {
      0: 'Initialing',
      1: 'View',
      2: 'Edit'
    }
  };


  
  init = () => {
    var self = this;
    $.ajax(CONSTANTS.GET_SUMMARY_URL, {
      xhrFields: { withCredentials: true },
      method: 'POST',
      success: function (res) {
        if (res.success == 0) {
          alert(res.msg);
          return;
        }
        else {
          self.setState({
            summary: res.summary,
            panelState: 1
          });
        }
      }
    });
  };

  onPropertyChange = (event) => {
    this.setState({
      summary: event.target.value
    });
  };

  onEditClick = () => {
    this.old_summary = this.state.summary;
    this.setState({
      panelState: 2
    });
  };

  onSubmitUpdate = () => {
    var self = this;
    $.ajax(CONSTANTS.UPDATE_SUMMARY_URL, {
      data: {
        summary: self.state.summary
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
      summary: this.old_summary,
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

  renderUserSummary = () => {
    var view;
    if (this.state.panelState == 1) {
      view = <p>{ this.state.summary }</p>
    }
    else {
      view = <textarea className="pa-text-area text-area-sm" onChange={ this.onPropertyChange } value={ this.state.summary }></textarea>
    }
    return (
      <div className="pa-editable-panel-body">
        { view }
      </div>
    );
  };

  renderPanelHead = () => {
    var button = this.state.panelState == 1 ? (<button className="pa-btn pa-btn-transparent-white pa-panel-edit-button" onClick={ this.onEditClick }>Edit</button>) : null;
    return (
      <div className="pa-panel-head">
        <h4>Summary</h4>
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
        { this.renderAlertPanel() }
        { this.renderPanelHead() }
        { this.renderUserSummary() }
        { this.renderConfirmControl() }
      </div>
    );
  }
}

export default SummaryPanel;
