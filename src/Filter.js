import React, { Component } from 'react';
import './App.css';


class Filter extends Component {
  render() {
    return (
        <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
          <form role="filter">
            <div className="form-group">
        			<input className="form-control" id="myInput" type="text" placeholder="Filter.." aria-labelledby="filter places" onChange={(event) => this.props.updateQuery(event.target.value)}/>
        		</div>
          </form>
        	<ul className="nav menu" id="myList">
            {this.props.places.map((place) => (
              <li key={place.name} role='button' tabIndex='0' className={this.props.selectedPlace.name==place.name ? 'active' : ''} onClick={(event) => this.props.onItemClick(place)}>{place.name}</li>
            ))}
        	</ul>  
	     	</div>
      );
  }
}

export default Filter;
