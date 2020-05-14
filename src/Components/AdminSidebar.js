import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


export default class AdminSidebar extends Component {

	constructor(props){
		super();
	}
	

	render(){
    return (
	                <ul className="nav" id="side-menu">
	                    <li>
	                        <NavLink to="/Restaurants" activeClassName="active"><i className="fa fa-home nav_icon"></i>Restaurant List</NavLink>
	                    </li>
	                    <li>
	                        <NavLink to="/AddRestaurant" activeClassName="active"><i className="fa fa-book nav_icon"></i>Add Restaurant</NavLink>
	                    </li>
	                </ul>
		);
	}
}