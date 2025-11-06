'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useGetAllPropertiesQuery} from '@/redux/features/property/propertyManagementApi';
import PSBForm from '../form/PSBForm';
import {FieldValues} from 'react-hook-form';
import PSBInput from '../form/PSBInput';
import PSBTextArea from '../form/PSBTextArea';
import {zodResolver} from '@hookform/resolvers/zod';
import {sendMessageSchema} from '@/schemas/sendMessage.schema';
import {useCreateMessageMutation} from '@/redux/features/sendMessage/sendMessageManagementApi';
import {catchAsync} from '@/utils/catchAsync';
import {toast} from 'sonner';
import {useState} from 'react';
import MessageSuccessModal from '../MessageSuccessModal/MessageSuccessModal';

export default function DetailSidebar({id}: {id?: string}) {
	const [show, setShow] = useState(false);
	const {data: properties} = useGetAllPropertiesQuery(undefined);
	//get latest 3 properties
	const featuredProperties = properties ? [...properties].reverse().slice(0, 3) : [];
	const [createMessage, {isLoading}] = useCreateMessageMutation();

	const sendMessage = (data: FieldValues, method: any) => {
		const modifiedData = {property_id: id, type: 'order', ...data};
		catchAsync(async () => {
			const result = await createMessage(modifiedData).unwrap();
			if (result?.id) {
				toast.success('Message sent successfully');
				setShow(true);
				method.reset();
			} else {
				toast.error('Failed to send message');
			}
		});
		// createMessage(data);
	};
	return (
		<>
			{/* <div className="like_share_wrap b-0">
        <ul className="like_share_list">
            <li><Link href="#" className="btn btn-likes"><i className="fas fa-share"></i>Share</Link></li>
            <li><Link href="#" className="btn btn-likes"><i className="fas fa-heart"></i>Save</Link></li>
        </ul>
    </div> */}

			<div className="details-sidebar">
				<div className="sides-widget">
					<div className="sides-widget-header bg-primary">
						<div className="agent-photo">
							<Image src="/img/logo.svg" width={60} height={60} alt="" />
						</div>
						<div className="sides-widget-details">
							<h4 className="text-uppercase">Propertysalesbuy</h4>
							<span>
								<i className="lni-phone-handset"></i>01792125251
							</span>
						</div>
						<div className="clearfix"></div>
					</div>

					<PSBForm onSubmit={sendMessage} resolver={zodResolver(sendMessageSchema)}>
						<div className="sides-widget-body simple-form">
							<div className="form-group">
								{/* <label>Email</label>
								<input type="text" className="form-control" placeholder="Your Email" /> */}
								<PSBInput name="email" placeholder="Your Email" label="Your Email" type="email" />
							</div>
							<div className="form-group">
								<PSBInput name="phone" placeholder="Your Phone" label="Phone No." type="text" />
							</div>
							<div className="form-group">
								<PSBTextArea
									name="message"
									placeholder="I'm interested in this property."
									label="Message"
								/>
							</div>
							<button className="btn btn-light-primary fw-medium rounded full-width">
								{isLoading ? 'Sending...' : 'Send Message'}
							</button>
						</div>
					</PSBForm>
				</div>
				<MessageSuccessModal show={show} onClose={() => setShow(false)} />
				{/* <div className="sides-widget">
					<div className="sides-widget-header bg-primary">
						<div className="sides-widget-details">
							<h4>Mortgage Calculator</h4>
							<span>View your Interest Rate</span>
						</div>
						<div className="clearfix"></div>
					</div>

					<div className="sides-widget-body simple-form">
						<div className="form-group">
							<div className="input-with-icon">
								<input type="text" className="form-control" placeholder="Sale Price" />
								<i className="fa-solid fa-sack-dollar"></i>
							</div>
						</div>

						<div className="form-group">
							<div className="input-with-icon">
								<input type="text" className="form-control" placeholder="Down Payment" />
								<i className="fa-solid fa-piggy-bank"></i>
							</div>
						</div>

						<div className="form-group">
							<div className="input-with-icon">
								<input type="text" className="form-control" placeholder="Loan Term (Years)" />
								<i className="fa-regular fa-calendar-days"></i>
							</div>
						</div>

						<div className="form-group">
							<div className="input-with-icon">
								<input type="text" className="form-control" placeholder="Interest Rate" />
								<i className="fa fa-percent"></i>
							</div>
						</div>
						<button className="btn btn-light-primary fw-medium rounded full-width">
							Calculate
						</button>
					</div>
				</div> */}

				<div className="sidebar-widgets">
					<h4>Featured Property</h4>

					<div className="sidebar_featured_property">
						{featuredProperties?.map((item: any, index: number) => {
							return (
								<div className="sides_list_property" key={index}>
									<div className="sides_list_property_thumb">
										<Image src={item.image1} width={125} height={75} className="img-fluid" alt="" />
									</div>
									<div className="sides_list_property_detail">
										<h4>
											<Link href={`/properties/${item.id}`}>{item.title}</Link>
										</h4>
										<span>
											<i className="fa-solid fa-location-dot mt-2"></i>
											{item.address}
										</span>
										<div className="lists_property_price">
											<div className="lists_property_types">
												<div className="property_types_vlix sale">For Sell</div>
											</div>
											<div className="lists_property_price_value">
												<h4>৳{item.price}</h4>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
