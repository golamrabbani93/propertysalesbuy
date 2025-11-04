'use client';
import React, {useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {PropertiesSchema} from '@/schemas/properties.schema';
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

export default function EditProperty({id}: {id: string}) {
	// const [file, setFile] = useState('');
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
	const status = [
		// {value: '1', label: 'For Rent'},
		{value: 'for sell', label: 'For Sell'},
	];
	const type = [
		{value: 'apartment', label: 'Apartment'},
		{value: 'house', label: 'House'},
		{value: 'villa', label: 'Villa'},
		{value: 'land', label: 'Land'},
	];
	const bedrooms = [
		{label: '1', value: '1'},
		{label: '2', value: '2'},
		{label: '3', value: '3'},
		{label: '4', value: '4'},
		{label: '5', value: '5'},
	];
	const featureOptions = [
		{label: '1 Out of 5 Floors', value: '1 Out of 5 Floors'},
		{label: '2 Out of 5 Floors', value: '2 Out of 5 Floors'},
		{label: '3 Out of 5 Floors', value: '3 Out of 5 Floors'},
		{label: '4 Out of 5 Floors', value: '4 Out of 5 Floors'},
		{label: '5 Out of 5 Floors', value: '5 Out of 5 Floors'},

		// Views & Orientation
		{label: 'Road View', value: 'Road View'},
		{label: 'Park View', value: 'Park View'},
		{label: 'River View', value: 'River View'},
		{label: 'Sea View', value: 'Sea View'},
		{label: 'North Facing', value: 'North Facing'},
		{label: 'South Facing', value: 'South Facing'},
		{label: 'East Facing', value: 'East Facing'},
		{label: 'West Facing', value: 'West Facing'},

		// Facilities
		{label: '1 Lift(s)', value: '1 Lift(s)'},
		{label: '2 Lift(s)', value: '2 Lift(s)'},
		{label: 'Private AC', value: 'Private AC'},
		{label: 'Central AC', value: 'Central AC'},
		{label: 'Substation Room', value: 'Substation Room'},
		{label: 'Generator [Light,Fan]', value: 'Generator [Light,Fan]'},
		{label: 'CCTV Security', value: 'CCTV Security'},
		{label: 'Fire Safety', value: 'Fire Safety'},
		{label: 'Gym', value: 'Gym'},
		{label: 'Swimming Pool', value: 'Swimming Pool'},
		{label: 'Community Hall', value: 'Community Hall'},

		// Utilities
		{label: 'Electricity', value: 'Electricity'},
		{label: 'Water Supply', value: 'Water Supply'},
		{label: 'Own Deep Tube', value: 'Own Deep Tube'},
		{label: 'Cylinder Gas', value: 'Cylinder Gas'},
		{label: 'Solar Water Heater', value: 'Solar Water Heater'},

		// Parking & Roads
		{label: '1 Car Parking', value: '1 Car Parking'},
		{label: '2 Car Parking', value: '2 Car Parking'},
		{label: '3 Car Parking', value: '3 Car Parking'},
		{label: '20 Ft. Road', value: '20 Ft. Road'},
		{label: '30 Ft. Road', value: '30 Ft. Road'},
		{label: '40 Ft. Road', value: '40 Ft. Road'},
		{label: '50 Ft. Road', value: '50 Ft. Road'},

		// Furnishing
		{label: 'Furnished', value: 'Furnished'},
		{label: 'Semi-Furnished', value: 'Semi-Furnished'},
		{label: 'Unfurnished', value: 'Unfurnished'},

		// Others
		{label: 'Balcony', value: 'Balcony'},
		{label: 'Terrace', value: 'Terrace'},
		{label: 'Garden', value: 'Garden'},
		{label: 'Storage Room', value: 'Storage Room'},
		{label: 'Servant Quarter', value: 'Servant Quarter'},
	];

	const handleSubmit = (data: FieldValues) => {
		const toastId = toast.loading('Updating property..', {
			style: {
				background: '#fff3e0', // soft orange background
				color: '#e65100', // dark orange text
				fontWeight: '500',
				fontSize: '14px',
				borderRadius: '8px',
				padding: '12px 20px',
				boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
			},
		});
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
		if (uploadedImages.length > 4) {
			toast.error('You can upload maximum 4 images', {id: toastId});
			return;
		}

		// append images to data
		uploadedImages.forEach((image, index) => {
			if (!image.file) return; // skip if no file (existing images)
			formattedData[`image${index + 1}`] = image.file;
		});

		const formData = new FormData();
		for (const key in formattedData) {
			formData.append(key, formattedData[key]);
		}

		catchAsync(async () => {
			const res = await updateProperty({id, data: formData}).unwrap();
			if (res?.id) {
				setShowModal(true);
				toast.success('Property Update Complete', {id: toastId});
				setUploadedImages([]);
			} else {
				toast.error('Property Update Failed', {id: toastId});
			}
		});
	};

	useEffect(() => {
		if (!data) return;
		const imageFields = ['image1', 'image2', 'image3', 'image4'];
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

		setDefaultValues({
			...data,
			property_type: {value: data.property_type, label: data.property_type},
			status: {value: data.status, label: data.status},
			features: data.amenities,
			bedrooms: {value: data.bedrooms, label: data.bedrooms},
			bathrooms: {value: data.bathrooms, label: data.bathrooms},
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
				resolver={zodResolver(PropertiesSchema)}
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
									options={type}
									placeholder="Select an option"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBInput
									name="price"
									label="Property TAKA"
									placeholder="Enter Property TAKA"
									type="text"
								/>
							</div>

							<div className="form-group col-md-6">
								<PSBInput
									name="areas"
									label="Property Areas"
									placeholder="Enter Property Areas"
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
							<div className="form-group col-md-12">
								<label>Upload Gallery</label>
								{/* <form
                            action="/upload-target"
                            className="dropzone dz-clickable primary-dropzone"
                          >
                            <div className="position-absolute w-100 h-100 top-0 bottom-0">
                              <input
                                type="file"
                                onChange={handleChange}
                                style={{width: '100%', height: '100%', opacity: '0'}}
                              />
                            </div>
                            {file && (
                              <div className="dz-image">
                                <img
                                  src={file}
                                  alt=""
                                  style={{width: '120px', height: '120px', borderRadius: '15px'}}
                                />
                              </div>
                            )}
                            {!file && (
                              <div className="dz-default dz-message">
                                <i className="fa-solid fa-images"></i>
                                <span>Drag & Drop To Change Logo</span>
                              </div>
                            )}
                          </form> */}
								<ImageUploader
									uploadedImages={uploadedImages}
									setUploadedImages={setUploadedImages}
									maxImages={4}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* <div className="form-submit">
                    <h3>Location</h3>
                    <div className="submit-section">
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label className="mb-2">Address</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="mb-2">City</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="mb-2">State</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="mb-2">Zip Code</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div> */}

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
									options={featureOptions}
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
