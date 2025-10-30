'use client';

import React from 'react';
import Link from 'next/link';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import PSBForm from '../components/form/PSBForm';
import PSBInput from '../components/form/PSBInput';
import {FieldValues} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from '@/schemas/register.schema';
import {catchAsync} from '@/utils/catchAsync';
import {useUserLoginMutation} from '@/redux/features/auth/authManagementApi';
import {toast} from 'sonner';
import {setToken} from '@/services/token/getToken';
import {useAppDispatch} from '@/redux/hooks';
import {setUser} from '@/redux/features/auth/authSlice';
import {TUser} from '@/types/user.types';
import {useRouter} from 'next/navigation';
export default function Page() {
	const [makeLogin, {isLoading}] = useUserLoginMutation();
	const router = useRouter();
	// Handle form submission
	const dispatch = useAppDispatch();
	// Handle form submission
	const handleSubmit = (data: FieldValues, methods: any) => {
		const toastID = toast.loading('Logging Processing');
		catchAsync(async () => {
			const loginData = {email: data.email, password: data.password};
			const result = await makeLogin(loginData);
			console.log('🚀🚀 ~ handleSubmit ~ result:', result);
			if (result?.error) {
				toast.error('Please Provide Valid User Information', {id: toastID});
			}
			if (result?.data?.id) {
				const token = await setToken(result?.data as TUser);
				// Narrow to FetchBaseQueryError when possible and extract a sensible message
				dispatch(setUser({...result?.data, token}));
				router.push('/dashboard');
				toast.success('User Logged in successfully', {id: toastID});
				methods.reset();
			}
		});
	};
	return (
		<>
			<div className="page-title">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<h2 className="ipt-title">Create An Account</h2>
							<span className="ipn-subtitle">Register On Propertysalesbuy Today</span>
						</div>
					</div>
				</div>
			</div>

			<section className="gray-simple">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-7 col-lg-8 col-md-9">
							<div className="card border-0 rounded-4 p-xl-4 p-lg-4 p-md-4 p-3">
								<div className="simple-form">
									<div className="form-header text-center mb-5">
										<div className="effco-logo mb-2">
											<Link className="d-flex align-items-center justify-content-center" href="/">
												<span className="svg-icon text-primary svg-icon-2hx">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="90"
														zoomAndPan="magnify"
														viewBox="0 0 37.5 37.499999"
														height="90"
														preserveAspectRatio="xMidYMid meet"
														version="1.0"
													>
														<defs>
															<g />
															<clipPath id="90d2711491">
																<path
																	d="M 0 0 L 37.007812 0 L 37.007812 37.007812 L 0 37.007812 Z M 0 0 "
																	clipRule="nonzero"
																/>
															</clipPath>
															<clipPath id="2ff4306197">
																<path
																	d="M 11 4 L 31 4 L 31 37.007812 L 11 37.007812 Z M 11 4 "
																	clipRule="nonzero"
																/>
															</clipPath>
															<clipPath id="72a9c90323">
																<rect x="0" width="20" y="0" height="34" />
															</clipPath>
															<clipPath id="91f2c0fc62">
																<path
																	d="M 4 19.574219 L 27 19.574219 L 27 36 L 4 36 Z M 4 19.574219 "
																	clipRule="nonzero"
																/>
															</clipPath>
															<clipPath id="9095a23c6f">
																<path
																	d="M 6 19.574219 L 33 19.574219 L 33 35 L 6 35 Z M 6 19.574219 "
																	clipRule="nonzero"
																/>
															</clipPath>
															<clipPath id="8ccb8b3028">
																<path
																	d="M 13 19.574219 L 32 19.574219 L 32 31 L 13 31 Z M 13 19.574219 "
																	clipRule="nonzero"
																/>
															</clipPath>
														</defs>
														<g clipPath="url(#90d2711491)">
															<path
																fill="#ffffff"
																d="M 0 0 L 37.007812 0 L 37.007812 37.007812 L 0 37.007812 Z M 0 0 "
																fillOpacity="1"
																fillRule="nonzero"
															/>
															<path
																fill="#ffffff"
																d="M 0 0 L 37.007812 0 L 37.007812 37.007812 L 0 37.007812 Z M 0 0 "
																fillOpacity="1"
																fillRule="nonzero"
															/>
														</g>
														<path
															fill="#64dbff"
															d="M 26.3125 34.414062 C 26.175781 34.484375 26.035156 34.554688 25.894531 34.621094 C 19.171875 37.765625 10.398438 33.160156 6.296875 24.339844 C 2.195312 15.519531 4.324219 5.816406 11.046875 2.671875 C 11.1875 2.605469 11.328125 2.542969 11.472656 2.480469 C 5.078125 5.828125 3.128906 15.308594 7.140625 23.945312 C 11.15625 32.582031 19.648438 37.171875 26.3125 34.414062 Z M 26.3125 34.414062 "
															fillOpacity="1"
															fillRule="nonzero"
														/>
														<path
															fill="#00b7ff"
															d="M 32.550781 23.90625 C 32.054688 28.0625 30.035156 31.5 26.714844 33.050781 C 20.703125 35.863281 12.703125 31.429688 8.855469 23.144531 C 5.003906 14.859375 6.757812 5.863281 12.769531 3.046875 C 16.089844 1.496094 20.011719 2.152344 23.507812 4.441406 C 20.660156 2.933594 17.601562 2.621094 14.96875 3.851562 C 13.714844 4.4375 12.664062 5.324219 11.835938 6.4375 C 11.546875 6.824219 11.28125 7.242188 11.046875 7.6875 C 9.066406 11.398438 9.066406 16.816406 11.445312 21.929688 C 13.824219 27.046875 17.957031 30.53125 22.066406 31.394531 C 22.554688 31.496094 23.046875 31.566406 23.53125 31.589844 C 24.910156 31.667969 26.261719 31.433594 27.515625 30.84375 C 30.148438 29.613281 31.875 27.058594 32.550781 23.90625 Z M 32.550781 23.90625 "
															fillOpacity="1"
															fillRule="nonzero"
														/>
														<path
															fill="#00ade2"
															d="M 29.976562 13.261719 C 33.25 20.308594 31.515625 28.070312 26.105469 30.601562 C 25.960938 30.667969 25.816406 30.730469 25.667969 30.789062 C 30.742188 28.058594 32.296875 20.523438 29.113281 13.667969 C 25.925781 6.808594 19.171875 3.160156 13.824219 5.304688 C 13.964844 5.230469 14.105469 5.160156 14.25 5.089844 C 19.660156 2.558594 26.699219 6.21875 29.976562 13.261719 Z M 29.976562 13.261719 "
															fillOpacity="1"
															fillRule="nonzero"
														/>
														<g clipPath="url(#2ff4306197)">
															<g transform="matrix(1, 0, 0, 1, 11, 4)">
																<g clipPath="url(#72a9c90323)">
																	<g fill="#0256a5" fillOpacity="1">
																		<g transform="translate(0.488989, 25.801696)">
																			<g>
																				<path d="M 0.59375 -16 C 0.59375 -17.21875 0.921875 -18.34375 1.578125 -19.375 C 2.242188 -20.414062 3.132812 -21.253906 4.25 -21.890625 C 5.375 -22.523438 6.640625 -22.84375 8.046875 -22.84375 C 8.867188 -22.84375 9.601562 -22.710938 10.25 -22.453125 C 10.894531 -22.203125 11.476562 -21.898438 12 -21.546875 C 12.519531 -21.203125 13.003906 -20.898438 13.453125 -20.640625 C 13.898438 -20.390625 14.320312 -20.265625 14.71875 -20.265625 C 15.570312 -20.265625 16.117188 -20.476562 16.359375 -20.90625 C 16.609375 -21.34375 16.734375 -21.929688 16.734375 -22.671875 L 17.5 -22.671875 C 17.601562 -21.753906 17.609375 -20.8125 17.515625 -19.84375 C 17.429688 -18.875 17.1875 -17.976562 16.78125 -17.15625 C 16.382812 -16.332031 15.796875 -15.664062 15.015625 -15.15625 C 14.242188 -14.644531 13.234375 -14.390625 11.984375 -14.390625 C 11.160156 -14.390625 10.429688 -14.570312 9.796875 -14.9375 C 9.160156 -15.3125 8.585938 -15.769531 8.078125 -16.3125 C 7.566406 -16.851562 7.101562 -17.40625 6.6875 -17.96875 C 6.28125 -18.539062 5.878906 -19.03125 5.484375 -19.4375 C 5.097656 -19.851562 4.695312 -20.101562 4.28125 -20.1875 C 3.875 -20.28125 3.425781 -20.128906 2.9375 -19.734375 C 2.40625 -19.285156 2.320312 -18.734375 2.6875 -18.078125 C 3.050781 -17.421875 3.820312 -16.753906 5 -16.078125 C 6.1875 -15.398438 7.710938 -14.789062 9.578125 -14.25 C 10.296875 -14.050781 11.140625 -13.769531 12.109375 -13.40625 C 13.078125 -13.039062 14.023438 -12.5625 14.953125 -11.96875 C 15.890625 -11.375 16.671875 -10.65625 17.296875 -9.8125 C 17.921875 -8.96875 18.234375 -7.96875 18.234375 -6.8125 C 18.234375 -5.5625 17.898438 -4.398438 17.234375 -3.328125 C 16.566406 -2.265625 15.664062 -1.40625 14.53125 -0.75 C 13.394531 -0.09375 12.101562 0.234375 10.65625 0.234375 C 9.832031 0.234375 9.070312 0.101562 8.375 -0.15625 C 7.6875 -0.425781 7.050781 -0.726562 6.46875 -1.0625 C 5.894531 -1.394531 5.363281 -1.695312 4.875 -1.96875 C 4.382812 -2.238281 3.925781 -2.375 3.5 -2.375 C 2.675781 -2.375 2.132812 -2.15625 1.875 -1.71875 C 1.625 -1.28125 1.5 -0.695312 1.5 0.03125 L 0.765625 0.03125 C 0.628906 -0.875 0.613281 -1.8125 0.71875 -2.78125 C 0.820312 -3.75 1.070312 -4.644531 1.46875 -5.46875 C 1.863281 -6.300781 2.453125 -6.972656 3.234375 -7.484375 C 4.015625 -7.992188 5.019531 -8.25 6.25 -8.25 C 7.070312 -8.25 7.816406 -8.0625 8.484375 -7.6875 C 9.148438 -7.320312 9.753906 -6.859375 10.296875 -6.296875 C 10.847656 -5.742188 11.351562 -5.179688 11.8125 -4.609375 C 12.28125 -4.046875 12.726562 -3.554688 13.15625 -3.140625 C 13.582031 -2.734375 14.003906 -2.484375 14.421875 -2.390625 C 14.847656 -2.304688 15.296875 -2.46875 15.765625 -2.875 C 16.296875 -3.34375 16.320312 -3.921875 15.84375 -4.609375 C 15.363281 -5.296875 14.492188 -5.992188 13.234375 -6.703125 C 11.984375 -7.421875 10.410156 -8.054688 8.515625 -8.609375 C 7.003906 -9.054688 5.644531 -9.566406 4.4375 -10.140625 C 3.238281 -10.722656 2.296875 -11.476562 1.609375 -12.40625 C 0.929688 -13.332031 0.59375 -14.53125 0.59375 -16 Z M 0.59375 -16 " />
																			</g>
																		</g>
																	</g>
																</g>
															</g>
														</g>
														<g clipPath="url(#91f2c0fc62)">
															<path
																fill="#64dbff"
																d="M 26.3125 34.589844 C 26.175781 34.664062 26.035156 34.734375 25.894531 34.796875 C 19.171875 37.945312 10.398438 33.339844 6.300781 24.519531 C 2.199219 15.695312 4.324219 5.996094 11.046875 2.851562 C 11.1875 2.785156 11.332031 2.722656 11.472656 2.660156 C 5.082031 6.007812 3.128906 15.488281 7.144531 24.125 C 11.15625 32.761719 19.648438 37.351562 26.3125 34.589844 Z M 26.3125 34.589844 "
																fillOpacity="1"
																fillRule="nonzero"
															/>
														</g>
														<g clipPath="url(#9095a23c6f)">
															<path
																fill="#00b7ff"
																d="M 32.550781 24.082031 C 32.050781 28.242188 30.03125 31.675781 26.714844 33.230469 C 20.699219 36.042969 12.707031 31.609375 8.855469 23.324219 C 5.007812 15.039062 6.757812 6.042969 12.773438 3.226562 C 16.089844 1.675781 20.011719 2.332031 23.503906 4.621094 C 20.660156 3.113281 17.601562 2.796875 14.96875 4.03125 C 13.714844 4.617188 12.667969 5.503906 11.839844 6.613281 C 11.546875 7.003906 11.285156 7.421875 11.046875 7.863281 C 9.066406 11.578125 9.070312 16.992188 11.445312 22.109375 C 13.824219 27.226562 17.957031 30.710938 22.066406 31.574219 C 22.554688 31.675781 23.042969 31.742188 23.527344 31.769531 C 24.90625 31.847656 26.257812 31.609375 27.511719 31.023438 C 30.148438 29.792969 31.871094 27.238281 32.550781 24.082031 Z M 32.550781 24.082031 "
																fillOpacity="1"
																fillRule="nonzero"
															/>
														</g>
														<g clipPath="url(#8ccb8b3028)">
															<path
																fill="#00ade2"
																d="M 29.972656 13.441406 C 33.246094 20.488281 31.511719 28.25 26.101562 30.78125 C 25.960938 30.847656 25.8125 30.910156 25.667969 30.96875 C 30.742188 28.238281 32.296875 20.703125 29.109375 13.84375 C 25.921875 6.988281 19.171875 3.339844 13.824219 5.484375 C 13.964844 5.410156 14.105469 5.339844 14.25 5.269531 C 19.660156 2.738281 26.699219 6.398438 29.972656 13.441406 Z M 29.972656 13.441406 "
																fillOpacity="1"
																fillRule="nonzero"
															/>
														</g>
													</svg>
												</span>
											</Link>
										</div>
										<h4 className="fs-2">Login Propertysalesbuy</h4>
									</div>
									<PSBForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
										<div className="form-floating mb-3">
											<PSBInput
												type="email"
												placeholder="Email Address"
												name="email"
												label="Email Address"
											/>
										</div>

										<div className="form-floating mb-3">
											<PSBInput
												type="password"
												placeholder="Password"
												name="password"
												label="Password"
											/>
										</div>

										<div className="form-group mb-3">
											<div className="d-flex align-items-center justify-content-between">
												<div className="flex-shrink-0 flex-first">
													<div className="form-check form-check-inline">
														<input
															className="form-check-input"
															type="checkbox"
															id="save-pass"
															value="option1"
														/>
														<label className="form-check-label" htmlFor="save-pass">
															Save Password
														</label>
													</div>
												</div>
												<div className="flex-shrink-0 flex-first">
													<Link href="#" className="link fw-medium">
														Forgot Password?
													</Link>
												</div>
											</div>
										</div>

										<div className="form-group">
											<button
												type="submit"
												className="btn btn-lg btn-primary fw-medium full-width rounded-2"
											>
												{isLoading ? 'Logging In...' : 'Log In'}
											</button>
										</div>
									</PSBForm>
								</div>
								<div className="text-center">
									<p className="mt-4">
										Have&apos;t Any Account?{' '}
										<Link href="/create-account" className="link fw-medium">
											Acreate An Account
										</Link>
									</p>
								</div>
								{/* <div className="modal-divider">
									<span>Or SignUp via</span>
								</div>
								<div className="social-login mb-3">
									<ul>
										<li>
											<Link href="#" className="btn connect-fb">
												<i className="ti-facebook"></i>Facebook
											</Link>
										</li>
										<li>
											<Link href="#" className="btn connect-google">
												<i className="ti-google"></i>Google+
											</Link>
										</li>
									</ul>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>

			<FooterTop bg="theme-bg" />

			<Footer />

			<ScrollToTop />
		</>
	);
}
