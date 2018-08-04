import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import ReactGoogleMapLoader from "react-google-maps-loader"
//import ReactGoogleMap from "react-google-map"
import GoogleMapReact from 'google-map-react'
import PropTypes from 'prop-types'

//trying out if props work

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

const Marker = props => {
  return <div className="SuperAwesomePin"></div>
}

class Map extends Component {
    static propTypes = {
      restaurants: PropTypes.array.isRequired,
    }

    


render() {
    console.log(this.props.restaurants);
    return (
      <div className='google-map' style={{ height: '100vh', width: '80%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAeaZtQBOxtNuDB3Oaq6L9_CyqiM7ppwdo' }}
        defaultCenter={{ lat: 46.3499985, lng: 25.7999992 }}
        defaultZoom={ 13 }>
        {this.props.restaurants.map(restaurant => { return 
        <AnyReactComponent 
          lat={restaurant.location.lat} 
          lng={restaurant.location.lng} 
          text={ "A tokom mar kivan" }
        />})}
        
      </GoogleMapReact>
    </div>
     
     
    );
  }
}

export default Map