import React from 'react';
import Link from 'next/link';

import {propertyData} from '../data/data';
import Image from 'next/image';
import {IProperty} from '@/types/property.types';

export default function SellPropertyOne({
	propertyState,
	border,
}: {
	propertyState: IProperty[];
	border: any;
}) {
	const landProperties = propertyState.filter(
		(prop) => prop.property_type === 'land' && prop.published,
	);
	return (
		<div className="row list-layout">
			{landProperties.slice(0, 4).map((item: IProperty, index: number) => {
				return (
					<div className="col-xl-6 col-lg-6 col-md-12" key={index}>
						<div
							className={`property-listing property-1 bg-white p-2 rounded ${
								border ? 'border' : 'border-0'
							}`}
						>
							<div className="listing-img-wrapper">
								<Link href={`/properties/${item.id}`}>
									<Image
										src={item.image1 || '/img/properties/img-1.jpg'}
										width={0}
										height={0}
										sizes="100vw"
										style={{width: '100%', height: '210px'}}
										className="img-fluid mx-auto rounded"
										alt=""
										key={index}
									/>
								</Link>
							</div>
							<div className="listing-content">
								<div className="listing-detail-wrapper-box">
									<div className="listing-detail-wrapper d-flex align-items-center justify-content-between">
										<div className="listing-short-detail">
											<div className="d-flex align-items-center">
												{/* <span
													className={`label ${
														item.tag2 === 'For Rent' ? 'bg-light-success text-success' : ''
													} ${
														item.tag2 === 'For Sell' ? 'bg-light-danger text-danger' : ''
													} d-inline-flex mb-1`}
												>
													{item.tag2}
												</span> */}
												<span
													className={`label bg-light-purple text-purple d-inline-flex mb-1 text-capitalize`}
												>
													{item.property_type}
												</span>
											</div>
											<h4 className="listing-name mb-1 mt-2">
												<Link href={`/properties/${item.id}`}>{item.title}</Link>
											</h4>
											{/* <div className="fr-can-rating">
												<i className="fas fa-star fs-xs filled" style={{margin: '0 2px'}}></i>
												<i className="fas fa-star fs-xs filled" style={{margin: '0 2px'}}></i>
												<i className="fas fa-star fs-xs filled" style={{margin: '0 2px'}}></i>
												<i className="fas fa-star fs-xs filled" style={{margin: '0 2px'}}></i>
												<i className="fas fa-star fs-xs" style={{margin: '0 2px'}}></i>
												<span className="reviews_text fs-sm text-muted ms-2">(42 Reviews)</span>
											</div> */}
										</div>
										<div className="list-price">
											<h6 className="listing-card-info-price text-primary">৳{item.price}</h6>
										</div>
									</div>
								</div>

								<div className="price-features-wrapper">
									<div className="list-fx-features d-flex align-items-center justify-content-between mt-3 mb-1">
										<div className="listing-card d-flex align-items-center">
											<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
												<i className="fa-solid fa-mountain fs-xs"></i>
											</div>
											<span className="text-muted-2 fs-sm text-capitalize">{item.soil_type}</span>
										</div>
										<div className="listing-card d-flex align-items-center">
											<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
												<i className="fa-solid fa-shapes fs-xs"></i>
											</div>
											<span className="text-muted-2 fs-sm text-capitalize">{item.land_shape}</span>
										</div>
										<div className="listing-card d-flex align-items-center">
											<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
												<i className="fa-solid fa-clone fs-xs"></i>
											</div>
											<span className="text-muted-2 fs-sm">{item.areas}</span>
										</div>
									</div>
								</div>

								<div className="listing-footer-wrapper">
									<div className="listing-locate">
										<span className="listing-location text-muted-2">
											<i className="fa-solid fa-location-pin me-1"></i>
											{item.address}
										</span>
									</div>
									<div className="listing-detail-btn">
										<Link
											href={`/properties/${item.id}`}
											className="btn btn-sm px-4 fw-medium btn-primary"
										>
											View
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
