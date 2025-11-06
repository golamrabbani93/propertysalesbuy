'use client';

import {propertyData} from '@/app/data/data';
import Footer from '../footer';
import FooterTop from '../footer-top';
import DetailSidebar from '../property/detail-sidebar';
import PropertyDetail from '../property/property-detail';
import ScrollToTop from '../scroll-to-top';
import HomeSliderTwo from '../slider/home-slider-two';
import {
	useGetPropertyByIdQuery,
	useUpdatePropertyMutation,
} from '@/redux/features/property/propertyManagementApi';
import {useUpdateMyProfileMutation} from '@/redux/features/user/userManagementApi';
import {useEffect, useRef} from 'react';

const SingleProperty = ({id}: {id: string}) => {
	const {data: property} = useGetPropertyByIdQuery(id);
	let data = propertyData.find((item: any) => item.id === parseInt(id));
	const hasUpdatedRef = useRef(false);
	//update view count
	const [updateView] = useUpdatePropertyMutation();
	useEffect(() => {
		const updateViewCount = async () => {
			if (property && !hasUpdatedRef.current) {
				const result = await updateView({
					id: property.id,
					data: {views: property.views + 1, title: property.title},
				});
				hasUpdatedRef.current = true; // mark as updated
			}
		};
		updateViewCount();
	}, [property]);
	return (
		<div>
			<HomeSliderTwo data={property} />

			<section className="gray-simple">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-12 col-sm-12">
							<div className="property_block_wrap style-2 p-4">
								<div className="prt-detail-title-desc">
									<span className="label text-light bg-success text-uppercase">For Sell</span>
									<span className="label text-white bg-primary text-uppercase ms-2">
										{property?.property_type}
									</span>
									<span className="label bg-purple text-white text-capitalize ms-2">
										Views: {property?.views}
									</span>
									<h3 className="mt-3">{property?.title}</h3>
									<span>
										<i className="lni-map-marker"></i> {property?.address}
									</span>
									<h3 className="prt-price-fix text-primary mt-2">৳{property?.price}</h3>
									<div className="list-fx-features">
										{property?.property_type !== 'land' ? (
											<>
												<div className="listing-card-info-icon">
													<div className="inc-fleat-icon me-1">
														<img src="/img/bed.svg" width="13" alt="" />
													</div>
													{property?.bedrooms} Beds
												</div>
												<div className="listing-card-info-icon">
													<div className="inc-fleat-icon me-1">
														<img src="/img/bathtub.svg" width="13" alt="" />
													</div>
													{property?.bathrooms} Bath
												</div>
												<div className="listing-card-info-icon">
													<div className="inc-fleat-icon me-1">
														<img src="/img/move.svg" width="13" alt="" />
													</div>
													{property?.areas}
												</div>
											</>
										) : (
											<div className="d-flex align-content-center">
												<div className="listing-card d-flex align-items-center">
													<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
														<i className="fa-solid fa-mountain fs-xs"></i>
													</div>
													<span className="text-muted-2 fs-sm text-capitalize">
														{property?.soil_type}
													</span>
												</div>
												<div className="listing-card d-flex align-items-center ms-2">
													<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
														<i className="fa-solid fa-shapes fs-xs"></i>
													</div>
													<span className="text-muted-2 fs-sm text-capitalize">
														{property?.land_shape}
													</span>
												</div>
												<div className="listing-card d-flex align-items-center ms-2">
													<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
														<i className="fa-solid fa-clone fs-xs"></i>
													</div>
													<span className="text-muted-2 fs-sm">{property?.areas}</span>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
							<PropertyDetail data={property} />
						</div>

						<div className="col-lg-4 col-md-12 col-sm-12">
							<DetailSidebar id={id} />
						</div>
					</div>
				</div>
			</section>

			<FooterTop bg="theme-bg" />
			<Footer />

			<ScrollToTop />
		</div>
	);
};

export default SingleProperty;
