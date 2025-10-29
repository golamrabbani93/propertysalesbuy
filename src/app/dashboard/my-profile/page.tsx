'use client';
import React, {useState} from 'react';

export default function Page() {
	let [show, setShow] = useState<boolean>(false);
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="dashboard-wraper">
						<div className="form-submit">
							<h4>My Account</h4>
							<div className="submit-section">
								<div className="row">
									<div className="form-group col-md-6">
										<label className="mb-2">Your Name</label>
										<input type="text" className="form-control" defaultValue="Calvin Carlo" />
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">Email</label>
										<input type="email" className="form-control" defaultValue="Carlo77@gmail.com" />
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">Your Title</label>
										<input type="text" className="form-control" defaultValue="Web Designer" />
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">Phone</label>
										<input type="text" className="form-control" defaultValue="123 456 5847" />
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">Address</label>
										<input
											type="text"
											className="form-control"
											defaultValue="522, Arizona, Canada"
										/>
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">City</label>
										<input type="text" className="form-control" defaultValue="Montquebe" />
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">State</label>
										<input type="text" className="form-control" defaultValue="Canada" />
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">Zip</label>
										<input type="text" className="form-control" defaultValue="160052" />
									</div>
									<div className="form-group col-md-12">
										<label className="mb-2">About</label>
										<textarea
											className="form-control"
											defaultValue="Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="form-submit">
							<h4>Social Accounts</h4>
							<div className="submit-section">
								<div className="row">
									<div className="form-group col-md-6">
										<label className="mb-2">Facebook</label>
										<input
											type="text"
											className="form-control"
											defaultValue="https://facebook.com/"
										/>
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">Twitter</label>
										<input
											type="email"
											className="form-control"
											defaultValue="https://twitter.com/"
										/>
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">Google Plus</label>
										<input
											type="text"
											className="form-control"
											defaultValue="https://googleplus.com"
										/>
									</div>
									<div className="form-group col-md-6">
										<label className="mb-2">LinkedIn</label>
										<input
											type="text"
											className="form-control"
											defaultValue="https://linkedin.com/"
										/>
									</div>

									<div className="form-group col-lg-12 col-md-12">
										<button className="btn btn-primary px-5 rounded" type="submit">
											Save Changes
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
