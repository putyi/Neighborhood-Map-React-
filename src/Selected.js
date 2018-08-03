import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//trying out if props work

class Selected extends Component {
    static propTypes = {
          restaurants: PropTypes.array.isRequired,
          //switchShelf: PropTypes.func.isRequired,
          //addBook: PropTypes.func.isRequired
      }

      render() {
        console.log(this.props.restaurants);
        return (
          <div className="">
            {this.props.restaurants.map(restaurant => {return <div key={restaurant.id}>{restaurant.name}</div>})}
          </div>
        );
      }
    }

      export default Selected