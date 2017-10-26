import React from 'react'
class SearchItemCard extends React.Component {
  constructor (props) {
    super(props);
  }

  onClick = () => {

  }

  renderProfile = () => {
    return(
      <div className="pa-search-item">
        <div>
          { this.props.item.profile.name }
        </div>
        <div>
          <div>
            { this.props.item.profile.title }
          </div>
          <div>
            { this.props.item.profile.company }
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderProfile() }
      </div>
    );
  }
}
export default SearchItemCard;