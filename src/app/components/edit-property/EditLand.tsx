'use client';
import React, {useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {LandSchema, PropertiesSchema} from '@/schemas/properties.schema';
import {useAppSelector} from '@/redux/hooks';
import {selectUser} from '@/redux/features/auth/authSlice';
import {useGetMyProfileQuery} from '@/redux/features/user/userManagementApi';
import {
	useGetPropertyByIdQuery,
	useUpdatePropertyMutation,
} from '@/redux/features/property/propertyManagementApi';
import {toast} from 'sonner';
import {catchAsync} from '@/utils/catchAsync';
import ImageUploader, {IUploadedImage} from '../ImageUploader/ImageUploader';
import PSBInput from '../form/PSBInput';
import PSBSelect from '../form/PSBSelect';
import PSBTextArea from '../form/PSBTextArea';
import {FieldValues} from 'react-hook-form';
import PSBForm from '../form/PSBForm';
import PropertySuccessModal from './PropertySuccessModal';
import VideoUploader from '../VideoUploader/VideoUploader';
import {landShapes, LType, soilTypes, status, utilityAccess} from '../submit-property/option';

export default function EditLand({id}: {id: string}) {
	const [uploadedVideos, setUploadedVideos] = useState<IUploadedImage[]>([]);
	const [uploadedImages, setUploadedImages] = useState<IUploadedImage[]>([]);
	// function handleChange(e: any) {
	// 	console.log(e.target.files);
	// 	setFile(URL.createObjectURL(e.target.files[0]));
	// }
	const user = useAppSelector(selectUser);
	const {data, isLoading} = useGetPropertyByIdQuery(id);
	const {data: userData, isLoading: userLoading} = useGetMyProfileQuery(user?.id);
	const [updateProperty, {isLoading: updateLoading}] = useUpdatePropertyMutation();
	const [showModal, setShowModal] = useState(false);

	const [defaultValues, setDefaultValues] = useState<any>(null);
	const handleSubmit = (data: FieldValues, method: any) => {
		const toastId = toast.loading(
			'Updating property... This may take a few moments to upload your images and video.',
			{
				style: {
					background: '#fff3e0', // soft orange background
					color: '#e65100', // dark orange text
					fontWeight: '500',
					fontSize: '14px',
					borderRadius: '8px',
					padding: '12px 20px',
					boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
				},
			},
		);

		const amenities = data?.features ? data.features : null;
		const soil_type = data?.soil_type ? data.soil_type.value : null;
		const land_shape = data?.land_shape ? data.land_shape.value : null;
		const formattedData: Record<string, any> = {
			...data,
			status: 'for sell',
			property_type: 'land',
			utility_access: JSON.stringify(amenities),
			user: user?.id,
			soil_type,
			land_shape,
			contact_information: JSON.stringify({
				name: data?.name,
				email: data?.email,
				phone: data?.phone,
			}),
			features: null,
		};
		// get images name images like : image1:file1 , image2:file2
		if (uploadedImages.length < 1) {
			toast.error('Please upload at least 1 images', {id: toastId});
			return;
		}
		if (uploadedImages.length > 6) {
			toast.error('You can upload maximum 4 images', {id: toastId});
			return;
		}

		if (uploadedVideos.length < 1) {
			toast.error('Please upload A video', {id: toastId});
			return;
		}

		// append images to data
		uploadedImages.forEach((image, index) => {
			if (!image.file) return;
			formattedData[`image${index + 1}`] = image.file;
		});

		// append videos to data
		uploadedVideos.forEach((video) => {
			if (!video.file) return;
			formattedData[`videos`] = video.file;
		});
		const formData = new FormData();
		for (const key in formattedData) {
			formData.append(key, formattedData[key]);
		}

		catchAsync(async () => {
			const res = await updateProperty({id, data: formData});
			if (res?.data?.id) {
				setShowModal(true);
				toast.success('Property Update Complete', {id: toastId});
				setUploadedImages([]);
				setUploadedVideos([]);
				method.reset();
			} else {
				toast.error('Property Update Failed', {id: toastId});
			}
		});
	};
	useEffect(() => {
		if (!data) return;
		const imageFields = ['image1', 'image2', 'image3', 'image4', 'image5', 'image6'];
		const images = imageFields
			.map((key) => data[key])
			.filter(Boolean)
			.map((url, index) => ({
				id: Math.random().toString(36).substr(2, 9),
				file: null,
				previewUrl: url,
				name: `image${index + 1}.jpg`,
			}));
		setUploadedImages(images);
		const videoFields = ['videos'];
		const videos = videoFields
			.map((key) => data[key])
			.filter(Boolean)
			.map((url, index) => ({
				id: Math.random().toString(36).substr(2, 9),
				file: null,
				previewUrl: url,
				name: `video.mp4`,
			}));
		setUploadedVideos(videos);

		setDefaultValues({
			...data,
			property_type: {value: data.property_type, label: data.property_type},
			status: {value: data.status, label: data.status},
			features: data?.utility_access ? data?.utility_access : [],
			land_shape: data?.land_shape
				? {
						value: data.land_shape,
						label: data.land_shape.charAt(0).toUpperCase() + data.land_shape.slice(1),
				  }
				: null,
			soil_type: data?.soil_type
				? {
						value: data.soil_type,
						label: data.soil_type.charAt(0).toUpperCase() + data.soil_type.slice(1),
				  }
				: null,
			name: data?.contact_information?.name || '',
			email: data?.contact_information?.email || '',
			phone: data?.contact_information?.phone || '',
			// features: amenities.map((feature) => ({label: feature, value: feature})), // convert to select option format
		});
	}, [data, userData]);

	return (
		<>
			<PSBForm
				onSubmit={handleSubmit}
				resolver={zodResolver(LandSchema)}
				defaultValues={defaultValues}
			>
				<div className="form-submit">
					<h3>Basic Information</h3>
					<div className="submit-section">
						<div className="row">
							<div className="form-group col-md-12">
								<PSBInput
									name="title"
									label="	Property Title"
									placeholder="Enter Property Title"
									type="text"
								/>
							</div>
							<div className="form-group col-md-6">
								<PSBSelect
									name="status"
									label="Select Status"
									options={status}
									placeholder="For Sell"
									isDisabled={true}
								/>
							</div>
							<div className="form-group col-md-6">
								<PSBSelect
									name="property_type"
									label="Select Type"
									options={LType}
									placeholder="Land"
									isDisabled={true}
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBInput
									name="price"
									label="Land Price (TAKA)"
									placeholder="Enter Land Price"
									type="text"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBInput
									name="areas"
									label="Land Areas (kathas)"
									placeholder="Enter Land Areas"
									type="text"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBInput
									name="plot_number"
									label="Plot Number"
									placeholder="Enter Plot Number"
									type="text"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBInput
									name="holding_number"
									label="Holding Number"
									placeholder="Enter Holding Number"
									type="text"
								/>
							</div>
							<div className="form-group col-md-6">
								<PSBSelect
									name="land_shape"
									label="Land Shape"
									options={landShapes}
									placeholder="Select Land Shape"
								/>
							</div>
							<div className="form-group col-md-6">
								<PSBSelect
									name="soil_type"
									label="Soil Type"
									options={soilTypes}
									placeholder="Select Soil Type"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="form-submit">
					<h3>Gallery</h3>
					<div className="submit-section position-relative">
						<div className="row">
							<div className="form-group col-md-7">
								<label>Upload Gallery</label>

								<ImageUploader
									uploadedImages={uploadedImages}
									setUploadedImages={setUploadedImages}
									maxImages={6}
								/>
							</div>
							<div className="form-group col-md-5">
								<label>Upload Video</label>

								<VideoUploader
									uploadedVideos={uploadedVideos}
									setUploadedVideos={setUploadedVideos}
									maxVideos={1}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="form-submit">
					<h3>Detailed Information</h3>
					<div className="submit-section">
						<div className="row">
							<div className="form-group col-md-12">
								<PSBTextArea
									name="description"
									label="Property Description"
									placeholder="Enter Property Description"
								/>
							</div>

							<div className="form-group col-md-12">
								<PSBSelect
									name="features"
									label="Select Features"
									options={utilityAccess}
									placeholder="Select features"
									isMulti={true}
								/>
							</div>
							<div className="form-group col-md-12">
								<PSBInput
									name="address"
									label="Enter Property Address"
									placeholder="Gulshan, Dhaka, Bangladesh"
									type="text"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="form-submit">
					<h3>Contact Information</h3>
					<div className="submit-section">
						<div className="row">
							<div className="form-group col-md-4">
								<PSBInput
									name="name"
									label="Name"
									placeholder="Enter Your Name"
									disabled={user?.name ? true : false}
									type="text"
								/>
							</div>
							<div className="form-group col-md-4">
								<PSBInput
									name="email"
									label="Email"
									disabled={user?.email ? true : false}
									placeholder="Enter Your Email"
									type="text"
								/>
							</div>
							<div className="form-group col-md-4">
								<PSBInput
									name="phone"
									label="Phone"
									placeholder="Enter Your Phone"
									disabled={user?.phone ? true : false}
									type="text"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="form-group col-lg-12 col-md-12">
					<label>GDPR Agreement *</label>
					<ul className="no-ul-list">
						<li>
							<input
								id="aj-1"
								className="form-check-input me-2"
								name="aj-1"
								type="checkbox"
								defaultChecked={true}
								required
							/>
							<label htmlFor="aj-1" className="form-check-label">
								I consent to having this website store my submitted information so they can respond
								to my inquiry.
							</label>
						</li>
					</ul>
				</div>
				<div className="form-group col-lg-12 col-md-12">
					<button className="btn btn-primary fw-medium px-5" type="submit" disabled={isLoading}>
						{updateLoading ? 'Uploading...' : 'Submit Property'}
					</button>
				</div>
			</PSBForm>

			<PropertySuccessModal show={showModal} onClose={() => setShowModal(false)} />
		</>
	);
}
