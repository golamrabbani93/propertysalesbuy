'use client';

import {useAppSelector} from '@/redux/hooks';
import PSBForm from '../../form/PSBForm';
import PSBInput from '../../form/PSBInput';
import {selectUser} from '@/redux/features/auth/authSlice';
import {toast} from 'sonner';
import comparePassword from '@/utils/comparePassword';
import {
	useGetMyProfileQuery,
	useUpdateMyProfileMutation,
} from '@/redux/features/user/userManagementApi';
import DashboardLoader from '../../Loader/DashboardLoader';
import {zodResolver} from '@hookform/resolvers/zod';
import {changePasswordSchema} from '@/schemas/changePassword.schema';
import {useState} from 'react';
import {catchAsync} from '@/utils/catchAsync';
import {FieldValues} from 'react-hook-form';
import hashPassword from '@/utils/hashPassword';

const ChangePassword = () => {
	const user = useAppSelector(selectUser);
	const {data: userData, isLoading} = useGetMyProfileQuery(user.id);
	const [updatePassword, {isLoading: passwordUpdating}] = useUpdateMyProfileMutation();
	const [showPassword, setShowPassword] = useState(false);
	const handleSubmit = async (data: FieldValues, method: any) => {
		// Validate and process password change

		// confirm old password matches user's current password
		const isOldPasswordCorrect = await comparePassword(data.oldPassword, userData.password);
		if (!isOldPasswordCorrect) {
			toast.error('Old password is incorrect.');
			return;
		}
		catchAsync(async () => {
			const res = await updatePassword({
				id: userData.id,
				data: {
					name: userData.name,
					email: userData.email,
					password: await hashPassword(data.newPassword),
				},
			});
			if (res?.data?.id) {
				toast.success('Password changed successfully.');
				method.reset();
			} else {
				toast.error('Password change failed.');
			}
		});

		// Handle password change logic here
	};
	if (isLoading) {
		return <DashboardLoader />;
	}
	return (
		<div className="submit-section">
			<PSBForm onSubmit={handleSubmit} resolver={zodResolver(changePasswordSchema)}>
				<div className="row">
					<div className="form-group col-lg-12 col-md-6">
						<PSBInput
							label="Old Password"
							name="oldPassword"
							type={showPassword ? 'text' : 'password'}
						/>
					</div>
					<div className="form-group col-md-6">
						<PSBInput
							label="New Password"
							name="newPassword"
							type={showPassword ? 'text' : 'password'}
						/>
					</div>
					<div className="form-group col-md-6">
						<PSBInput
							label="Confirm Password"
							name="confirmPassword"
							type={showPassword ? 'text' : 'password'}
						/>
					</div>
					<div className="form-group col-lg-12 col-md-12">
						<ul className="no-ul-list">
							<li>
								<input
									id="aj-1"
									className="form-check-input me-2"
									name="aj-1"
									type="checkbox"
									checked={showPassword}
									onChange={() => setShowPassword(!showPassword)}
								/>
								<label htmlFor="aj-1" className="form-check-label">
									Show password
								</label>
							</li>
						</ul>
					</div>
					<div className="form-group col-lg-12 col-md-12">
						<button className="btn btn-primary px-5 rounded" type="submit">
							{passwordUpdating ? 'Updating...' : 'Change Password'}
						</button>
					</div>
				</div>
			</PSBForm>
		</div>
	);
};

export default ChangePassword;
