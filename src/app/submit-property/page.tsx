import React from 'react';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import SubmitProperty from '../components/submit-property/SubmitProperty';

export default function Page() {
	return (
		<>
			<div className="page-title">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<h2 className="ipt-title">Sell Apartment</h2>
							<span className="ipn-subtitle">
								Please fill out the form below to submit your apartment for sale.
							</span>
						</div>
					</div>
				</div>
			</div>

			<section className="gray-simple">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div className="submit-page">
								<SubmitProperty />
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
