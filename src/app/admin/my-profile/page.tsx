'use client';
import MyProfile from '@/app/components/dashboard/my-profile/MyProfile';
import React, {useState} from 'react';

export default function Page() {
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="dashboard-wraper">
						<div className="form-submit">
							<h4>My Account</h4>
							<MyProfile />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
