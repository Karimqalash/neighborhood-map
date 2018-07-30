import React, { Component } from 'react';
import './App.css';


class Filter extends Component {
  render() {
    return (
        <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
          <form role="search">
            <div className="form-group">
        			<input className="form-control" id="myInput" type="text" placeholder="Filter.." onChange={(event) => this.props.updateQuery(event.target.value)}/>
        		</div>
          </form>
        	<ul className="nav menu" id="myList">
            {this.props.places.map((place) => (
              <li key={place.name} role='button' tabIndex='0' className={this.props.selectedPlace.name==place.name ? 'active' : ''} onClick={this.props.onItemClick(place)}><a>{place.name}</a></li>
            ))}
        	</ul>  
	     	</div>
      );
  }
}

export default Filter;
