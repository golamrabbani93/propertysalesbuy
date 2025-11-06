import React from 'react';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import ListThree from '../components/property/list-three';
import {Metadata} from 'next';
import {prefetchProperties} from '@/services/server/serverPrefetch';
import {IProperty} from '@/types/property.types';
export const metadata: Metadata = {
	title: 'Properties - Propertysalesbuy',
	description: 'Bangladesh Flat, House & Apartment Rental Platform',
};
export default async function Page() {
	const property = await prefetchProperties();
	const propertyState = (property?.baseApi?.queries?.['getAllProperties("")']?.data ??
		[]) as IProperty[];

	return (
		<>
			<div className="page-title">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<h2 className="ipt-title">Properties</h2>
							<span className="ipn-subtitle">Discover Your Dream Property</span>
						</div>
					</div>
				</div>
			</div>

			<section className="gray-simple">
				<ListThree propertyState={propertyState} />
			</section>

			<FooterTop bg="theme-bg" />

			<Footer />

			<ScrollToTop />
		</>
	);
}
