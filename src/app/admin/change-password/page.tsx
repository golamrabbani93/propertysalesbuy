'use client';
import ChangePassword from '@/app/components/dashboard/change-password/ChangePassword';
import React, {useState} from 'react';

export default function ChangePasswordPage() {
	let [show, setShow] = useState<boolean>(false);
	return (
		<>
			<div className="dashboard-wraper">
				<div className="form-submit">
					<h4>Change Your Password</h4>
					<ChangePassword />
				</div>
			</div>
		</>
	);
}
