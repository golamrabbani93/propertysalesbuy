'use client';
import React from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {clearUser, selectUser} from '@/redux/features/auth/authSlice';
import {removeToken} from '@/services/token/getToken';
import {toast} from 'sonner';
import SubmitSelectModal from './SubmitSelectModal/PropertySuccessModal';

export default function AdminSidebar({show, setShow}: {show: any; setShow: any}) {
	const dispatch = useAppDispatch();
	const navigate = useRouter();
	const user = useAppSelector(selectUser);
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const userLogout = async () => {
		dispatch(clearUser());
		await removeToken();
		navigate.push('/');
		toast.success('Logged out successfully');
	};
	const handleSelectSubmit = () => {
		setShowModal(true);
		setShow(!show);
	};
	const location = usePathname();
	const current = location;
	return (
		<>
			<div
				className={`simple-sidebar sm-sidebar ${show ? 'd-block' : 'd-none'}  d-lg-block`}
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
							<img src={user?.image} className="img-fluid avater" alt="" />
							<h4>{user?.name || ''}</h4>
							{/* <span>Canada USA</span> */}
						</div>
						<div className="d-navigation">
							<ul>
								<li className={current === '/admin' ? 'active' : ''} onClick={() => setShow(!show)}>
									<Link href="/admin">
										<i className="fa-solid fa-gauge"></i>Dashboard
									</Link>
								</li>
								<li
									className={current === '/admin/my-profile' ? 'active' : ''}
									onClick={() => setShow(!show)}
								>
									<Link href="/admin/my-profile">
										<i className="fa-solid fa-address-card"></i>My Profile
									</Link>
								</li>

								<li
									className={current === '/admin/all-properties' ? 'active' : ''}
									onClick={() => setShow(!show)}
								>
									<Link href="/admin/all-properties">
										<i className="fa-solid fa-building-circle-check"></i>All Properties
									</Link>
								</li>
								<li
									className={current === '/admin/property-inquiry' ? 'active' : ''}
									onClick={() => setShow(!show)}
								>
									<Link href="/admin/property-inquiry">
										<i className="fa-solid fa-building-user"></i>Properties Inquiry
									</Link>
								</li>
								<li
									className={current === '/admin/my-property' ? 'active' : ''}
									onClick={() => setShow(!show)}
								>
									<Link href="/admin/my-property">
										<i className="fa-solid fa-building"></i>My Properties
									</Link>
								</li>
								<li
									className={current === '/admin/submit-property-dashboard' ? 'active' : ''}
									onClick={() => setShow(!show)}
								>
									<Link href="#" onClick={() => handleSelectSubmit()}>
										<i className="fa-solid fa-house"></i>Submit New Property
									</Link>
								</li>
								<li
									className={current === '/admin/messages' ? 'active' : ''}
									onClick={() => setShow(!show)}
								>
									<Link href="/admin/messages">
										<i className="fa-solid fa-message"></i>User Messages
									</Link>
								</li>
								<li
									className={current === '/admin/change-password' ? 'active' : ''}
									onClick={() => setShow(!show)}
								>
									<Link href="/admin/change-password">
										<i className="fa-solid fa-unlock"></i>Change Password
									</Link>
								</li>
								<li
									className={current === '#' ? 'active' : ''}
									onClick={() => {
										userLogout();
									}}
								>
									<Link href="#" style={{color: 'red'}} target="_self">
										<i className="fa-solid fa-power-off"></i>Log Out
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<SubmitSelectModal show={showModal} onClose={() => setShowModal(false)} />
		</>
	);
}
