import React, { Component } from 'react';
import './App.css';
	
class Nav extends Component {
  render() {
    return (
		<nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
			<div className="container-fluid">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span></button>
					<a className="navbar-brand"><span>Neighborhood</span>Map</a>
				</div>
			</div>
		</nav>
    );
  }
}

export default Nav;