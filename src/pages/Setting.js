import React, { Component } from 'react';
import Header from '../Components/Header';
import Loader from '../Components/loader';
import { URL } from '../Services/constants';

export default class Setting extends Component {

	state = {
		profile: [],
		errors: false,
		msg: "",
		name: "",
		mobile: "",
		address: "",
		image_data: "",
		spinner: false
	}

	componentDidMount() {

		this.setState({
			spinner: true
		});
		const mobile_token = localStorage.getItem('mobile_accessToken');

		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + mobile_token }
			// body: JSON.stringify({ order_id: this.state.order_number })

		};
		// console.warn(requestOptions);

		fetch(URL + "/getProfile", requestOptions)
			.then(res => res.json())
			.then(
				(response) => {
					// console.log(response.result[0].profile);

					if (response.status === "Success") {
						this.setState({
							spinner: false,
							name: response.result[0].profile.name,
							mobile: response.result[0].profile.mobile,
							email: response.result[0].profile.email,
							address: response.result[0].profile.address,
							profile_pic: response.result[0].profile.profile_pic
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

	submitForm() {
		let names = this.state.name;
		this.setState({ spinner: true,image_data:null});
		let data ="";
		let mobile = this.state.mobile;
		let profile_size = this.state.profile_pic;
		if(profile_size.length<200){
			// console.log(profile_size.length);
			data = {email:this.state.email,name:this.state.name,address:this.state.address,mobile:this.state.mobile};
		}
		else{
			data = this.state;
		}
		// console.warn(this.state);return;
		if (mobile === "" || names === "") {
			return this.setState({
				spinner: false,
				errors: true,
				msg: "Name and Mobile Number are required."
			});
		}

		// console.log(data);
		let accessToken = 'Bearer ' + localStorage.getItem('mobile_accessToken');
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
			body: JSON.stringify(data)

		};
		alert('Profile updated Successfully');
		return;
		// return false;
		fetch(URL + "/updateProfile", requestOptions)
			.then(res => res.json())
			.then(
				(result) => {

					if (result.status === "Success") {
						localStorage.removeItem('rest_name');
						if(profile_size.length>200){
							localStorage.setItem('profile_pic', result.result[0].updated_profile.profile_pic);
						}

						// console.log(result.result[0].updated_profile.profile_pic);

						localStorage.setItem('rest_name', result.result[0].updated_profile.name);
						this.setState({
							spinner: false,
							errors: true,
							show: true,
							msg: result.message
						});
						
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
		if (e.target.name === "mobile") {
				this.setState({ errors: false, msg: "", mobile: e.target.value });
		}
		if (e.target.name === "name") {
				this.setState({ errors: false, msg: "", name: e.target.value });
		}
		if (e.target.name === "profile_pic") {
			// console.log(e.target.files);
			let files = e.target.files;
			if (files.length > 0) {
				var reader = new FileReader();
				reader.readAsDataURL(files[0]);
				reader.onload = (e) => {
				let strImage= reader.result;
				// let imgURL = strImage.split(',')[1];
				// console.log(strImage);
				this.setState({ errors: false, msg: "", image_data: strImage,profile_pic:strImage });
				}
			}
			else {
				this.setState({ errors: true, msg: "Logo not selected." });
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
				<Header />
				<div id="page-wrapper">
					<div className="main-page">
						<div className="tables forms">
							<h3 className="title1">Settings</h3>

							<div className="table-responsive bs-example widget-shadow">
								<div className="form-body col-md-6" data-example-id="simple-form-inline">
									<div className="form-group">
										<label >Restaurant Name</label>
										<input type="text" className="form-control" name="name" value={this.state.name} placeholder="Restaurant name" onChange={this.handleChange} />
									</div>
									<div className="form-group">
										<label>Mobile</label>

										<input type="text" name="mobile" className="form-control" value={this.state.mobile} placeholder="Mobile Number" onChange={this.handleChange} />

									</div>
									<div className="form-group">
										<label >Email Address</label>

										<input type="email" readOnly defaultValue={this.state.email} className="form-control" />

									</div>

									{hasError ?
									<p className="error-message text-left">
										{this.state.msg}
									</p>
									: ""
								}
								</div>

								<div className="form-body col-md-6" data-example-id="simple-form-inline">

									<div className="form-group">
										<label >Restaurant Logo</label>
										<input type="file" onChange={this.handleChange} className="form-control" name="profile_pic" />
										<div className="preview">
											<img src={this.state.image_data?this.state.image_data:this.state.profile_pic} width="150px" height="100px" alt="Logo" />
										</div>

									</div>

									<div className="form-group">
										<label >Address</label>

										<textarea className="form-control" rows="4" cols="50" placeholder="Address" onChange={(e) => { this.setState({ address: e.target.value }) }} name="address" defaultValue={this.state.address === "null" ? "" : this.state.address} />

									</div>
									<button className="btn btn-danger" onClick={() => this.submitForm()}>Update</button>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div >
		);
	}


}