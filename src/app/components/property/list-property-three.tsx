'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const TinySlider = dynamic(() => import('tiny-slider-react'), {ssr: false});
import '../../../../node_modules/tiny-slider/dist/tiny-slider.css';
import {IProperty} from '@/types/property.types';

const settings = {
	items: 1,
	controls: false,
	mouseDrag: true,
	loop: true,
	rewind: true,
	autoplay: true,
	autoplayButtonOutput: false,
	autoplayTimeout: 3000,
	navPosition: 'bottom',
	nav: true,
	speed: 400,
	gutter: 0,
};

export default function ListPropertyThree({item}: {item: IProperty}) {
	let [open, setOpen] = useState<boolean>(false);
	const images = [
		item?.image1,
		item?.image2,
		item?.image3,
		item?.image4,
		item?.image5,
		item?.image6,
	].filter(Boolean);
	return (
		<>
			<div className="property-listing list_view style_new">
				<div className="listing-img-wrapper position-relative">
					<div className="like_unlike_prt">
						<label className="toggler toggler-danger">
							<input type="checkbox" />
							<i className="fa fa-heart"></i>
						</label>
					</div>
					<div className="position-absolute top-0 left-0 ms-3 mt-3 z-1">
						<div
							className={`label text-light d-inline-flex align-items-center justify-content-center mx-1 bg-success `}
						>
							<img src="/img/svg/verified.svg" alt="" className="me-1" />
							Verified
						</div>
					</div>
					<div className="list-img-slide">
						<div className="clior">
							<TinySlider settings={settings}>
								{images.map((el: any, index: number) => {
									return (
										<div key={index}>
											<Link href={`/properties/${item.id}`}>
												<img src={el} className="img-fluid mx-auto" alt="" />
											</Link>
										</div>
									);
								})}
							</TinySlider>
						</div>
					</div>
				</div>

				<div className="list_view_flex">
					<div className="listing-detail-wrapper mt-1">
						<div className="listing-short-detail-wrap">
							<div className="_card_list_flex mb-2">
								<div className="_card_flex_01 d-flex align-items-center">
									<span className="label bg-light-danger text-danger me-2">For Sell</span>

									<span className="label bg-light-purple text-purple text-capitalize">
										{item.property_type}
									</span>
								</div>
								<div className="_card_flex_last">
									<h6 className="listing-info-price text-primary fs-4 mb-0">৳{item.price}</h6>
								</div>
							</div>
							<div className="_card_list_flex">
								<div className="_card_flex_01">
									<h4 className="listing-name mt-3">
										<Link href={`/properties/${item.id}`} className="prt-link-detail">
											{item.title}
										</Link>
									</h4>
								</div>
							</div>
						</div>
					</div>

					{item.property_type === 'land' ? (
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
					) : (
						<div className="price-features-wrapper">
							<div className="list-fx-features d-flex align-items-center justify-content-between">
								<div className="listing-card d-flex align-items-center">
									<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
										<i className="fa-solid fa-building-shield fs-xs"></i>
									</div>
									<span className="text-muted-2 fs-sm">4 BHK</span>
								</div>
								<div className="listing-card d-flex align-items-center">
									<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
										<i className="fa-solid fa-bed fs-xs"></i>
									</div>
									<span className="text-muted-2 fs-sm">{item?.bedrooms} beds</span>
								</div>
								<div className="listing-card d-flex align-items-center">
									<div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
										<i className="fa-solid fa-clone fs-xs"></i>
									</div>
									<span className="text-muted-2 fs-sm">{item?.areas}</span>
								</div>
							</div>
						</div>
					)}
					<div className="listing-detail-footer pl-0">
						<div className="footer-first">
							<Link
								href={`/properties/${item.id}`}
								className="btn btn-md btn-primary fw-medium me-1"
							>
								View Details
							</Link>

							{/* <Link href="#" className="btn btn-md btn-light-primary px-3 me-1" onClick={()=>setOpen}>
								<span className="svg-icon svg-icon-muted svg-icon-2hx">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											opacity="0.3"
											d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
											fill="currentColor"
										/>
										<path
											d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
											fill="currentColor"
										/>
									</svg>
								</span>
							</Link> */}
						</div>
					</div>
				</div>
			</div>
			{open && (
				<div className="modal fade show" style={{display: 'block', backgroundColor: '#0000008a'}}>
					<div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
						<div className="modal-content" id="sign-up">
							<span className="mod-close" onClick={() => setOpen(!open)}>
								<i className="fa-solid fa-circle-xmark text-muted-2 fs-5"></i>
							</span>
							<div className="modal-body">
								<div className="text-center">
									<h2 className="mb-0">CONTACT</h2>
									<h4 className="mb-0">5689 Resot Relly, Canada</h4>
									<a className="_calss_tyui theme-cl" href="tel:4048651904">
										(404) 865-1904
									</a>
								</div>
								<div className="login-form">
									<form>
										<div className="row">
											<div className="col-lg-12 col-md-12">
												<div className="form-group">
													<label>Message</label>
													<textarea className="form-control ht-120">
														I'm interested in 5689 Resot Relly, Canada. Please send me current
														availability and additional details.
													</textarea>
												</div>
											</div>
											<div className="col-lg-12 col-md-12">
												<div className="form-group">
													<label>Name*</label>
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="col-lg-12 col-md-12">
												<div className="form-group">
													<label>Email*</label>
													<input type="email" className="form-control" />
												</div>
											</div>
											<div className="col-lg-12 col-md-12">
												<div className="form-group">
													<label>Phone</label>
													<input type="text" className="form-control" />
												</div>
											</div>
										</div>
										<div className="default-terms_wrap">
											<div className="default-terms_flex">
												<input id="tm" className="form-check-input" name="tm" type="checkbox" />
												<label htmlFor="tm" className="form-check-label"></label>
											</div>
											<div className="default-terms">
												By submitting this form, you agree to our{' '}
												<Link href="#" title="Terms of Service">
													Terms of Service
												</Link>{' '}
												and{' '}
												<Link href="#" title="Privacy Policy">
													Privacy Policy
												</Link>
												.
											</div>
										</div>
										<div className="form-group mt-3">
											<button type="submit" className="btn btn-primary full-width fw-medium">
												Send Message
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
