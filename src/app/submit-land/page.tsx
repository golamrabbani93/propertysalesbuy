import React from 'react';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import SubmitLand from '../components/submit-property/SubmitLand';

export default function Page() {
	return (
		<>
			<div className="page-title">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<h2 className="ipt-title">Sell Land</h2>
							<span className="ipn-subtitle">
								Please fill out the form below to submit your land for sale.
							</span>
						</div>
					</div>
				</div>
			</div>

			<section className="gray-simple">
				<div className="container">
					{/* add links for submit property or submit land */}

					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div className="submit-page">
								<SubmitLand />
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
