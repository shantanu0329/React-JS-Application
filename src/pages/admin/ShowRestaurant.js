import React, { Component } from 'react';
import AdminHeader from '../../Components/AdminHeader';
import { connect } from 'react-redux';
import {URL} from '../../Services/constants';
import Loader from '../../Components/loader';

class ShowRestaurant extends Component {

  constructor(props) {
    super(props);
      const accessToken= localStorage.getItem('accessToken');
      
      this.state = {
        spinner:false,
        dhaba:[],
		    snack:false,
        data: 'Bearer '+accessToken
      }
    }


  componentDidMount() {
  
    this.setState({spinner: true});
    let accessToken = this.state.data;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization':accessToken },
      body: ({'page':1})

    };
    // console.warn(requestOptions);

    fetch(URL + "/restaurantList", requestOptions)
      .then(res => res.json())
      .then(
        (response) => {
          
          if (response.status === "Success") {
            this.setState({
              spinner: false,
              dhaba: [response.result]
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


  
  render() {
    const showLoader = this.state.spinner;
    const todos = this.state.dhaba[0];
    // console.log(todos);
    return (
      <div>
        {showLoader?
				<Loader />
				:""
			  }
        <AdminHeader />
       
        <div id="page-wrapper">
          <div className="main-page">
            <div className="tables">
              <h3 className="title1">Restaurant List</h3>

              <div className="table-responsive bs-example widget-shadow">
                <table className="table table-bordered">
                  <thead>
                    <tr key="2">
                      <th>ID</th>
                      <th>Name</th>
                      <th>App ID</th>
                      <th>Email</th>
                      <th>Mobile Number</th>
                    </tr>
                    
                  </thead>
                  <tbody>
                  {
                    todos ?
                    todos.map((rest,i) =>
                    <tr key={i}>
                      <td>{rest.id}</td>
                      <td>{rest.name}</td>
                      <td>{rest.app_id}</td>
                      <td>{rest.email ?rest.email:"N/A"}</td>
                      <td>{rest.mobile ?rest.mobile:"N/A"}</td>
                    </tr>
                    ): <tr><td>No record found.</td></tr>
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
)(ShowRestaurant);