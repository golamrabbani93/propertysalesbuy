'use client';
import React, {useState} from 'react';

export default function ChangePassword() {
	let [show, setShow] = useState<boolean>(false);
	return (
		<>
			<div className="dashboard-wraper">
				<div className="form-submit">
					<h4>Change Your Password</h4>
					<div className="submit-section">
						<div className="row">
							<div className="form-group col-lg-12 col-md-6">
								<label>Old Password</label>
								<input type="password" className="form-control" />
							</div>
							<div className="form-group col-md-6">
								<label>New Password</label>
								<input type="password" className="form-control" />
							</div>
							<div className="form-group col-md-6">
								<label>Confirm password</label>
								<input type="password" className="form-control" />
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
		</>
	);
}
