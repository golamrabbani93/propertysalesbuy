'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';
import {FaBuilding, FaHome, FaSearch, FaUser, FaWhatsapp} from 'react-icons/fa';

const MobileNav = () => {
	const pathname = usePathname();
	// if (pathname.startsWith('/dashboard')) {
	// 	return null; // Do not render MobileNav on dashboard routes
	// }
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
					href="/dashboard"
					className={`${pathname === '/dashboard' ? 'text-primary' : 'text-dark'}`}
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
		</div>
	);
};

export default MobileNav;
