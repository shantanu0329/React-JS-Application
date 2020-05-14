import React, { Component } from 'react';
import AdminSidebar from './AdminSidebar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { URL } from '../Services/constants';

class AdminHeader extends Component {

    constructor(props) {
        super(props);
        let loginCheck = localStorage.getItem('accessToken');
        if(!loginCheck){
            this.props.history.push("/");   
        }
        if (this.props.restaurantDetail.restaurant_details) {
            // console.log(this.props.restaurantDetail.restaurant_details);
            this.state = {
                data: this.props.restaurantDetail.restaurant_details.name
            }
        } else {
            this.state = {
                data: 'OrderingDirect',
                spinner: false,
                errors: false,
                msg: "",
            }
        }

        //console.warn(this.data);
    }

    logout() {
        this.setState({ spinner: true });
        let token = localStorage.getItem('admin_logout_token');
        const admin_accessToken = localStorage.getItem('accessToken');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + admin_accessToken },
            body: JSON.stringify({ token_id: token })

        };
       
        // console.log(requestOptions);
        fetch(URL + "/logout", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);

                    if (result.status === "Success") {
                        this.setState({
                            spinner: false,
                            errors: true,
                            msg: result.message
                        });
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('admin_logout_token');
                        localStorage.clear();
                        this.props.history.push("/");   
                    }
                    else {
                        this.setState({
                            spinner: false,
                            errors: true,
                            msg: result.message
                        });
                    }

                },

                (error) => {
                    console.log(error);
                    this.setState({
                        errors: true,
                        spinner: false,
                        msg: "Please enable CORS on your Browser to Login."
                    });
                }
            )    
    }

    render() {
        return (
            <div className="main-content">
                <div className="sidebar" role="navigation">
                    <div className="navbar-collapse">
                        <nav className="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
                            <AdminSidebar />

                            <div className="clearfix"> </div>
                        </nav>
                    </div>
                </div>

                <div className="sticky-header header-section ">
                    <div className="header-left">
                        <button id="showLeftPush"><i className="fa fa-bars"></i></button>
                        <div className="logo">
                            <a href="/Home">
                                <h1>Ordering Direct App</h1>
                                <span>Admin Panel</span>
                            </a>
                        </div>

                        <div className="clearfix"> </div>
                    </div>
                    <div className="header-right">
                        <div className="profile_details">
                            <ul>
                                <li className="dropdown profile_details_drop">
                                    <a href="/Home" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                        <div className="profile_img">
                                            <span className="prfil-img"><img src="../images/admin2.png" width="70px" height="50px" alt="" /> </span>
                                            <div className="user-name">
                                                <p></p>
                                                <span>Administrator</span>
                                                </div>
                                                <i className="fa fa-angle-down lnr"></i>
									            <i className="fa fa-angle-up lnr"></i>
                                                <div className="clearfix"></div>
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu drp-mnu">
                                            <li> <a href="# " onClick={()=>this.logout()}><i className="fa fa-sign-out"></i> Logout</a> </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="clearfix"> </div>
                    </div>
                    <div className="clearfix"> </div>
                </div>

            </div>

        );
    }

}


const mapStateToProps = (state) => {
    return { restaurantDetail: state.AppReducer };
};

export default withRouter(connect(
    mapStateToProps,
    null
)(AdminHeader));