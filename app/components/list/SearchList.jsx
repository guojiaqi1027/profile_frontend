import React from 'react'
import SearchItemCard from 'components/card/SearchItemCard'
import $ from 'jquery'
class SearchList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderList = () => {
    var self = this;
    var list = [];
    $.each(this.props.items, function (index, value) {
      var card = <SearchItemCard item={ value } />;
      list.push(card);
    })
    return (
      <div>
        { list }
      </div>
    );
  };

  render () {
    return (
      <div className="pa-search-list">
        { this.renderList() }
      </div>
    );
  }
}
export default SearchList;