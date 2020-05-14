import React, { Component } from 'react';
import Header from '../Components/Header';
import { URL } from '../Services/constants';
import Loader from '../Components/loader';

export default class Faq extends Component {

	state = {
		faq: [],
		errors: false,
		msg: "",
		spinner: true
	}

	componentDidMount() {
		this.setState({spinner: true});
		const mobile_token = localStorage.getItem('mobile_accessToken');

		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + mobile_token }

		};
		// console.warn(requestOptions);

		fetch(URL + "/getFaq", requestOptions)
			.then(res => res.json())
			.then(
				(response) => {

					if (response.status === "Success") {

						// console.log(response);

						this.setState({
							spinner: false,
							faq: [response.result]
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
		const todos = this.state.faq[0];
		// console.log(todos);
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
							<h3 className="title1">FAQ'S</h3>
							{
								todos ?
									todos.map((rest, i) =>
										<div key={i} className="panel-group tool-tips widget-shadow" id="accordion" role="tablist" aria-multiselectable="true">
											<div className="panel panel-default">
												<div className="panel-heading" role="tab" id="headingOne">
													<h4 className="panel-title">
														<a role="button" data-toggle="collapse" data-parent="#accordion" href={'#'+rest.id} aria-expanded={i===0?"true":"false"} aria-controls="collapseOne" className={i===0?"":"collapsed"}>
															{rest.question}
														</a>
													</h4>
												</div>
												<div id={rest.id} className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
													<div className="panel-body">
														{rest.answer}
													</div>
												</div>
											</div>
										</div>
									) : <div className="panel-body">No record found.</div>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}

}