import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import Map from './Map'
import Selected from './Selected'
import './App.css';

//implementing foursquare info, async call from API, setting initial state

var foursquare = require('react-foursquare')({
  clientID: 'P0PILRG0UQJV5ARRV3BGQDUEQJ1GORQE2EX0OQ54WH3KN2M2',
  clientSecret: '4LISVBZWWF4BFAC5FCI3GRQOM5L0JOHYQKU5PK0R0GSGQYLH'  
});

var params = {
  "ll": "46.3696,25.7954",
  "query": 'Restaurant'
};

class App extends Component {

  constructor(props) {
     super(props);
     this.state = {
       restaurants: []
     };
   }

  async componentDidMount() {    
      await foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ restaurants: res.response.venues });
      });
  }

  render() {
    console.log(this.state.restaurants);
    return (
      <div className="app">
      <Route exact path="/" render={() => (
          <Map restaurants={this.state.restaurants}
          ///////////////////////
        />
        )}/>
      <Route path="/selected" render={({ history }) => (
            <Selected restaurants={this.state.restaurants}
          ////////////////////////////////
        />
          )}/>
        </div>
  )
  }
}

export default App