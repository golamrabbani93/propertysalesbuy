'use client';

import {selectUser} from '@/redux/features/auth/authSlice';
import {useAppSelector} from '@/redux/hooks';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';
import {FaBuilding, FaEdit, FaHome, FaSearch, FaUser, FaWhatsapp} from 'react-icons/fa';
import {BsBuildingUp} from 'react-icons/bs';
import SubmitSelectModal from '../SubmitSelectModal/PropertySuccessModal';
const MobileNav = () => {
	const pathname = usePathname();
	// if (pathname.startsWith('/dashboard')) {
	// 	return null; // Do not render MobileNav on dashboard routes
	// }
	const user = useAppSelector(selectUser);
	const [showModal, setShowModal] = React.useState<boolean>(false);

	const handleSelectSubmit = () => {
		setShowModal(true);
	};
	return (
		<div
			style={{
				position: 'fixed',
				bottom: 0,
				width: '100%',
				backgroundColor: '#fff',
				boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
				display: 'flex',
				justifyContent: 'space-around',
				padding: '10px 0',
				zIndex: 1000,
			}}
			className="mobile-custom-nav"
		>
			<div style={{textAlign: 'center'}}>
				<Link href="/" className={`${pathname === '/' ? 'text-primary' : 'text-dark'}`}>
					<FaHome size={24} />
					<div style={{fontSize: '12px'}}>Home</div>
				</Link>
			</div>

			<div style={{textAlign: 'center'}}>
				<Link
					href="/properties"
					className={`${pathname === '/properties' ? 'text-primary' : 'text-dark'}`}
				>
					<FaBuilding size={24} />
					<div style={{fontSize: '12px'}}>Properties</div>
				</Link>
			</div>

			<div style={{textAlign: 'center'}}>
				<Link
					href="#"
					className={`${showModal ? 'text-primary' : 'text-dark'}`}
					onClick={() => handleSelectSubmit()}
				>
					<FaEdit size={24} />
					<div style={{fontSize: '12px'}}>Post Property</div>
				</Link>
			</div>
			<div style={{textAlign: 'center'}}>
				<Link
					href={user?.role === 'user' ? `/dashboard` : '/admin'}
					className={`${
						pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
							? 'text-primary'
							: 'text-dark'
					}`}
				>
					<FaUser size={24} />
					<div style={{fontSize: '12px'}}>Dashboard</div>
				</Link>
			</div>
			<div style={{textAlign: 'center'}}>
				<Link
					href="/whatsapp"
					className={`${pathname === '/whatsapp' ? 'text-primary' : 'text-dark'}`}
				>
					<FaWhatsapp size={24} />
					<div style={{fontSize: '12px'}}>WhatsApp</div>
				</Link>
			</div>

			<SubmitSelectModal show={showModal} onClose={() => setShowModal(false)} />
		</div>
	);
};

export default MobileNav;
