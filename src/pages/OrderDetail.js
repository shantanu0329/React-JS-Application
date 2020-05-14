import React, { Component } from 'react';
import Header from '../Components/Header';
import Loader from '../Components/loader';
import OrderImages from '../Components/OrderImages';
import { URL } from '../Services/constants';
import { image_url } from '../Services/constants';
// import data from './static/OrderInfo.json';

class OrderDetail extends Component {

    constructor(props) {
        super(props);
        let order_number = this.props.match.params.id;
        this.state = {
            order_number: order_number,
            detail: [],
            errors: false,
            msg: "",
            spinner: true
        }
    }

    componentWillUnmount(){
        this.setState({
            spinner: false
        });
    }
    componentDidMount() {
        // console.log(this.props.restaurantDetail.restaurant_details);
        // this.setState({ spinner: true });
        const mobile_token = localStorage.getItem('mobile_accessToken');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + mobile_token },
            body: JSON.stringify({ order_id: this.state.order_number })

        };
        // console.warn(requestOptions);

        fetch(URL + "/orderDetail", requestOptions)
            .then(res => res.json())
            .then(
                (response) => {

                    if (response.status === "Success") {
                        this.setState({
                            spinner: false,
                            detail: response.order_details[0]
                        });
                    }
                },

                (error) => {
                    console.log(error);
                    this.setState({
                        spinner: false,
                    });
                }
            )

    }

    lateOrder(late_minutes){
        alert('Order time exceeded by '+late_minutes);
    }

    render() {
        const showLoader = this.state.spinner;
        const info = this.state.detail;
        // console.log(info.payment_type);
        
        // const delivery_method = info.order_type;

        return (
            <div>
                {showLoader ?
                    <Loader />
                    : ""
                }
                <Header />
                <div id="page-wrapper">
                    <div className="main-page">
                        <div className="tables">

                            <div className="table-responsive bs-example widget-shadow">

                                <table className="table table-bordered">

                                    <tbody>
                                        <tr className="img-center">
                                            <td><img src={image_url+'/'+(info.order_type==='delivery'?"on_its_way_black_icon.png":"order_black_icon.png")} height="50px" width="50px" alt="" /><br /> Order No: {info.order_id}</td>
                                            <td>Order Time<br />{info.order_time}</td>
                                            <td>{(info.order_type==='delivery'?"Delivered":"Collected")} By<br />{info.order_delivery_time}</td>
                                            <td>{(info.order_type==='delivery'?"Delivery":"Collection")}</td>
                                            <td><button className="btn btn-primary">Reprint Order</button></td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div className="col-md-12 compose-left">
                                    <div className="folder widget-shadow">
                                        <ul>
                                            <li><a href="/"><i className="fa fa-file-text-o"></i>{info.customer_name}</a></li>
                                            <li><a href="/"><i className="fa fa-phone"></i>{info.customer_mobile}</a></li>
                                            <li><a href="/"><i className="fa fa fa-envelope-o"></i>{info.customer_email}</a></li>
                                            <div style={{display: info.order_type==='delivery' ? 'block' : 'none' }}>
                                                <li ><a href="/"><i className="fa fa fa-flag-o"></i>{info.customer_address}</a></li>
                                                <li><a href="/">{info.customer_address_2}</a></li>
                                                <li><a href="/">{info.customer_closing_address}</a></li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-md-4 compose-right widget-shadow">
                                    <div className="panel-default">
                                        <OrderImages order_type={info.order_type} order_status={info.order_status} />
                                    </div>
                                </div>
                                <div className="clearfix"> </div>

                                <div className="col-md-8 compose-left quantity-tbl" style={{ width: "50%", paddingTop: "inherit" }}>
                                    <div className="folder widget-shadow add-scroll">
                                        <ul>
                                            <li className="head">Order</li>

                                        </ul>
                                        <table className="table table-bordered">

                                            <tbody className="ex3">
                                                {
                                                    info.items ?
                                                    info.items.map((rest, i) =>
                                                            <tr key={i}>
                                                                <td>{rest.item_name}</td>
                                                                <td>{rest.quantity}</td>
                                                                <td>&pound;{rest.amount}</td>
                                                                <td><b>{rest.quantity * rest.amount}</b></td>
                                                            </tr>
                                                        ) : <tr><td colSpan="4" className="panel-body">No record found.</td></tr>
                                                }
                                            </tbody>
                                        </table>
                                        <table className="table table-bordered" style={{ marginTop: "-21px" }}>

                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p className="pull-left"><strong>Total</strong> </p>
                                                        <p className="pull-right"><b>{info.total_amount}</b> </p>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-4 compose-left" style={{ marginLeft: "1%", paddingTop: "inherit", minWidth: "49%" }}>
                                    <div className="folder widget-shadow">
                                        <ul>
                                            <li className="head">Order Notes<span className="pull-right">{(info.payment_type==='cash'?"CASH":"PAID")}</span></li>
                                            <li><a href="/"><i className="fa fa-file-text-o"></i>{info.order_notes}</a> </li>
                                        </ul>
                                        <table className="table table-bordered">

                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p className="pull-left"><strong>SubTotal</strong> </p>
                                                        <p className="pull-right"><b>{info.total_amount}</b> </p>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="pull-left"><strong>Service Charge</strong> </p>
                                                        <p className="pull-right"><b>{localStorage.getItem('service_charge')}</b> </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="pull-left"><strong>Delivery Charge</strong> </p>
                                                        <p className="pull-right"><b>{info.delivery_charges}</b> </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="pull-left"><strong>Discount</strong> </p>
                                                        <p className="pull-right"><b>{info.discount_amount}</b> </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h3 className="pull-left error-message"><strong>Total</strong> </h3>
                                                        <h3 className="pull-right error-message"><b>{info.total_amount_after_discount}</b> </h3>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="clearfix"> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="gridSystemModal" tabIndex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title txt-center" id="gridSystemModalLabel">Late Order</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="row-info">
                                        <div className="col-md-2 col-md-offset-1">
                                            <button className="btn btn-default" onClick={() => this.lateOrder(5)}>
                                                +5 mins
												</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-default" onClick={() => this.lateOrder(10)}>
                                                +10 mins
												</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-default" onClick={() => this.lateOrder(15)}>
                                                +15 mins
												</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-default" onClick={() => this.lateOrder(20)}>
                                                +20 mins
												</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-default" onClick={() => this.lateOrder(30)}>
                                                +30 mins
												</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-md-offset-3"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-9 col-md-offset-1">
                                            <div className="row">
                                                <div className="col-xs-2">
                                                    <button className="btn btn-default" onClick={() => this.lateOrder(45)}>
                                                        +45 mins
														</button>
                                                </div>
                                                <div className="col-xs-2 col-md-offset-1">
                                                    <button className="btn btn-default" onClick={() => this.lateOrder(60)}>
                                                        +60 mins
														</button>
                                                </div>
                                                <div className="col-xs-2 col-md-offset-1">
                                                    <button className="btn btn-default" onClick={() => this.lateOrder(90)}>
                                                        +90 mins
														</button>
                                                </div>
                                                <div className="col-xs-2 col-md-offset-1">
                                                    <button className="btn btn-default" onClick={() => this.lateOrder(120)}>
                                                        +120 mins
														</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer txt-center">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" >Cancel Order</button>
                                    <button type="button" className="btn btn-info" data-dismiss="modal" >Move to Order History</button>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetail;