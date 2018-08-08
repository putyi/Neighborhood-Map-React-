import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class MapContainer extends Component {

  static propTypes = {
    restaurants: PropTypes.array.isRequired,
    filteredRestaurants: PropTypes.array.isRequired,
    selectRestaurant: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired
}

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  /*componentDidUpdate() {
    if(this.state.filteredRestaurants.length===[]){
      this.setState((state) => ({
        filteredRestaurants: state.filteredRestaurants=this.props.restaurants
    }))
    }
  }*/

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
   
  console.log(this.props.filteredRestaurants)

   return(
    <div className="mapContainer">
      <div>
        <h1>Restaurants in Harghita county</h1>
          <input
            type="text"
            placeholder="Search by restaurant name"
            value={this.props.query}
            onChange={(event) => this.props.updateQuery(event.target.value)}
          />
          <div className="list">
            {this.props.filteredRestaurants.map(restaurant => {return <div key={restaurant.id}>{restaurant.name}</div>})}
          </div>
      </div>
    <Map google={this.props.google} zoom={9.5} initialCenter={{ lat: 46.36091, lng: 25.79985 }}
    onClick = { this.onMapClick }>
    { this.props.filteredRestaurants.map((restaurant, index) => {return(
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
      visible = { this.state.showingInfoWindow }>
      
        <div>
        <h2>{ this.state.activeMarker.title }</h2>
        <p> { this.state.activeMarker.title } </p>
      </div>
      
      </InfoWindow>

</Map>
</div>
   ) 
   
 }
}

export default GoogleApiWrapper({
 apiKey: ('AIzaSyAeaZtQBOxtNuDB3Oaq6L9_CyqiM7ppwdo')
})(MapContainer)

