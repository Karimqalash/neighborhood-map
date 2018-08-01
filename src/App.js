import React, { Component } from 'react';
import './App.css';
import Nav from './Nav'
import Filter from './Filter'
import Container from './Maps'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  componentDidMount(state) {
    let places = []
    //fetching data from foursquare api and checking if they're more than 5 elements then pushing to the new places array 
    this.state.places.map((place) => {
      fetch(`https://api.foursquare.com/v2/venues/search?ll=${place.location.labeledLatLngs[0].lat},${place.location.labeledLatLngs[0].lng}&radius=3000&client_id=YCMVB1QECGNRHPHJVNVPWSWAB4QYCUWEDDF3CPIPDZ3HGRZK&client_secret=LHJL25FEU0LFRI4TXAY0OEK4FBCXSCFJXJVYROAZMZ2VD44J&v=20171227&limit=1`)
    .then(response => response.json()).then((res) => {
      places.push(res.response.venues[0])
      if (places.length >= 5) {
      this.setState({places: places})
      }
    }).catch((error) => {
      console.log(error)
      places.push(place)
      if (places.length >= 5) {
        this.setState({places: places})}}
      )})
  }

	state = {
      places: [
      	{name: 'Alban Swesra',location: {address: '',labeledLatLngs:[{lat: 31.214252, lng: 29.922655}]},categories: [{name: 'restaurant'}]},
      	{name: 'Bibliotheca Alexandrina',location: {address: '',labeledLatLngs:[{lat: 31.20856707665388, lng: 29.90886224371427}]},categories: [{name: 'library'}]},
      	{name: 'Faculty of Engineering',location: {address: '',labeledLatLngs:[{lat: 31.207627, lng: 29.924028}]},categories: [{name: 'university'}]},
     	  {name: 'Alexandria Stadium',location: {address: '',labeledLatLngs:[{lat: 31.197368, lng: 29.913245}]},categories: [{name: 'Stadium'}]},
      	{name: 'Mirage Mall',location: {address: '',labeledLatLngs:[{lat: 31.173145, lng: 29.932568}]},categories: [{name: 'entartainment'}]}
      ],
      markers:[],
      filteredPlaces: [],		
    	showingInfoWindow: false,
    	activeMarker: {},
    	selectedPlace: {},
    	query: ''
  	};

  onMarkerClick = (props, marker, e) => 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: {}
      })
    }
  };

  onItemClick = (place) => {
    this.setState({selectedPlace: place,
      showingInfoWindow: false})
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  render() {
    //taking all the places then filter it with the input
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      this.state.filteredPlaces = this.state.places.filter((contact) => match.test(contact.name))
    } else {
      this.state.filteredPlaces = this.state.places
    }

    return (
    	<div>
        <Nav />
        <Filter onItemClick={this.onItemClick} selectedPlace={this.state.selectedPlace} places={this.state.filteredPlaces} updateQuery={this.updateQuery}/>
        <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">Alexandria</h1>
            </div>
          </div>
          <div className='row map' role='map'>
            <Container onLoad={this.onLoad} places={this.state.filteredPlaces} showingInfoWindow={this.state.showingInfoWindow} activeMarker={this.state.activeMarker} selectedPlace={this.state.selectedPlace} onMapClicked={this.onMapClicked} onMarkerClick={this.onMarkerClick} />
          </div>
        </div>  
      </div>
    );
  }
}

export default App;
