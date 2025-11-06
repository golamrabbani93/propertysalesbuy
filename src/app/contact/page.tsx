'use client';

import Navbar from '../components/navbar/navbar';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import {Metadata} from 'next';
import PSBForm from '../components/form/PSBForm';
import {FieldValues} from 'react-hook-form';
import PSBInput from '../components/form/PSBInput';
import PSBTextArea from '../components/form/PSBTextArea';
import {zodResolver} from '@hookform/resolvers/zod';
import {contactSendMessageSchema} from '@/schemas/sendMessage.schema';
import {useCreateMessageMutation} from '@/redux/features/sendMessage/sendMessageManagementApi';
import {catchAsync} from '@/utils/catchAsync';
import {toast} from 'sonner';
import MessageSuccessModal from '../components/MessageSuccessModal/MessageSuccessModal';
import {useState} from 'react';

// export const metadata: Metadata = {
// 	title: 'Contact Us - Propertysalesbuy',
// 	description: 'Bangladesh Flat, House & Apartment Rental Platform',
// };
export default function Page() {
	const [show, setShow] = useState(false);
	const [createMessage, {isLoading}] = useCreateMessageMutation();
	const sendMessage = (formData: FieldValues, method: any) => {
		const modifiedFormData = {
			type: 'message',
			...formData,
		};
		catchAsync(async () => {
			const result = await createMessage(modifiedFormData).unwrap();
			if (result?.id) {
				toast.success('Message sent successfully');
				setShow(true);
				method.reset();
			} else {
				toast.error('Failed to send message');
			}
		});
	};
	return (
		<>
			<div className="page-title">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<h2 className="ipt-title">Contact Us</h2>
							<span className="ipn-subtitle">Lists of our all Popular agencies</span>
						</div>
					</div>
				</div>
			</div>
			<MessageSuccessModal show={show} onClose={() => setShow(false)} />
			<section>
				<div className="container">
					<div className="row">
						<div className="col-lg-7 col-md-7">
							<PSBForm onSubmit={sendMessage} resolver={zodResolver(contactSendMessageSchema)}>
								<div className="row">
									<div className="col-lg-6 col-md-6">
										<div className="form-group">
											<PSBInput label="Name" name="name" type="text" />
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="form-group">
											<PSBInput label="Email" name="email" type="email" />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-6 col-md-6">
										<div className="form-group">
											<PSBInput label="Subject" name="subject" type="text" />
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="form-group">
											<PSBInput label="Phone" name="phone" type="text" />
										</div>
									</div>
								</div>

								<div className="form-group">
									<PSBTextArea label="Message" name="message" />
								</div>

								<div className="form-group">
									<button className="btn btn-primary px-5 rounded" type="submit">
										{isLoading ? 'Sending...' : 'Send Message'}
									</button>
								</div>
							</PSBForm>
						</div>
						<div className="col-lg-5 col-md-5">
							<div className="contact-info">
								<h2>Get In Touch</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.{' '}
								</p>

								<div className="cn-info-detail mt-4">
									<div className="cn-info-icon">
										<i className="fa-solid fa-house"></i>
									</div>
									<div className="cn-info-content">
										<h4 className="cn-info-title">Reach Us</h4>
										H-17,R-8,Dhanmondi,Dhaka
										{/* <br />
										Eliza Road, Sincher 80 CA,
										<br />
										Canada, USA */}
									</div>
								</div>
								<div className="cn-info-detail">
									<div className="cn-info-icon">
										<i className="fa-solid fa-envelope-circle-check"></i>
									</div>
									<div className="cn-info-content">
										<h4 className="cn-info-title">Drop A Mail</h4>
										hello@Propertysalesbuy
									</div>
								</div>
								<div className="cn-info-detail">
									<div className="cn-info-icon">
										<i className="fa-solid fa-phone-volume"></i>
									</div>
									<div className="cn-info-content">
										<h4 className="cn-info-title">Call Us</h4>
										01792125251
									</div>
								</div>
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
