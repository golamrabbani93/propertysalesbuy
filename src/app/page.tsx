import React from 'react';
import Link from 'next/link';
import FormThree from './components/form/form-three';
import Achievement from './components/achievement';
import PropertySlider from './components/property-slider';
import SellPropertyOne from './components/sell-property-one';
import TeamOne from './components/team-one';
import ClientOne from './components/client-one';
import PricingOne from './components/pricing-one';
import AppDownload from './components/app-download';
import FooterTop from './components/footer-top';
import FooterLight from './components/footer-light';
import ScrollToTop from './components/scroll-to-top';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer';
import {Metadata} from 'next';
export const metadata: Metadata = {
	title: 'Home - AK Property',
	description: 'Bangladesh Flat, House & Apartment Rental Platform',
};
export default function Page() {
	return (
		<>
			<Navbar transparent={false} />

			<div
				className="image-bottom hero-banner bg-primary"
				style={{backgroundImage: `url('/img/banner.svg')`, backgroundRepeat: 'no-repeat'}}
				data-overlay="0"
			>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-9 col-md-11 col-sm-12">
							<div className="inner-banner-text text-center mb-2">
								<h2 className="mb-4">
									<span className="font-normal">Find Your</span> Perfect Place.
								</h2>
								<p className="fs-5 fw-light px-xl-4 px-lg-4">
									AK Property is a trusted name in opportunity, where buying is simple, and selling
									is powerful, and shortening is bold. Every trade inspires clarity and confidence:
									Buy, Sell, Short.
								</p>
							</div>
							<FormThree />
						</div>
					</div>
				</div>
			</div>

			<section>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-7 col-md-10 text-center">
							<div className="sec-heading center mb-4">
								<h2>Achievement</h2>
								<p>
									Every milestone reflects dedication and skill. From small wins to major successes,
									achievements inspire confidence and drive progress.
								</p>
							</div>
						</div>
					</div>
					<Achievement />
				</div>
			</section>

			<div className="clearfix"></div>

			<section className="pt-0">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-7 col-md-10 text-center">
							<div className="sec-heading center">
								<h2>Recent Property For Rent</h2>
								<p>
									Explore the latest rental properties—modern, convenient, and ready to move in.
									Find your perfect space with ease and confidence.
								</p>
							</div>
						</div>
					</div>
					<PropertySlider />
				</div>
			</section>

			<section className="bg-light">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-7 col-md-10 text-center">
							<div className="sec-heading center">
								<h2>Featured Property For Sale</h2>
								<p>
									Discover the latest properties for sale—premium, ready to own, and full of
									potential. Find your dream home with confidence.
								</p>
							</div>
						</div>
					</div>
					<SellPropertyOne border={false} />
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 text-center mt-4">
							<Link href="/properties" className="btn btn-primary px-lg-5 rounded">
								Browse More Properties
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* <section>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-7 col-md-10 text-center">
							<div className="sec-heading center">
								<h2>Explore Featured Agents</h2>
								<p>
									At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
									praesentium voluptatum deleniti atque corrupti quos dolores
								</p>
							</div>
						</div>
					</div>
					<TeamOne />
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
							<Link href="/listings-list-with-sidebar" className="btn btn-primary px-lg-5 rounded">
								Explore More Agents
							</Link>
						</div>
					</div>
				</div>
			</section> */}
			<div className="clearfix"></div>

			<section className="gray-bg">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-7 col-md-10 text-center">
							<div className="sec-heading center">
								<h2>Good Reviews by Customers</h2>
								<p>
									Hear from our satisfied clients—real experiences, honest feedback, and stories
									that reflect trust, quality, and excellence.
								</p>
							</div>
						</div>
					</div>
					<ClientOne />
				</div>
			</section>

			{/* <section>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-7 col-md-10 text-center">
							<div className="sec-heading center">
								<h2>See our packages</h2>
								<p>
									At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
									praesentium voluptatum deleniti atque corrupti quos dolores
								</p>
							</div>
						</div>
					</div>
					<PricingOne />
				</div>
			</section> */}

			<AppDownload />

			<FooterTop bg="bg-primary" />

			<Footer />

			<ScrollToTop />
		</>
	);
}
