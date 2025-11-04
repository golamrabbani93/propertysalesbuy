'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {navProperty} from '../../data/data';
import Image from 'next/image';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {toast} from 'sonner';
import {clearUser, selectUser} from '@/redux/features/auth/authSlice';
import {removeToken} from '@/services/token/getToken';
import SubmitSelectModal from '../SubmitSelectModal/PropertySuccessModal';

export default function Navbar({transparent}: {transparent: any}) {
	const [windowWidth, setWindowWidth] = useState(0);
	const [toggle, setIsToggle] = useState<boolean>(false);
	let [scroll, setScroll] = useState<boolean>(false);
	const [showModal, setShowModal] = useState(false);
	const user = useAppSelector(selectUser);
	const location = usePathname();
	const current = location;
	const [userMenu, setUserMenu] = useState<boolean>(false);
	const navigate = useRouter();

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

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		if (typeof window !== 'undefined') {
			handleResize(); // Set initial window width
		}

		window.addEventListener('scroll', handlerScroll);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handlerScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, [windowWidth]);
	//form submission handler
	const dispatch = useAppDispatch();

	const userLogout = async () => {
		dispatch(clearUser());
		await removeToken();
		navigate.push('/');
		setUserMenu(!userMenu);
		toast.success('Logged out successfully');
	};
	if (location.startsWith('/dashboard') || location.startsWith('/admin')) {
		return null;
	}

	// handle select submit property or land
	const handleSelectSubmit = () => {
		setShowModal(true);
	};
	return (
		<>
			<div
				className={`d-none d-lg-block header ${scroll ? 'header-fixed' : ''} ${
					transparent ? 'header-transparent dark' : 'header-light head-shadow'
				}`}
			>
				<div className="container">
					<nav
						id="navigation "
						className={
							windowWidth > 991
								? 'navigation navigation-landscape'
								: 'navigation navigation-portrait'
						}
					>
						<div className="nav-header" style={{lineHeight: '0'}}>
							<Link className="nav-brand text-logo" href="/">
								<Image src="/img/logo.svg" width={50} height={50} alt="" />
								<h5 className="fs-3 fw-bold ms-1 my-0 text-uppercase text-primary">
									Propertysalesbuy
								</h5>
							</Link>
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
								<li>
									{user?.id ? (
										<div className="btn-group account-drop  me-4" suppressHydrationWarning={true}>
											<button
												type="button"
												className="btn btn-order-by-filt dropdown-toggle"
												id="showbuttons"
												onClick={() => setUserMenu(!userMenu)}
											>
												<img src={user?.image} className="avater-img" alt="" />
												<span className="d-none d-xl-block">hi, {user?.name} </span>
											</button>
											<div
												className="dropdown-menu pull-right animated flipInX"
												id="showings"
												style={{display: userMenu ? 'block' : 'none'}}
												onClick={() => setUserMenu(false)}
											>
												<Link href={`${user?.role === 'admin' ? '/admin' : '/dashboard'}`}>
													<i className="fa-solid fa-gauge"></i>Dashboard
												</Link>
												<Link
													href={`${user?.role === 'admin' ? '/admin' : '/dashboard'}/my-profile`}
												>
													<i className="fa-solid fa-address-card"></i>My Profile
												</Link>
												<Link
													href={`${user?.role === 'admin' ? '/admin' : '/dashboard'}/my-property`}
												>
													<i className="fa-solid fa-building-circle-check"></i>My Property
												</Link>

												<Link href="#" onClick={() => handleSelectSubmit()}>
													<i className="fa-solid fa-house"></i>Submit Property
												</Link>
												<Link
													href={`${
														user?.role === 'admin' ? '/admin' : '/dashboard'
													}/change-password`}
												>
													<i className="fa-solid fa-unlock"></i>Change Password
												</Link>

												<Link href="#" onClick={userLogout}>
													<i className="fa-solid fa-power-off"></i>Log Out
												</Link>
											</div>
										</div>
									) : (
										<Link
											href="/login"
											data-bs-toggle="modal"
											data-bs-target="#login"
											className="fw-medium text-muted-2"
										>
											<span className="svg-icon svg-icon-2hx me-1">
												<svg
													width="22"
													height="22"
													viewBox="0 0 18 18"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														opacity="0.3"
														d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z"
														fill="currentColor"
													/>
													<path
														d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z"
														fill="currentColor"
													/>
													<rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor" />
												</svg>
											</span>
											Login
										</Link>
									)}
								</li>
								<li className="add-listing">
									<Link href="#" className="bg-primary" onClick={() => handleSelectSubmit()}>
										<Image
											src="/img/svg/login.svg"
											width={18}
											height={18}
											alt=""
											className="me-1"
										/>
										Post & Sell
									</Link>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
			<div className="clearfix"></div>

			<SubmitSelectModal show={showModal} onClose={() => setShowModal(false)} />
		</>
	);
}
