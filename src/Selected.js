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
        venuePhotos: []
      }

//getting extra info (if available)
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

//required for "unzip" the complex path in fetched objects
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

        return (
          <div className="selected">
            <div className="selectedHeader">
              <Link to="/" className="backLink" ariaCurrent="page" onClick={(e) => {e.stopPropagation(); this.props.updateQuery(''); this.props.resetChosen()}}></Link>
              <h2 tabindex="0">
                {this.props.chosenRestaurant.name}
              </h2>

              <figure tabIndex="0">
                <img src={`${photoPrefix}400x600${photoSuffix}`} alt={`Snapshot is not available at Foursquare database about ${this.props.chosenRestaurant.name}`}/>
                <figcaption>Picture from Foursquare about {this.props.chosenRestaurant.name}</figcaption>
              </figure>

              </div>

              <div className="side">
                <h4 tabIndex="0">Categories:</h4>
                <p tabIndex="0">{ categories }</p>
                <h5 tabIndex="0">Country:</h5>
                <p tabIndex="0">{ country }</p>
                <h6 tabIndex="0">Address(if available):</h6>
                <p tabIndex="0">{ address }</p>
              </div>
          </div>
            )
    }
  }

      export default Selected