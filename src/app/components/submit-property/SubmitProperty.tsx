'use client';
import React, {useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {PropertiesSchema} from '@/schemas/properties.schema';
import {useAppSelector} from '@/redux/hooks';
import {selectUser} from '@/redux/features/auth/authSlice';
import {useGetMyProfileQuery} from '@/redux/features/user/userManagementApi';
import {useCreatePropertyMutation} from '@/redux/features/property/propertyManagementApi';
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
import {APFeatureOptions, ApType, bedrooms, status} from './option';

export default function SubmitProperty() {
	const [uploadedVideos, setUploadedVideos] = useState<IUploadedImage[]>([]);
	const [uploadedImages, setUploadedImages] = useState<IUploadedImage[]>([]);
	// function handleChange(e: any) {
	// 	console.log(e.target.files);
	// 	setFile(URL.createObjectURL(e.target.files[0]));
	// }
	const user = useAppSelector(selectUser);
	const {data: userData, isLoading} = useGetMyProfileQuery(user?.id);
	const [createProperty, {isLoading: uploadLoading}] = useCreatePropertyMutation();
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = (data: FieldValues, method: any) => {
		const toastId = toast.loading(
			'Creating property... This may take a few moments to upload your images and video.',
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
		const newStatus = 'For Sell';
		const newPropertyType = data.property_type?.value;
		const newBeds = data.bedrooms?.value ? data.bedrooms.value : null;
		const newBaths = data.bathrooms?.value ? data.bathrooms.value : null;
		const amenities = data?.features ? data.features : null;
		const formattedData: Record<string, any> = {
			...data,
			status: newStatus,
			property_type: newPropertyType,
			bedrooms: newBeds,
			bathrooms: newBaths,
			amenities: JSON.stringify(amenities),
			user: user?.id,
			contact_information: JSON.stringify({
				name: data?.name,
				email: data?.email,
				phone: data?.phone,
			}),
		};
		// get images name images like : image1:file1 , image2:file2
		if (uploadedImages.length < 1) {
			toast.error('Please upload at least 1 images', {id: toastId});
			return;
		}
		if (uploadedImages.length > 6) {
			toast.error('You can upload maximum 6 images', {id: toastId});
			return;
		}
		if (uploadedVideos.length < 1) {
			toast.error('Please upload A video', {id: toastId});
			return;
		}

		// append images to data
		uploadedImages.forEach((image, index) => {
			formattedData[`image${index + 1}`] = image.file;
		});
		// append videos to data
		uploadedVideos.forEach((video) => {
			formattedData[`videos`] = video.file;
		});
		const formData = new FormData();
		for (const key in formattedData) {
			formData.append(key, formattedData[key]);
		}

		catchAsync(async () => {
			const res = await createProperty(formData);
			if (res?.data?.id) {
				setShowModal(true);
				toast.success('Property Create Complete', {id: toastId});
				setUploadedImages([]);
				setUploadedVideos([]);
				method.reset();
			} else {
				toast.error('Property Create Failed', {id: toastId});
			}
		});
	};

	return (
		<>
			<PSBForm
				onSubmit={handleSubmit}
				resolver={zodResolver(PropertiesSchema)}
				defaultValues={userData}
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
									options={ApType}
									placeholder="Select an option"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBInput
									name="price"
									label="Property Price (TAKA)"
									placeholder="Enter Property Price"
									type="text"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBInput
									name="areas"
									label="Property Areas (in sqft)"
									placeholder="Enter Property Areas (in sqft)"
									type="text"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBSelect
									name="bedrooms"
									label="Select Bedrooms"
									options={bedrooms}
									placeholder="Select an option"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBSelect name="bathrooms" options={bedrooms} label="Select Bathrooms" />
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
									options={APFeatureOptions}
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
						{uploadLoading ? 'Uploading...' : 'Submit Property'}
					</button>
				</div>
			</PSBForm>

			<PropertySuccessModal show={showModal} onClose={() => setShowModal(false)} />
		</>
	);
}
