import React,{Component} from 'react';
import Sidebar from './Sidebar';
import Notification from './Notification';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    logout(){
        this.setState({ spinner: true });
        localStorage.removeItem('mobile_accessToken');

        localStorage.clear();
        this.props.history.push('/logout');
    }

    render(){
        const pic = localStorage.getItem('profile_pic');
        const name = localStorage.getItem('rest_name');
            return (
                <div className="main-content">
                    <div className="sidebar" role="navigation">
                        <div className="navbar-collapse">
                            <nav className="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
                                <Sidebar />
                                
                                <div className="clearfix"> </div>
                            </nav>
                        </div>
                    </div>

                    <div className="sticky-header header-section ">
                        <div className="header-left">
                            <button id="showLeftPush"><i className="fa fa-bars"></i></button>
                            <div className="logo">
                            <a href="# ">
                                    <h1>Ordering Direct App</h1>
                                    <span>Control Panel</span>
                                </a>
                            </div>

                            <div className="clearfix"> </div>
                        </div>
                       
                        <div className="header-right">
                        
                            <div className="profile_details_left">
                                <Notification/>
                                <div className="clearfix"> </div>
                            </div>
                            <div className="profile_details">
                                <ul>
                                    <li className="dropdown profile_details_drop">
                                    <a href={'restaurant/'+localStorage.getItem('app_id')} className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                            <div className="profile_img">
                                                <span className="prfil-img"><img src={pic} width="50px" height="50px" alt="" /> </span>
                                                <div className="user-name">
                                                    <p>{name}</p>
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

export default withRouter(Header);