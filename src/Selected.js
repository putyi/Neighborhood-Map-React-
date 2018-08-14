import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const API = 'https://api.foursquare.com/v2/venues/';
const ENDOFAPIPHOTOS = '/photos?&client_id=P0PILRG0UQJV5ARRV3BGQDUEQJ1GORQE2EX0OQ54WH3KN2M2&client_secret=4LISVBZWWF4BFAC5FCI3GRQOM5L0JOHYQKU5PK0R0GSGQYLH&v=20180809';

class Selected extends Component {
    static propTypes = {
          chosenRestaurant: PropTypes.object.isRequired,
          updateQuery: PropTypes.func.isRequired,
          resetChosen: PropTypes.func.isRequired
      }

      state = {
        venuePhotos: [],
        venueAddress: []
      }

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

      async componentDidMount() {
          fetch(API+this.props.chosenRestaurant.id+ENDOFAPIPHOTOS)
          .then(res => {
            return res.json();
          })
          .then(data=> {
            this.setState({ venuePhotos: data});
                      }
                )
      }

      getNestedObject = (nestedObj, pathArr) => {
        return pathArr.reduce((obj, key) =>
            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
      }

      render() {
        const photoPrefix = this.getNestedObject(this.state.venuePhotos, ['response', 'photos', 'items', 0, 'prefix']);
        const photoSuffix = this.getNestedObject(this.state.venuePhotos, ['response', 'photos', 'items', 0, 'suffix']);
        const categories = this.getNestedObject(this.props.chosenRestaurant, ['categories', 0, 'name']);
        const country = this.getNestedObject(this.props.chosenRestaurant, ['location', 'country']);
        const address = this.getNestedObject(this.props.chosenRestaurant, ['location', 'address']);
        console.log(this.props.chosenRestaurant)
        console.log(this.state.venuePhotos)
        console.log(categories)
        console.log(photoPrefix)
        console.log(photoSuffix)


        return (
          <div className="selected">
            <div className="selectedHeader">
              <Link to="/" className="backLink" onClick={(e) => {e.stopPropagation(); this.props.updateQuery(''); this.props.resetChosen()}}></Link>
              <h2>
                {this.props.chosenRestaurant.name}
              </h2>
            </div>  
              <figure>
                <img src={`${photoPrefix}400x600${photoSuffix}`} alt={`Snapshot is not available at Foursquare database about ${this.props.chosenRestaurant.name}`}/>
                <figcaption>Picture from Foursquare about {this.props.chosenRestaurant.name}</figcaption>
              </figure>

              <div className="side">
                <h4>Categories:</h4>
                <p>{ categories }</p>
                <h5>Country:</h5>
                <p>{ country }</p>
                <h6>Address(if available):</h6>
                <p>{ address }</p>
              </div>  
          </div>
            )
    }
  }

      export default Selected