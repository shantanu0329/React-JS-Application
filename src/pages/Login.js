import React, { Component } from 'react';
import Loader from '../Components/loader';
import { connect } from 'react-redux';
import { URL } from '../Services/constants';

class Login extends Component {

  constructor(props) {
    super();
  }
  state = {
    email: "",
    password: "",
    errors: false,
    msg: "",
    spinner: false
  }

  componentDidMount()
  {
    let token = localStorage.getItem('accessToken');
    if(token){
      // this.props.history.push('/Restaurants');
    }
  }

  submit() {

    this.setState({ spinner: true });
    let data = this.state;
    let email = this.state.email;
    let password = this.state.password;
    // console.warn(email,password);
    if (email === "") {
      return this.setState({
        spinner: false,
        errors: true,
        msg: "Please enter valid email."
      });
    }
    if (password === "") {
      return this.setState({
        spinner: false,
        errors: true,
        msg: "Please enter valid password."
      });
    }
    // console.log(data);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)

    };

    // return false;
    fetch(URL + "/adminLogin", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);

          if (result.status === "Success") {
            this.setState({
              spinner: false,
              errors: true,
              msg: result.message
            });
            this.props.restaurant_details(result.result[0]);
            localStorage.setItem('accessToken', result.result[0].accessToken);
            localStorage.setItem('admin_logout_token', result.result[0].token);
            // this.props.history.push('/dashboard')token
            this.props.history.push('/Restaurants');
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
    const hasError = this.state.errors;
    const showLoader = this.state.spinner;
    return (
      <div className="padding-all">
        <div className="header">
          <h1>Admin Login</h1>
        </div>

        <div className="design-w3l">

          <div className="mail-form-agile">

            <form>

              <input type="text" className="user" field="email" name="email" placeholder="Admin Email" onChange={(e) => { this.setState({ email: e.target.value }) }} />

              <input type="text" field="password" className="user padding" name="password" placeholder="Admin Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />

              <input type="button" onClick={() => this.submit()} value="Sign In" />

            </form>
          </div>
          {hasError ?
            <p className="err-msg-login text-center">
              <b>{this.state.msg}</b>
            </p>
            : ""
          }

          {showLoader ?
            <Loader />
            : ""
          }
          <div className="clear"> </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    restaurant_details: (payload) => dispatch({ type: 'restaurantDetail', data: payload })
  }
}


export default connect(null, mapDispatchToProps)(Login);