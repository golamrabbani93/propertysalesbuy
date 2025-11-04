import type {Metadata} from 'next';
import './globals.css';
import './assets/css/styles.css';
import './assets/css/colors.css';
import Providers from '@/redux/Providers';
import {Toaster} from 'sonner';
import MobileNav from './components/navbar/MobileNav';
import Navbar from './components/navbar/navbar';
import React from 'react';
// const Navbar = dynamic(() => import('./components/navbar/navbar'), {ssr: false});
export const metadata: Metadata = {
	title: 'Home - Propertysalesbuy',
	description: 'Bangladesh Flat, House & Apartment Rental Platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="blue-skin position-relative">
				<Providers>
					<Navbar transparent={false} />
					{children}
					<MobileNav />
				</Providers>
				<div
					style={{
						position: 'absolute',
					}}
				>
					<Toaster closeButton richColors duration={4000} position="top-center" />
				</div>
			</body>
		</html>
	);
}
