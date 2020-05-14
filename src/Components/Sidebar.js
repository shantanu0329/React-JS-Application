import React from 'react';
import {NavLink} from 'react-router-dom';


export default function Sidebar() {

	const app_id = localStorage.getItem('app_id');

    return (
	                <ul className="nav" id="side-menu">
	                    <li>
	                        <NavLink to={'/restaurant/' + app_id}  activeClassName="active"><i className="fa fa-home nav_icon"></i>Dashboard</NavLink>
	                    </li>
	                    <li>
	                        <NavLink to="/settings" activeClassName="active"><i className="fa fa-cogs nav_icon"></i>Settings</NavLink>
	                    </li>
	                    <li>
	                        <NavLink to="/orderHistory" activeClassName="active"><i className="fa fa-book nav_icon"></i>Order History</NavLink>
	                    </li>
	                    <li>
	                        <NavLink to="/Faq"><i className="fa fa-th-large nav_icon active"></i>FAQ</NavLink>
	                    </li>
	                </ul>
    	);
}