import React from 'react';
import Image from 'next/image';

import Navbar from '../components/navbar/navbar';
import TeamSliderTwo from '../components/team-slider-two';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import {Metadata} from 'next';
export const metadata: Metadata = {
	title: 'About Us - Propertysalesbuy',
	description: 'Bangladesh Flat, House & Apartment Rental Platform',
};
export default function Page() {
	const data = [
		{
			icon: 'fa-solid fa-unlock-keyhole text-primary',
			title: 'Fully Secure & 24x7 Dedicated Support',
			desc: 'If you are an individual client, or just a business startup looking for good backlinks for your website.',
		},
		{
			icon: 'fa-brands fa-twitter text-primary',
			title: 'Manage your Social & Busness Account Carefully',
			desc: 'If you are an individual client, or just a business startup looking for good backlinks for your website.',
		},
		{
			icon: 'fa-solid fa-layer-group text-primary',
			title: 'We are Very Hard Worker and loving',
			desc: 'If you are an individual client, or just a business startup looking for good backlinks for your website.',
		},
	];

	return (
		<>
			<div className="page-title">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<h2 className="ipt-title">About Us</h2>
							<span className="ipn-subtitle">Who we are & our mission</span>
						</div>
					</div>
				</div>
			</div>

			<section>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-6">
							<Image
								src="/img/sb.png"
								width={0}
								height={0}
								sizes="100vw"
								style={{width: '100%', height: 'auto'}}
								className="img-fluid"
								alt=""
							/>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="story-wrap explore-content">
								<h2>Our Story</h2>
								At Propertysalesbuy, our journey began with a vision — to redefine the real estate
								experience in Bangladesh by bringing trust, transparency, and modern living together
								under one name. What started as a small initiative to connect families with their
								dream homes has grown into a trusted platform for buying, selling, and renting
								properties.
								<br />
								<br />
								We believe that a property is more than just bricks and walls; it’s about building
								dreams, creating memories, and ensuring a lifestyle filled with comfort and
								security. Over the years, we’ve helped countless families, investors, and
								professionals find not only a place to stay but also a place to belong.
								<br />
								<br />
								With a dedicated team, a customer-first approach, and a deep understanding of the
								market, Propertysalesbuy continues to create opportunities for people to live
								better, smarter, and happier lives.
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="gray-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div className="sec-heading center">
								<h2>Meet Our Team</h2>
								<p>Professional & Dedicated Team</p>
							</div>
						</div>
					</div>
					<TeamSliderTwo />
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div className="sec-heading center">
								<h2>Our Mission & Work Process</h2>
								<p>Professional & Dedicated Team</p>
							</div>
						</div>
					</div>
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-6">
							{data.map((item: any, index: number) => {
								return (
									<div className="icon-mi-left" key={index}>
										<i className={item.icon}></i>
										<div className="icon-mi-left-content">
											<h4>{item.title}</h4>
											<p>{item.desc}</p>
										</div>
									</div>
								);
							})}
						</div>
						<div className="col-lg-6 col-md-6">
							<img src="/img/vec-2.png" className="img-fluid" alt="" />
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
