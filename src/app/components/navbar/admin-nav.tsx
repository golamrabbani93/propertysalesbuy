'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {clearUser, selectUser} from '@/redux/features/auth/authSlice';
import {removeToken} from '@/services/token/getToken';
import {toast} from 'sonner';
import SubmitSelectModal from '../SubmitSelectModal/PropertySuccessModal';

export default function AdminNav() {
	const [windowWidth, setWindowWidth] = useState(0);
	const [toggle, setIsToggle] = useState<boolean>(false);

	const [userMenu, setUserMenu] = useState<boolean>(false);
	const user = useAppSelector(selectUser);
	const [showModal, setShowModal] = useState<boolean>(false);
	let [scroll, setScroll] = useState<boolean>(false);

	const location = usePathname();
	const current = location;
	const dispatch = useAppDispatch();
	const navigate = useRouter();
	const userLogout = async () => {
		dispatch(clearUser());
		await removeToken();
		navigate.push('/');
		toast.success('Logged out successfully');
	};

	useEffect(() => {
		if (typeof window === 'undefined') return;
		window.scrollTo(0, 0);

		const handlerScroll = () => {
			if (window.scrollY > 50) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};

		if (typeof window !== 'undefined') {
			setWindowWidth(window.innerWidth);
		}
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('scroll', handlerScroll);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handlerScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const handleSubmit = () => {
		setShowModal(true);
	};
	return (
		<>
			<div
				className={`d-none d-lg-block header header-light head-shadow ${
					scroll ? 'header-fixed' : ''
				}`}
			>
				<div className="container">
					<nav
						id="navigation"
						className={
							windowWidth > 991
								? 'navigation navigation-landscape'
								: 'navigation navigation-portrait'
						}
					>
						<div className="nav-header" style={{lineHeight: '0'}}>
							<Link className="nav-brand text-logo" href="/">
								<img src="/img/logo.svg" alt="" />
								<h5 className="fs-3 fw-bold ms-1 my-0 text-uppercase">Propertysalesbuy</h5>
							</Link>
							<div className="nav-toggle" onClick={() => setIsToggle(!toggle)}></div>

							<div className="mobile_nav">
								<ul>
									<li>
										<Link href="/submit-property" className="text-primary">
											<span className="svg-icon svg-icon-2hx">
												<svg
													width="35"
													height="35"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<rect
														opacity="0.3"
														x="2"
														y="2"
														width="20"
														height="20"
														rx="10"
														fill="currentColor"
													/>
													<rect
														x="10.8891"
														y="17.8033"
														width="12"
														height="2"
														rx="1"
														transform="rotate(-90 10.8891 17.8033)"
														fill="currentColor"
													/>
													<rect
														x="6.01041"
														y="10.9247"
														width="12"
														height="2"
														rx="1"
														fill="currentColor"
													/>
												</svg>
											</span>
										</Link>
									</li>
									<li>
										<div className="btn-group account-drop">
											<button
												type="button"
												className="btn btn-order-by-filt dropdown-toggle"
												id="showbuttons"
												onClick={() => setUserMenu(!userMenu)}
											>
												<img src={user?.image} className="avater-img" alt="" />
											</button>
											<div
												className="dropdown-menu pull-right animated flipInX"
												id="showings"
												style={{display: userMenu ? 'block' : 'none'}}
											>
												<Link href="/admin">
													<i className="fa-solid fa-gauge"></i>Dashboard
												</Link>
												<Link href="/admin/my-profile">
													<i className="fa-solid fa-address-card"></i>My Profile
												</Link>
												<Link href="/admin/my-property">
													<i className="fa-solid fa-building-circle-check"></i>My Property
												</Link>
												<Link href="/admin/bookmark-list">
													<i className="fa-solid fa-bookmark"></i>Bookmarked Property
												</Link>
												<Link href="/admin/submit-property-dashboard">
													<i className="fa-solid fa-house"></i>Submit Property
												</Link>
												<Link href="/admin/change-password">
													<i className="fa-solid fa-unlock"></i>Change Passwords
												</Link>
												<Link href="#" onClick={userLogout}>
													<i className="fa-solid fa-power-off"></i>Log Out
												</Link>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div
							className={`nav-menus-wrapper  ${toggle ? 'nav-menus-wrapper-open' : ''}`}
							style={{transitionProperty: toggle ? 'none' : 'left'}}
						>
							<span className="nav-menus-wrapper-close-button" onClick={() => setIsToggle(!toggle)}>
								✕
							</span>
							<ul className="nav-menu">
								<li className={`${['/'].includes(current) ? 'active' : ''}`}>
									<Link href="/">Home</Link>
								</li>

								<li className={` ${['/properties'].includes(current) ? 'active' : ''} `}>
									<Link href="/properties">Properties</Link>
								</li>

								<li className={`${['/about-us'].includes(current) ? 'active' : ''} `}>
									<Link href="/about-us">About Us</Link>
								</li>
								<li className={`${['/contact'].includes(current) ? 'active' : ''} `}>
									<Link href="/contact">Contact</Link>
								</li>
							</ul>

							<ul className="nav-menu nav-menu-social align-to-right d-none d-lg-inline-flex">
								<ul className="nav-menu nav-menu-social align-to-right">
									<li>
										<div className="btn-group account-drop">
											<button
												type="button"
												className="btn btn-order-by-filt dropdown-toggle"
												onClick={() => setUserMenu(!userMenu)}
											>
												<img src={user?.image} className="avater-img" alt="" />
												Hi, {user?.name}
											</button>
											<div
												className="dropdown-menu pull-right animated flipInX"
												id="showing"
												style={{display: userMenu ? 'block' : 'none'}}
												onClick={() => setUserMenu(!userMenu)}
											>
												<Link href="/admin">
													<i className="fa-solid fa-gauge"></i>Dashboard
												</Link>
												<Link href="/admin/my-profile">
													<i className="fa-solid fa-address-card"></i>My Profile
												</Link>
												<Link href="/admin/my-property">
													<i className="fa-solid fa-building-circle-check"></i>My Property
												</Link>

												<Link href="#" onClick={() => handleSubmit()}>
													<i className="fa-solid fa-house"></i>Submit Property
												</Link>
												<Link href="/admin/change-password">
													<i className="fa-solid fa-unlock"></i>Change Password
												</Link>
												<Link href="#" onClick={userLogout} style={{color: 'red'}}>
													<i className="fa-solid fa-power-off"></i>Log Out
												</Link>
											</div>
										</div>
									</li>
								</ul>
							</ul>
						</div>
						<div
							className="nav-overlay-panel"
							style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', display: toggle ? 'block' : 'none'}}
						></div>
					</nav>
				</div>
			</div>
			<div className="clearfix"></div>

			<SubmitSelectModal show={showModal} onClose={() => setShowModal(false)} />
		</>
	);
}
