import React, { Component } from 'react';
import './App.css';
  
class MapContainer extends Component {
    makeMarkerIcon = (markerColor) => {
        let markerImage = new window.google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new window.google.maps.Size(21, 34),
          new window.google.maps.Point(0, 0),
          new window.google.maps.Point(10, 34),
          new window.google.maps.Size(21,34));
        return markerImage;
      }

    render() {
    let markers = []
    this.props.markers.map((marker) => {
      marker.setMap(null)
      this.props.places.map((place) => {
        if(place.name == marker.title){
          marker.setMap(this.props.map)
        }
      })
    })

    this.props.markers.map((marker) => {
      if (marker.title==this.props.selectedPlace.name) {
        let content =`
          <div className='infowindow' tabIndex='0'>
            <h3>name: ${this.props.selectedPlace.name}</h3>
            <p>address: ${this.props.selectedPlace.location.address ? this.props.selectedPlace.location.address:'not found'}</p>
            <p>category: ${this.props.selectedPlace.categories[0].name}</p>
          </div>
          `
        this.props.infowindow.open(this.props.map,marker)
        this.props.infowindow.setContent(content)
        marker.setIcon(this.makeMarkerIcon('0091ff'))
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
      }else{
        marker.setIcon(this.makeMarkerIcon('FFFF24'))
        marker.setAnimation(null)
      }
    })

    return (
        <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">Alexandria</h1>
            </div>
          </div>
          <div className='row' id='map' role='map'>
          </div>
        </div>  
      );
    }
}

export default MapContainer