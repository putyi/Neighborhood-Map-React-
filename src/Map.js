import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'


export class MapContainer extends Component {

  static propTypes = {
    restaurants: PropTypes.array.isRequired,
    forSelectMarker: PropTypes.array.isRequired,
    filteredRestaurants: PropTypes.array.isRequired,
    updateQuery: PropTypes.func.isRequired,
    updateMarker: PropTypes.func.isRequired,
    clearMarker: PropTypes.func.isRequired
}

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }


  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
      });
    }
  }


 render() {
  let forMarker
  const { forSelectMarker }=this.props
    if(forSelectMarker.length===0){
      forMarker=this.props.filteredRestaurants;
    } else {
      forMarker=forSelectMarker;
    } 


   return(
    <div className="mapContainer">
      <div>
        <h1>Restaurants in Harghita county available at Foursquare</h1>
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
              <p onMouseEnter={(e) => {e.stopPropagation(); this.props.updateMarker(restaurant)}} 
              onMouseLeave={(e) => {e.stopPropagation(); this.props.clearMarker()}}
              >{restaurant.name}</p>
              </Link>})}
        </div>
      </div>
    <div className="map">  
    <Map google={this.props.google} zoom={9.5} initialCenter={{ lat: 46.36091, lng: 25.79985 }}
    onClick = { this.onMapClick }
      >
    { forMarker.map((restaurant, index) => {return(
      <Marker
      onClick = { this.onMarkerClick }
      key = { index }
      title = { restaurant.name }
      position = { restaurant.location }
      name = { restaurant.name }
  />
   )})}
      
      <InfoWindow onClose={this.onInfoWindowClose}
      marker = { this.state.activeMarker }
      visible = { this.state.showingInfoWindow }
      >
        <div>
          <h2>{ this.state.activeMarker.title }</h2>
          <p>Click restaurant's name on the list for details</p>
        </div>
      </InfoWindow>

</Map>
</div>
</div>
   )
 }
}

export default GoogleApiWrapper({
 apiKey: ('AIzaSyAeaZtQBOxtNuDB3Oaq6L9_CyqiM7ppwdo')
})(MapContainer)

