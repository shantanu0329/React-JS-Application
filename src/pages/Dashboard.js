import React, { Component } from 'react';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import Loader from '../Components/loader';
import { URL } from '../Services/constants';
import { image_url } from '../Services/constants';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    let app_id = this.props.match.params.id;
    this.state = {
      app_id: app_id,
      dhaba: [],
      device_type: 'web',
      device_token: localStorage.getItem('fcmToken'),
      errors: false,
      msg: "",
      spinner: false
    }
  }


  async componentDidMount() {
    // console.log(this.props.restaurantDetail.restaurant_details);
    this.setState({ spinner: true });
    let mobile_token = localStorage.getItem('mobile_accessToken');
    if (!mobile_token) {
      let data = this.state;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)

      };
      try {
        const response = await fetch(URL + "/login", requestOptions);
        const result = await response.json();
        if (result.status === "Success") {
          
          // console.log(result.result[0]);
          localStorage.setItem('mobile_accessToken', result.result[0].accessToken);
          localStorage.setItem('app_id', this.state.app_id);
          localStorage.setItem('rest_name', result.result[0].name);
          localStorage.setItem('profile_pic', result.result[0].profile_pic);
          localStorage.setItem('service_charge', result.result[0].service_charge);


        }
      } catch (error) {
        alert(error);
      }
      // console.log(localStorage.getItem('mobile_accessToken'));
    }
    
    mobile_token = localStorage.getItem('mobile_accessToken');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + mobile_token },
      body: JSON.stringify({ page: 1 })

    };

    // console.warn(requestOptions);

    fetch(URL + "/orderList", requestOptions)
      .then(res => res.json())
      .then(
        (response) => {
          // console.log(response);
          if (response.status === "Success") {
            let numRows = response.new_orders.length;
            localStorage.setItem('new_order_count', numRows);
            // console.log(numRows);
            this.setState({
              spinner: false,
              dhaba: [response.new_orders]
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

  showOrder(order_id) {
    this.props.history.push('/orderDetail/' + order_id);
  }

  render() {
    const showLoader = this.state.spinner;
    // console.log(this.state.dhaba[0]);
    const todos = this.state.dhaba[0];
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
              <h3 className="title1">New Orders</h3>

              <div className="table-responsive bs-example widget-shadow">
                <table className="table table-bordered">
                  <tbody>
                    {
                      todos ?
                        todos.map((rest, i) =>
                          <tr key={i} id={rest.order_id}>
                            <td><img
                              src={image_url + '/' + (rest.order_type === 'delivery' ? "on_its_way_black_icon.png" : "order_black_icon.png")}
                              height="50px"
                              width="50px"
                              alt={rest.order_type}
                            />
                            </td>
                            <td>
                              {rest.customer_address}
                              <br />
                              {rest.customer_address_2}
                              <br />
                              {rest.customer_closing_address}
                            </td>
                            <td>&pound;{rest.amount}</td>
                            <td>
                              Order Number
                          <br />
                              {rest.order_id}
                            </td>
                            <td>
                              <button onClick={() => this.showOrder(rest.order_id)} className="btn btn-danger">
                                View Order
                          </button>
                            </td>
                          </tr>
                        ) : <tr><td colSpan="6">No record found.</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { restaurantDetail: state.AppReducer };
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);