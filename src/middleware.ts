import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getCurrentUser} from './services/token/getToken';
const publicRoutes = ['/login', '/register'];

const roleBasedRoutes: Record<string, RegExp[]> = {
	user: [/^\/dashboard/],
};

export async function middleware(request: NextRequest) {
	const {pathname} = request.nextUrl;

	const user = await getCurrentUser(); // pass request if needed for cookies
	console.log('🚀🚀 ~ middleware ~ user:', user);

	// 1️⃣ Allow public routes
	if (publicRoutes.some((route) => pathname.startsWith(route))) {
		if (user) {
			// Redirect logged-in users away from /login or /register
			return NextResponse.redirect(new URL('/', request.url));
		}
		return NextResponse.next();
	}

	// 2️⃣ Redirect unauthenticated users to login
	if (!user) {
		return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
	}

	// 3️⃣ Role-based access
	if (user.role && roleBasedRoutes[user.role]) {
		const routes = roleBasedRoutes[user.role];
		if (routes.some((r) => r.test(pathname))) {
			return NextResponse.next(); // allowed
		} else {
			return NextResponse.redirect(new URL('/', request.url)); // not allowed
		}
	}

	// 4️⃣ Default: allow access (or redirect if needed)
	return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
	matcher: ['/dashboard/:path*', '/account/:path*', '/login', '/register', '/submit-property'],
};
