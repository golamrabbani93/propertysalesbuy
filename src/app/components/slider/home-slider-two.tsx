'use client';
import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import {IProperty} from '@/types/property.types';

var settings = {
	dots: false,
	slidesToShow: 2,
	infinite: true,
	autoplay: true,
	autoplaySpeed: 2000,
	speed: 3000,
	slidesToScroll: 1,
	centerMode: true,
};

export default function HomeSliderTwo({data}: {data: IProperty}) {
	const images = [
		data?.image1,
		data?.image2,
		data?.image3,
		data?.image4,
		data?.image5,
		data?.image6,
	].filter(Boolean) as string[];
	return (
		<div className="featured_slick_gallery gray">
			<div className="featured_slick_gallery-slide home-slider">
				<Slider {...settings}>
					{images.map((img: string, index: number) => (
						<div className="featured_slick_padd" key={index}>
							<a href={img} className="mfp-gallery">
								<img src={img} className="img-fluid mx-auto" alt="" />
							</a>
						</div>
					))}
				</Slider>
			</div>
			{/* <Link href="#" className="btn-view-pic">
				View photos
			</Link> */}
		</div>
	);
}
