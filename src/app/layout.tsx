import type {Metadata} from 'next';
import './globals.css';
import './assets/css/styles.css';
import './assets/css/colors.css';
import Providers from '@/redux/Providers';

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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
