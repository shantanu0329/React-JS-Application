import React, { Component } from 'react';
import AdminHeader from '../../Components/AdminHeader';
import { URL } from '../../Services/constants';
import Loader from '../../Components/loader';

class AddRestaurant extends Component {

	constructor(props) {
		super();
	}
	state = {
		email: "",
		name: "",
		service_charge: "",
		errors: false,
		msg: "",
		spinner: false
	}

	submitForm() {
		let names = this.state.name;
		this.setState({ spinner: true });
		let data = this.state;
		let email = this.state.email;
		let service_charge = this.state.service_charge;
		// console.warn(this.state);
		if (email === "" || names === "" || service_charge === "") {
			return this.setState({
				spinner: false,
				errors: true,
				msg: "Please enter required fields."
			});
		}

		// console.log(data);
		let accessToken = 'Bearer '+localStorage.getItem('accessToken');
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
			body: JSON.stringify(data)

		};

		// return false;
		fetch(URL + "/addRestaurant", requestOptions)
			.then(res => res.json())
			.then(
				(result) => {
					// console.log(result);

					if (result.status === "Success") {
						this.setState({
							spinner: false,
							errors: true,
							show: true,
							msg: result.message
                        });
                        
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

	handleChange = (e) => {
		if (e.target.name === "email") {
			if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
				this.setState({ errors: false, msg: "", email: e.target.value });
				// console.log(e.target.name)
			}
			else {
				this.setState({ errors: true, msg: "Please enter valid Email Id." });
			}
		}
		if (e.target.name === "mobile") {
			if (e.target.value) {
				this.setState({ errors: false, msg: "", mobile: e.target.value });
				// console.log(e.target.name)
			}
			else {
				this.setState({ errors: true, msg: "Please enter valid Email Id." });
			}
		}
		if (e.target.name === "service_charge") {
			if (e.target.value) {
				this.setState({ errors: false, msg: "", service_charge: e.target.value });
				// console.log(e.target.name)
			}
			else {
				this.setState({ errors: true, msg: "Please enter valid Email Id." });
			}
		}

	}

	render() {
		const showLoader = this.state.spinner;
		const hasError = this.state.errors;

		return (
			<div>
				{showLoader ?
					<Loader />
					: ""
				}
				<AdminHeader />
                
				<div id="page-wrapper">
					<div className="main-page">
						<div className="tables forms">
							<h3 className="title1">Add Restaurant</h3>

							<div className="table-responsive bs-example widget-shadow">
								<div className="form-body col-md-6" data-example-id="simple-form-inline">
									<div className="form-group">
										<label >Restaurant Name<span className="error-message">*</span></label>
										<input type="text" className="form-control" name="name" placeholder="Restaurant Name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
									</div>
									<div className="form-group">
										<label >Telephone</label>

										<input type="text" name="mobile" className="form-control" placeholder="Contact Number" onChange={this.handleChange} />

									</div>
									<div className="form-group">
										<label >Service Charge<span className="error-message">*</span></label>

										<input type="text" name="service_charge" className="form-control" placeholder="0.5" onChange={this.handleChange} />

									</div>
									<div className="form-group">
										<label >Email ID<span className="error-message">*</span></label>
										<input type="email" name="email" className="form-control" placeholder="Restaurant Email ID" onChange={this.handleChange} />


									</div>
								</div>

								<div className="form-body col-md-6" data-example-id="simple-form-inline">

									<div className="form-group">
										<label >Address</label>

										<textarea className="form-control" rows="4" cols="50" placeholder="Address" name="address" onChange={(e) => { this.setState({ address: e.target.value }) }}></textarea>

									</div>
									<button className="btn btn-danger" onClick={() => this.submitForm()}>Save</button>
								</div>
								{hasError ?
									<p className="error-message text-center">
										<b>{this.state.msg}</b>
									</p>
									: ""
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}


}

export default AddRestaurant;