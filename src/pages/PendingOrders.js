import React, { Component } from 'react';
import Header from '../Components/Header';
import { withRouter } from 'react-router-dom';
import Loader from '../Components/loader';
import { URL } from '../Services/constants';
import { image_url } from '../Services/constants';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Toasters from '../Components/Toasters';

class PendingOrders extends Component{

  state = {
    history:[],
    errors: false,
    toast: false,
    msg: "",
    t_msg: "",
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

    fetch(URL + "/pendingOrderList", requestOptions)
      .then(res => res.json())
      .then(
        (response) => {
          // console.log(response);
          if (response.status === "Success") {
            // console.warn(response.order_history);

            this.setState({
              spinner: false,
              history: [response.new_orders]
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

  handleClose(){
    this.setState({
      toast: false,
      t_msg:""
    });
  }

  updateOrder(order_id,type){
    let msg ='';
    if(type==='accept'){
      msg="Order Number "+order_id+" is Accepted";
    }
    else{
      msg="Order Number "+order_id+" is Rejected";
    }
    this.setState({
      toast: true,
      t_msg:msg
    });
    // <Toasters />
  }

  render() {
    const showLoader = this.state.spinner;
    // console.log(this.state.dhaba[0]);
    const todos = this.state.history[0];
    
    return (
      <div>
        {showLoader ?
          <Loader />
          : ""
        }
        <Snackbar open={this.state.toast}
          autoHideDuration={5000}
          onClose={()=>this.handleClose()}
          message={this.state.t_msg}
          anchorOrigin={{vertical:'top',horizontal:'right'}}
          action={[
            <IconButton 
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={()=>this.handleClose()}
            >
              x
            </IconButton>
          ]}
          />
        <Header />
        <div id="page-wrapper">
          <div className="main-page">
            <div className="tables">
              <h3 className="title1">Pending Orders</h3>

              <div className="table-responsive bs-example widget-shadow">
                <table className="table table-bordered">
                  <tbody>
                    {
                      todos!==undefined ?
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
                              <button onClick={() => this.showOrder(rest.order_id)} className="btn btn-info">
                                View Order
                          </button>
                            </td>
                            <td>
                              <button onClick={() => this.updateOrder(rest.order_id,'accept')} className="btn btn-success">
                                Accept Order
                          </button>
                          &nbsp;
                          <button onClick={() => this.updateOrder(rest.order_id,'reject')} className="btn btn-danger">
                                Reject Order
                          </button>
                            </td>
                          </tr>
                        ) : <tr key="1"><td colSpan="6">No record found.</td></tr>
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

export default withRouter(PendingOrders);