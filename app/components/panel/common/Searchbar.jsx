import React from 'react'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null
    };
  }

  onKeyChange = (event) => {
    this.setState({
      key: event.target.value
    });
  }

  onSearchClick = (event) => {
    var key = this.state.key;
    key = key.replace(/\s+/g, "+");
    window.location.replace("/search?keys=" + key);
  }

  render () {
    return (
      <div className="pa-navbar-searchbar">
        <input onChange={ this.onKeyChange } name="key" className="pa-input pa-navbar-searchbar-input"></input>
        <div className="pa-navbar-searchbar-btnwrapper">
          <button className="pa-btn pa-btn-grey pa-btn-noneborder" onClick={ this.onSearchClick }>Search</button>
        </div>
      </div>
    );
  }
};

export default SearchBar;