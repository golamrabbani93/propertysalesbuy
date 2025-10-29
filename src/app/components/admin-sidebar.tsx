'use client';
import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function AdminSidebar({show, setShow}: {show: any; setShow: any}) {
	const location = usePathname();
	const current = location;
	return (
		<div
			className={`simple-sidebar sm-sidebar ${show ? 'd-block d-md-block' : 'd-none d-md-block'}`}
			id="filter_search"
		>
			<div className="search-sidebar_header">
				<h4 className="ssh_heading">Close Filter</h4>
				<button className="w3-bar-item w3-button w3-large" onClick={() => setShow(!show)}>
					<i className="fa-regular fa-circle-xmark fs-5 text-muted-2"></i>
				</button>
			</div>

			<div className="sidebar-widgets">
				<div className="dashboard-navbar">
					<div className="d-user-avater">
						<img src="/img/team-1.jpg" className="img-fluid avater" alt="" />
						<h4>Adam Harshvardhan</h4>
						<span>Canada USA</span>
					</div>
					<div className="d-navigation">
						<ul>
							<li
								className={current === '/dashboard' ? 'active' : ''}
								onClick={() => setShow(!show)}
							>
								<Link href="/dashboard">
									<i className="fa-solid fa-gauge"></i>Dashboard
								</Link>
							</li>
							<li
								className={current === '/dashboard/my-profile' ? 'active' : ''}
								onClick={() => setShow(!show)}
							>
								<Link href="/dashboard/my-profile">
									<i className="fa-solid fa-address-card"></i>My Profile
								</Link>
							</li>
							<li
								className={current === '/dashboard/bookmark-list' ? 'active' : ''}
								onClick={() => setShow(!show)}
							>
								<Link href="/dashboard/bookmark-list">
									<i className="fa-solid fa-bookmark"></i>Bookmarked Listings
								</Link>
							</li>
							<li
								className={current === '/dashboard/my-property' ? 'active' : ''}
								onClick={() => setShow(!show)}
							>
								<Link href="/dashboard/my-property">
									<i className="fa-solid fa-building-circle-check"></i>My Properties
								</Link>
							</li>
							<li
								className={current === '/dashboard/submit-property-dashboard' ? 'active' : ''}
								onClick={() => setShow(!show)}
							>
								<Link href="/dashboard/submit-property-dashboard">
									<i className="fa-solid fa-house"></i>Submit New Property
								</Link>
							</li>
							<li
								className={current === '/dashboard/change-password' ? 'active' : ''}
								onClick={() => setShow(!show)}
							>
								<Link href="/dashboard/change-password">
									<i className="fa-solid fa-unlock"></i>Change Password
								</Link>
							</li>
							<li className={current === '#' ? 'active' : ''} onClick={() => setShow(!show)}>
								<Link href="#">
									<i className="fa-solid fa-power-off"></i>Log Out
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
