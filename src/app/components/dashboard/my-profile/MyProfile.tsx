import {useEffect, useState} from 'react';
import PSBForm from '../../form/PSBForm';
import PSBInput from '../../form/PSBInput';
import ImageUploader, {IUploadedImage} from '../../ImageUploader/ImageUploader';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {selectUser, setUser} from '@/redux/features/auth/authSlice';
import {zodResolver} from '@hookform/resolvers/zod';
import {profileSchema} from '@/schemas/profile.schema';
import DashboardLoader from '../../Loader/DashboardLoader';
import {catchAsync} from '@/utils/catchAsync';
import {
	useGetMyProfileQuery,
	useUpdateMyProfileMutation,
} from '@/redux/features/user/userManagementApi';
import {toast} from 'sonner';

const MyProfile = () => {
	const [uploadedImages, setUploadedImages] = useState<IUploadedImage[]>([]);
	const user = useAppSelector(selectUser);
	const {data: userData, isLoading: userLoading} = useGetMyProfileQuery(user.id);
	const dispatch = useAppDispatch();
	const [updateProfile, {isLoading: updateLoading}] = useUpdateMyProfileMutation();
	const handleSubmit = (data: any) => {
		const modifyData = {...data, password: userData?.password};

		uploadedImages.forEach((image) => {
			if (!image.file) return; // skip if no file (existing images)
			modifyData[`image`] = image.file;
		});
		const formData = new FormData();
		for (const key in modifyData) {
			formData.append(key, modifyData[key]);
		}
		catchAsync(async () => {
			const res = await updateProfile({id: user.id, data: formData});
			if (res?.data?.id) {
				dispatch(setUser({...res?.data}));
				toast.success('Profile updated successfully');
			}
			res.error && toast.error('Profile update failed');
		});
	};

	useEffect(() => {
		if (userData && userData.image) {
			setUploadedImages([
				{
					id: Math.random().toString(36).substr(2, 9),
					file: null,
					previewUrl: userData.image,
					name: `current-profile-image`,
				},
			]);
		}
	}, [userData]);

	if (userLoading) {
		return <DashboardLoader />;
	}
	return (
		<div className="submit-section mt-5">
			<PSBForm
				onSubmit={handleSubmit}
				defaultValues={userData}
				resolver={zodResolver(profileSchema)}
			>
				<div className="row">
					<h4>Personal Information</h4>
					<div className="form-group col-md-6">
						<PSBInput label="Your Name" name="name" type="text" />
					</div>
					<div className="form-group col-md-6">
						<PSBInput label="Your Email" name="email" type="email" />
					</div>
					<div className="form-group col-md-6">
						<PSBInput label="Your Phone" name="phone" type="text" />
					</div>
					<div className="form-group col-md-6">
						<PSBInput label="Your Address" name="address" type="text" />
					</div>
					<h4>Upload Your Profile Picture</h4>
					<div className="form-group col-md-6">
						<ImageUploader
							uploadedImages={uploadedImages}
							setUploadedImages={setUploadedImages}
							maxImages={1}
						/>
					</div>

					<div className="form-group col-lg-12 col-md-12">
						<button className="btn btn-primary px-5 rounded" type="submit">
							{updateLoading ? 'Updating...' : 'Update Profile'}
						</button>
					</div>
				</div>
			</PSBForm>
		</div>
	);
};

export default MyProfile;
