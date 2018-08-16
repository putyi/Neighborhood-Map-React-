import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

export class MapItself extends Component {

    static propTypes = {
        forSelectMarker: PropTypes.array.isRequired,
        filteredRestaurants: PropTypes.array.isRequired
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

//functions dealing with map events
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
    //synchronizing markers with the query and hovered venues from the list
        let forMarker
        const { forSelectMarker }=this.props
        if(forSelectMarker.length===0){
            forMarker=this.props.filteredRestaurants
        }else{
            forMarker=forSelectMarker
        }

        let style= {position: 'absolute',
                    width: '75vw',
                    height: '90vh'}


        return(

        <div className="mapContainer" style={ style } tabindex="0" role="application" aria-label="Map with restaurants">
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
     )
   }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAeaZtQBOxtNuDB3Oaq6L9_CyqiM7ppwdo')
   })(MapItself)

