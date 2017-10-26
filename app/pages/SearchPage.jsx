import React from 'react'
import UTILS from 'utils/utils'
import SearchList from 'components/list/SearchList'
var CONSTANTS = require('../utils/constants');
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      ret: [],
      keys: "",
      page: 1
    };
    this.init();
  }

  init = () => {
    var params = UTILS.getQueryFromUrl();
    var self = this;
    if (params) {
      self.state.keys = params['keys'];
      self.state.page = params['page'] || 1;
    }
    var settings = {
      url: CONSTANTS.SEARCH_URL,
      data: {
        keys: self.state.keys
      },
      method: 'GET',
      success: function (res) {
        var page_size = 20;
        self.setState({
          count: res['items'].length,
          ret: res['items'].slice(page_size * (self.state.page - 1), page_size * self.state.page)
        });
      },
      unsuccess: function (res) {
        alert(res.msg);
      },
      failure: function (res) {
      }
    }
    UTILS.ajax(settings);
  }

  convertKeys = () => {
    var keys = this.state.keys;
    return keys.replace(/\+/g, " ");
  }
  render() {
    return (
      <div className="pa-page-content">
        <div className="pa-editable-panel">
          <div className="pa-editable-panel-body">
            Results for { this.convertKeys() } : { this.state.count }
            <SearchList items={ this.state.ret } />
          </div>
        </div>
      </div>
    );
  }
}
export default SearchPage;