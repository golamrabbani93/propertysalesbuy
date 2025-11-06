'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const TinySlider = dynamic(() => import('tiny-slider-react'), {ssr: false});
import '../../../../node_modules/tiny-slider/dist/tiny-slider.css';

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

export default function GridProperty({item, border}: {item: any; border: any}) {
	// get image1 to image 6 and make array

	const images = [
		item?.image1,
		item?.image2,
		item?.image3,
		item?.image4,
		item?.image5,
		item?.image6,
	].filter(Boolean);

	return (
		<div className={`property-listing card rounded-3 ${border ? 'border' : 'border-0'}`}>
			<div className={`listing-img-wrapper p-3 `}>
				<div className="list-img-slide position-relative">
					<div className="position-absolute top-0 left-0 ms-3 mt-3 z-1">
						<div
							className={`label text-light d-inline-flex align-items-center justify-content-center mx-1
									bg-success `}
						>
							<img src="/img/svg/verified.svg" alt="" className="me-1" /> Verified
						</div>
					</div>
					<div className="click rounded-3 overflow-hidden mb-0">
						<TinySlider settings={settings}>
							{images?.map((el: string, index: number) => {
								return (
									<div key={index}>
										<Link href={`/properties/${item.id}`}>
											<Image
												src={el}
												width={0}
												height={0}
												sizes="100vw"
												style={{width: '100%', height: 'auto'}}
												className="img-fluid"
												alt=""
											/>
										</Link>
									</div>
								);
							})}
						</TinySlider>
					</div>
				</div>
			</div>

			<div className="listing-caption-wrapper px-3">
				<div className="listing-detail-wrapper">
					<div className="listing-short-detail-wrap">
						<div className="listing-short-detail">
							<div className="d-flex align-items-center">
								<span className="label bg-light-danger text-danger prt-type me-2">For Sell</span>

								<span className="label bg-light-purple text-purple property-cats text-capitalize">
									{item?.property_type}
								</span>
							</div>
							<h4 className="listing-name fw-semibold fs-5 mb-2 mt-3">
								<Link href={`/properties/${item.id}`}>{item.title}</Link>
							</h4>
							<div className="prt-location text-muted-2 d-flex">
								<img src="/img/svg/map-1.svg" alt="" />
								{item?.address}
							</div>
						</div>
					</div>
				</div>

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

				<div className="listing-detail-footer d-flex align-items-center justify-content-between py-4">
					<div className="listing-short-detail-flex">
						<h6 className="listing-card-info-price m-0">৳{item?.price}</h6>
					</div>
					<div className="footer-flex">
						<Link href={`/properties/${item.id}`} className="prt-view">
							<img src="/img/svg/send.svg" alt="" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
