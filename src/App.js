import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MapContainer from './MapContainer'
import Selected from './Selected'
import './App.css'


//implementing foursquare info, async call from API, setting initial state

var foursquare = require('react-foursquare')({
  clientID: 'P0PILRG0UQJV5ARRV3BGQDUEQJ1GORQE2EX0OQ54WH3KN2M2',
  clientSecret: '4LISVBZWWF4BFAC5FCI3GRQOM5L0JOHYQKU5PK0R0GSGQYLH'  
});

var params = {
  "ll": "46.3696,25.7954",
  "query": 'csarda restaurant'
};

class App extends Component {

  constructor(props) {
     super(props);
     this.state = {
       restaurants: [],
       filteredRestaurants: [],
       chosenRestaurant: {},
       forSelectMarker: [],
       query: ''
     };
   }

  //sets the default state
  async componentDidMount() {
      await foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ restaurants: res.response.venues });
        this.setState({ filteredRestaurants: this.state.restaurants.sort(sortBy('name')) })
      });
  }

  //functions changing the states accessible from children components
  pickedRestaurant=(restaurant) => {
    this.setState((state) => ({
      chosenRestaurant: restaurant
  }))
  }

  updateListAndMarkers=(string) => {
    //clearing up a bot the query string - trim for erasing white spaces before and after
    const query = string.trim()
    this.setState((state) => ({
      query: state.query=query
  }))


      let showingListAndMarkers;
      if (query) {
        //if there is a certain query match it with regExp and then filter restaurants setting state
          const match = new RegExp(escapeRegExp(query), 'i')
          showingListAndMarkers = this.state.restaurants.filter((restaurant) => match.test(restaurant.name))
      } else {
        // if there is no query
          showingListAndMarkers = this.state.restaurants
      }

      //sort venues in alphabetical order
      showingListAndMarkers.sort(sortBy('name'))

      this.setState((state) => ({
        filteredRestaurants: state.filteredRestaurants=showingListAndMarkers
  }))
}


  render() {

    //console.log(this.state.restaurants);
    //console.log(this.state.forSelectMarker);
    return (
      //setting up the route for links in children components
      <div className="app">
      <Route exact path="/" render={() => (
          <MapContainer restaurants={this.state.restaurants}
          filteredRestaurants={this.state.filteredRestaurants}
          forSelectMarker={this.state.forSelectMarker}
          updateQuery={(string) => {
                  this.updateListAndMarkers(string)
                }}
          selectRestaurant={(restaurant) => {
                  this.pickedRestaurant(restaurant)
          }}
        />
      )}/>
      <Route path="/selected" render={({ history }) => (
            <Selected chosenRestaurant={this.state.chosenRestaurant}
            updateQuery={(string) => {
                  this.updateListAndMarkers(string)
                  history.push('/')
                }}
            resetChosen={() => {
                  this.resetForMarker()
                  history.push('/')
            }}
        />
          )}/>
        </div>
  )
  }
}

export default App