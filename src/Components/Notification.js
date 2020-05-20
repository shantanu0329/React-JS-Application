import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Notification extends Component {

    render() {
        let pending_order_count = localStorage.getItem('pending_order_count');

        return (
            <ul className="nofitications-dropdown">

                <li className="dropdown head-dpdn">
                    <a href="# " className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-bell"></i><span className="badge blue">{pending_order_count}</span></a>
                    <ul className="dropdown-menu">
                        <li>
                            <div className="notification_header">
                                <NavLink to="/pendingOrders">
                                    <h3>You have {pending_order_count} pending Orders</h3>
                                </NavLink>
                            </div>
                        </li>

                    </ul>
                </li>

            </ul>
        );
    }
}


export default Notification;