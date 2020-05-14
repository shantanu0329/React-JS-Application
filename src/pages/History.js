import React, { Component } from 'react';
import Header from '../Components/Header';
import { withRouter } from 'react-router-dom';
import Loader from '../Components/loader';
import { URL } from '../Services/constants';
import { image_url } from '../Services/constants';
import Calendars from '../Components/Calendars';

class History extends Component{

  state = {
    history:[],
    errors: false,
    msg: "",
    page: 1,
    ids: [],
    spinner: false
  }

  componentDidMount(){
    this.setState({ spinner: true });
    const mobile_token = localStorage.getItem('mobile_accessToken');
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization':"Bearer "+mobile_token },
      body: JSON.stringify({page: 1,filter_by_date:'year'})

    };
    // console.warn(requestOptions);

    fetch(URL + "/orderHistory", requestOptions)
      .then(res => res.json())
      .then(
        (response) => {
          // console.log(response);
          if (response.status === "Success") {
            // console.warn(response.order_history);

            this.setState({
              spinner: false,
              history: [response.order_history]
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

  showOrder(order_id){
    this.props.history.push('/orderDetail/'+order_id);
  }

  handleClick = (e) => {
    // console.log(e.target.value,e.target.name);
    let id = e.target.value;
    let ids = this.state.ids;
    if(ids.indexOf(id) !== -1){
      while (ids.indexOf(id) !== -1) {
        ids.splice(ids.indexOf(id), 1);
      }
      console.log(ids);
      // alert("Value exists!");
    } else{
      ids.push(id);
      this.setState({ids:ids});
      console.log(ids);
    }
  }

  filterBYDate(type){
    let order_ids =[];
    if(type==="single"){
      order_ids = this.state.ids;
    }
    if(type==="days"){
      order_ids = this.state.ids;
    }
    if(type==="month"){
      order_ids = this.state.ids;
    }
    if(type==="year"){
      order_ids = this.state.ids;
    }
    // console.log(this.state.ids);
    
    let accessToken = 'Bearer ' + localStorage.getItem('mobile_accessToken');
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
			body: JSON.stringify({order_id:order_ids,page:this.state.page})

		};

    fetch(URL + "/orderHistoryDelete", requestOptions)
      .then(res => res.json())
      .then(
        (response) => {
          // console.log(response);
          if (response.status === "Success") {
            // console.warn(response.order_history);

            this.setState({
              spinner: false,
              history: [response.order_history]
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
  
  deleteSelected(type){
    let order_ids =[];
    if(type==="single"){
      order_ids = this.state.ids;
    }
    else{
      order_ids = this.state.ids;
    }
    // console.log(this.state.ids);
    order_ids = JSON.stringify(order_ids);
    let accessToken = 'Bearer ' + localStorage.getItem('mobile_accessToken');
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
			body: JSON.stringify({order_id:order_ids,page:this.state.page,order_type:type})

		};
    console.log(order_ids);
    console.log(requestOptions);

    fetch(URL + "/orderHistoryDelete", requestOptions)
      .then(res => res.json())
      .then(
        (response) => {
          // console.log(response);
          if (response.status === "Success") {
            // console.warn(response.order_history);

            this.setState({
              spinner: false,
              history: [response.order_history]
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

  render(){
    const showLoader = this.state.spinner;
    const todos = this.state.history[0];
    let divStyle = {
    color:"red"
    };
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
            <h3 className="title1 txt-center">Order History</h3>
            
            <div className="table-responsive bs-example widget-shadow">
              <div className="row">
              {/* <a href="# "><span className="col-md-offset-1 error-message"><strong >Delete</strong> </span></a> */}
              <a href="# "><span className="col-md-offset-1 error-message"><strong onClick={this.deleteSelected('single')}>Delete</strong> </span></a>
                <span className="pull-left"><button className="btn btn-danger">Delete All</button> </span>
                {/* <span className="col-md-offset-1" style={{border: "2px solid grey",padding:"15px 20px 15px 20px"}}><Calendars /><i className="fa fa-file-text-o"></i></span> */}
                <span className="col-md-offset-1"><strong>7 Days</strong> </span>
                <span className="col-md-offset-1"><strong>1 Month</strong> </span>
                <span className="col-md-offset-1"><strong>1 Year</strong> </span>
                <span className="col-md-offset-1" style={divStyle} ><Calendars /></span>

              </div>
              <div className="clearfix"></div><hr/>
              <table className="table table-bordered">
                  <tbody>
                  {
                  todos ?
                  todos.map((rest,i) =>
                  
                  <tr key={i} id={rest.order_id}>
                    <td>
                      <input id={rest.order_id} type="checkbox" defaultValue={rest.order_id} name="selected" onClick={this.handleClick} />
                    </td>
                    <td><img
                          src={image_url+'/'+(rest.order_type==='delivery'?"on_its_way_black_icon.png":"order_black_icon.png")}
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
                        <button onClick={()=>this.showOrder(rest.order_id)} className="btn btn-default">
                          View Order
                        </button>
                      </td>
                  </tr>
                  ): <tr><td colSpan="6">No record found.</td></tr>
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

export default withRouter(History);