import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';


export class MapContainer extends Component {
    makeMarkerIcon = (markerColor) => {
        var markerImage = new this.props.google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new this.props.google.maps.Size(21, 34),
          new this.props.google.maps.Point(0, 0),
          new this.props.google.maps.Point(10, 34),
          new this.props.google.maps.Size(21,34));
        return markerImage;
      }

    render() {
    return (
      <Map
      google={this.props.google}
      style = {{
        width: '100%',
        height: '100%'
      }}
      initialCenter= {{lat: 31.2166025, lng: 29.9233916}}
      zoom={12}
      onClick={this.props.onMapClicked}
      >
      {this.props.places.map((marker) => (
            <Marker
              key={marker.name}
              name={marker.name}
              address={marker.location.address}
              category={marker.categories[0].name}
              position={{lat:marker.location.labeledLatLngs[0].lat, lng: marker.location.labeledLatLngs[0].lng}}
              onClick={this.props.onMarkerClick}
              icon={this.props.selectedPlace.name==marker.name ? this.makeMarkerIcon('0091ff') : this.makeMarkerIcon('FFFF24')}
              />
          )
      )}
      <InfoWindow
        marker={this.props.activeMarker}
        visible={this.props.showingInfoWindow}
        onOpen={this.windowHasOpened}
        onClose={this.windowHasClosed}>
          <div className='infowindow' tabIndex='0'>
            <h3>name: {this.props.selectedPlace.name}</h3>
            <p>address: {this.props.selectedPlace.address ? this.props.selectedPlace.address:'not found'}</p>
            <p>category: {this.props.selectedPlace.category}</p>
          </div>
      </InfoWindow>      
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.AIzaSyBuUEMkyM9jmb5RuniixR7DjWfwXgxzfdM)
})(MapContainer)