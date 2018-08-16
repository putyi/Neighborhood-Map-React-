import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MapItself from './Map'


class MapContainer extends Component {

  static propTypes = {
    filteredRestaurants: PropTypes.array.isRequired
}

  constructor(props) {
    super(props);
    this.state = {
      forSelectMarker: [],
    }
}

//functions setting current components state
updateMarker=(restaurant) => {
  this.setState((state) => ({
    forSelectMarker: [restaurant]
}))
}

clearMarker=() => {
  this.setState((state) => ({
    forSelectMarker: []
}))
}


 render() {
//rendering the list and query, Links to selected venue and importing the MapItself component

   return(
  <div className="mapComponent">
        <h1 tabIndex="0">Restaurants in Harghita county available at Foursquare</h1>
      <div className="rightSide">
        <div className="list">
          <div>
          <input
            type="text"
            placeholder="Search by restaurant name"
            value={this.props.query}
            onChange={(event) => this.props.updateQuery(event.target.value)}
          />
          </div>
          {this.props.filteredRestaurants.map(restaurant =>
            {return <Link to="/selected" onClick={(e) => {e.stopPropagation(); this.props.selectRestaurant(restaurant)}} className="onClickSearch" key={restaurant.id}>
              <p onMouseEnter={(e) => {e.stopPropagation(); this.updateMarker(restaurant)}} 
              onMouseLeave={(e) => {e.stopPropagation(); this.clearMarker()}}
              >{restaurant.name}</p>
              </Link>})}
        </div>
      </div>

      <MapItself
        forSelectMarker={this.state.forSelectMarker}
        filteredRestaurants={this.props.filteredRestaurants}
      >
      </MapItself>
  </div>
   )
}
}

export default MapContainer