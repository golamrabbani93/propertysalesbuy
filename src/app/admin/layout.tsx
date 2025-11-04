'use client';
import React, {useState} from 'react';
import Link from 'next/link';

import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import AdminSidebar from '../components/admin-sidebar';
import AdminNav from '../components/navbar/admin-nav';

export default function Page({children}: {children: React.ReactNode}) {
	let [show, setShow] = useState<boolean>(false);
	return (
		<>
			<AdminNav />

			<div className="bg-light dashboard-padding">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div className="filter_search_opt">
								<Link
									href="#"
									className="btn btn-dark full-width mb-4"
									onClick={() => setShow(!show)}
								>
									Dashboard Navigation<i className="fa-solid fa-bars ms-2"></i>
								</Link>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 col-md-12">
							<AdminSidebar show={show} setShow={setShow} />
						</div>

						<div className="col-lg-9 col-md-12">{children}</div>
					</div>
				</div>
			</div>

			<FooterTop bg="theme-bg" />

			<Footer />

			<ScrollToTop />
		</>
	);
}
