'use client';
import React, {useState} from 'react';

import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import PSBForm from '../components/form/PSBForm';
import {FieldValues} from 'react-hook-form';
import PSBSelect from '../components/form/PSBSelect';
import PSBInput from '../components/form/PSBInput';
import ImageUploader, {IUploadedImage} from '../components/ImageUploader/ImageUploader';
import {zodResolver} from '@hookform/resolvers/zod';
import {PropertiesSchema} from '@/schemas/properties.schema';
import PSBTextArea from '../components/form/PSBTextArea';
import {useAppSelector} from '@/redux/hooks';
import {selectUser} from '@/redux/features/auth/authSlice';
import {useGetMyProfileQuery} from '@/redux/features/user/userManagementApi';

export default function Page() {
	// const [file, setFile] = useState('');
	const [uploadedImages, setUploadedImages] = useState<IUploadedImage[]>([]);
	// function handleChange(e: any) {
	// 	console.log(e.target.files);
	// 	setFile(URL.createObjectURL(e.target.files[0]));
	// }
	const user = useAppSelector(selectUser);
	const {data: userData, isLoading} = useGetMyProfileQuery(user?.id);
	console.log('🚀🚀 ~ Page ~ userData:', userData);
	const status = [
		// {value: '1', label: 'For Rent'},
		{value: 'for sell', label: 'For Sell'},
	];
	const type = [
		{value: 'Apartment', label: 'Apartment'},
		{value: 'Building', label: 'Building'},
		{value: 'Office Space', label: 'Office Space'},
		{value: 'Shop', label: 'Shop'},
		{value: 'Land', label: 'Land'},
	];
	const bedrooms = [
		{label: '1', value: '1'},
		{label: '2', value: '2'},
		{label: '3', value: '3'},
		{label: '4', value: '4'},
		{label: '5', value: '5'},
	];
	const featureOptions = [
		// Bedrooms & Bathrooms
		{label: '1 Bed', value: '1 Bed'},
		{label: '2 Bed', value: '2 Bed'},
		{label: '3 Bed', value: '3 Bed'},
		{label: '4 Bed', value: '4 Bed'},
		{label: '5 Bed', value: '5 Bed'},
		{label: '1 Bath', value: '1 Bath'},
		{label: '2 Bath', value: '2 Bath'},
		{label: '3 Bath', value: '3 Bath'},
		{label: '4 Bath', value: '4 Bath'},
		{label: '5 Bath', value: '5 Bath'},

		// Area & Floors
		{label: '500 Sqft', value: '500 Sqft'},
		{label: '1000 Sqft', value: '1000 Sqft'},
		{label: '1500 Sqft', value: '1500 Sqft'},
		{label: '2000 Sqft', value: '2000 Sqft'},
		{label: '2500 Sqft', value: '2500 Sqft'},
		{label: '2850 Sqft', value: '2850 Sqft'},
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
		console.log('🚀🚀 ~ handleSubmit ~ data:', data);
		const newStatus = data.status?.value;
		const newPropertyType = data.property_type?.value;
		const newBeds = data.bedrooms?.value ? data.bedrooms.value : null;
		const newBaths = data.bathrooms?.value ? data.bathrooms.value : null;
		const other_features = data?.features ? data.features : null;
		const formattedData = {
			...data,
			status: newStatus,
			property_type: newPropertyType,
			bedrooms: newBeds,
			bathrooms: newBaths,
			other_features,
		};

		console.log(formattedData);
	};

	return (
		<>
			<div className="page-title">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<h2 className="ipt-title">Submit Property</h2>
							<span className="ipn-subtitle">Just Submit Your Property</span>
						</div>
					</div>
				</div>
			</div>

			<section className="gray-simple">
				<div className="container">
					<div className="row"></div>

					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div className="submit-page">
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
													required
												/>
												<label htmlFor="aj-1" className="form-check-label">
													I consent to having this website store my submitted information so they
													can respond to my inquiry.
												</label>
											</li>
										</ul>
									</div>
									<div className="form-group col-lg-12 col-md-12">
										<button
											className="btn btn-primary fw-medium px-5"
											type="submit"
											disabled={isLoading}
										>
											Submit & Preview
										</button>
									</div>
								</PSBForm>
							</div>
						</div>
					</div>
				</div>
			</section>

			<FooterTop bg="theme-bg" />
			<Footer />

			<ScrollToTop />
		</>
	);
}
