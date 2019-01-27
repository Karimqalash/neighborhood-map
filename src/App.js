import React, { Component } from 'react';
import './App.css';
import Nav from './Nav'
import Filter from './Filter'
import MapContainer from './Maps'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  componentDidMount() {
      let here = this
      let markers = []
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 31.2166025, lng: 29.9233916},
        zoom: 12,
      });
      map.addListener('click',here.onMapClicked)
      this.setState({map: map})
      let infowindow = new window.google.maps.InfoWindow();
      this.setState({infowindow: infowindow})
    let places = []
    //fetching data from foursquare api and checking if they're more than 5 elements then pushing to the new places array 
    this.state.places.map((place) => {
      fetch(`https://api.foursquare.com/v2/venues/search?ll=${place.location.labeledLatLngs[0].lat},${place.location.labeledLatLngs[0].lng}&radius=3000&client_id=YCMVB1QECGNRHPHJVNVPWSWAB4QYCUWEDDF3CPIPDZ3HGRZK&client_secret=LHJL25FEU0LFRI4TXAY0OEK4FBCXSCFJXJVYROAZMZ2VD44J&v=20171227&limit=1`)
    .then(response => response.json()).then((res) => {
      places.push(res.response.venues[0])
      
      let marker = new window.google.maps.Marker({
          position: {lat:res.response.venues[0].location.labeledLatLngs[0].lat, lng: res.response.venues[0].location.labeledLatLngs[0].lng},
          map: map,
          animation: window.google.maps.Animation.DROP,
          title: res.response.venues[0].name,
        });
        marker.addListener('click', (par1) => here.onMarkerClick(res.response.venues[0]))
        marker.addListener('mouseover',() => marker.setAnimation(window.google.maps.Animation.BOUNCE))
        marker.addListener('mouseout',() => marker.setAnimation(null))
        markers.push(marker)

      if (places.length >= 5) {
      this.setState({places: places , markers:markers})
      }
    }).catch((error) => {
      place.name='error on fetching data'
      places.push(place)
      if (places.length >= 5) {
        this.setState({places: places})}}
      )})

      window.gm_authFailure = () => {
        alert('google maps error')
      }
  }

	state = {
      places: [
      	{name: 'Alban Swesra',location: {address: '',labeledLatLngs:[{lat: 31.214252, lng: 29.922655}]},categories: [{name: ''}]},
      	{name: 'Bibliotheca Alexandrina',location: {address: '',labeledLatLngs:[{lat: 31.20856707665388, lng: 29.90886224371427}]},categories: [{name: ''}]},
      	{name: 'Faculty of Engineering',location: {address: '',labeledLatLngs:[{lat: 31.207627, lng: 29.924028}]},categories: [{name: ''}]},
     	  {name: 'Alexandria Stadium',location: {address: '',labeledLatLngs:[{lat: 31.197368, lng: 29.913245}]},categories: [{name: ''}]},
      	{name: 'Mirage Mall',location: {address: '',labeledLatLngs:[{lat: 31.173145, lng: 29.932568}]},categories: [{name: ''}]}
      ],
      map: {},
      markers:[],
      filteredPlaces: [],		
    	selectedPlace: {},
    	query: ''
  	};

  onMarkerClick = (place) => 
    this.setState({
      selectedPlace: place,
      showingInfoWindow: true
  });

  onMapClicked = (props) => {
      this.setState({
        selectedPlace: {}
      })
      this.state.infowindow.close()
  };

  onItemClick = (place) => {
    this.setState({selectedPlace: place})
  }

  onItemFocus = (place) => {
    this.state.markers.filter(marker => marker.title == place.name).map(marker => marker.setAnimation(window.google.maps.Animation.BOUNCE))
  }

  onItemBlur = (place) => {
    this.state.markers.filter(marker => marker.title == place.name).map(marker => marker.setAnimation(null))
  }

  updateQuery = (query) => {
    this.state.infowindow.close()
    this.setState({ query: query , selectedPlace:{}})
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
        <Filter onItemClick={this.onItemClick} onItemFocus={this.onItemFocus} onItemBlur={this.onItemBlur} selectedPlace={this.state.selectedPlace} places={this.state.filteredPlaces} updateQuery={this.updateQuery}/>
        <MapContainer infowindow={this.state.infowindow} markers={this.state.markers} map={this.state.map} places={this.state.filteredPlaces} selectedPlace={this.state.selectedPlace} onMapClicked={this.onMapClicked} onMarkerClick={this.onMarkerClick} />
      </div>
    );
  }
}

export default App;
