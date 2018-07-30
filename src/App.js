import React, { Component } from 'react';
import './App.css';
import Nav from './Nav'
import Filter from './Filter'
import Container from './Maps'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
	state = {
      	places: [
      		{name: 'Alban Swesra',position:{lat: 31.214252, lng: 29.922655}},
      		{name: 'Bibliotheca Alexandrina', position: {lat: 31.209013, lng: 29.909823}},
      		{name: 'Faculty of Engineering',position:{lat: 31.207627, lng: 29.924028}},
     		  {name: 'Alexandria Stadium',position:{lat: 31.197368, lng: 29.913245}},
      		{name: 'Mirage Mall',position:{lat: 31.173145, lng: 29.932568}}
      	],		
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
      activeMarker:null,
      showingInfoWindow: false})
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  render() {
  	let showingPlaces
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingPlaces = this.state.places.filter((contact) => match.test(contact.name))
    } else {
      showingPlaces = this.state.places
    }

    return (
    	<div>
        <Nav />
        <Filter onItemClick={this.onItemClick} selectedPlace={this.state.selectedPlace} places={showingPlaces} updateQuery={this.updateQuery}/>
        <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">Alexandria</h1>
            </div>
          </div>
          <div className='row map'>
            <Container places={showingPlaces} showingInfoWindow={this.state.showingInfoWindow} activeMarker={this.state.activeMarker} selectedPlace={this.state.selectedPlace} onMapClicked={this.onMapClicked} onMarkerClick={this.onMarkerClick} />
          </div>
        </div>  
      </div>
    );
  }
}

export default App;
