import type {Metadata} from 'next';
import './globals.css';
import './assets/css/styles.css';
import './assets/css/colors.css';
import Providers from '@/redux/Providers';
import {Toaster} from 'sonner';
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
			<body className="blue-skin">
				<Providers>
					{children}
					<Toaster closeButton richColors duration={4000} position="top-center" />
				</Providers>
			</body>
		</html>
	);
}
