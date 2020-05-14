import React, { Component } from 'react';

class Notification extends Component {

    render() {
        const new_order_count = localStorage.getItem('new_order_count');

        return (
            <ul className="nofitications-dropdown">

                <li className="dropdown head-dpdn">
                    <a href="# " className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-bell"></i><span className="badge blue">{new_order_count}</span></a>
                    <ul className="dropdown-menu">
                        <li>
                            <div className="notification_header">
                                <a href="# ">
                                    <h3>You have {new_order_count} pending Orders</h3>
                                </a>
                            </div>
                        </li>

                    </ul>
                </li>

            </ul>
        );
    }
}


export default Notification;