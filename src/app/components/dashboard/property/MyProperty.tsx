import {IProperty} from '@/types/property.types';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import DeleteModal from '../modal/delete-modal/DeleteModal';
import {
	useDeletePropertyMutation,
	useUpdatePropertyMutation,
} from '@/redux/features/property/propertyManagementApi';
import {catchAsync} from '@/utils/catchAsync';
import {toast} from 'sonner';
import {useAppSelector} from '@/redux/hooks';
import {selectUser} from '@/redux/features/auth/authSlice';

const MyProperty = ({item}: {item: IProperty}) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteProperty, {isLoading}] = useDeletePropertyMutation();
	const [updatePropertyStatus] = useUpdatePropertyMutation();
	const user = useAppSelector(selectUser);
	const handleDelete = async () => {
		catchAsync(async () => {
			const res = await deleteProperty(item.id);
			if (res) {
				toast.success('Property Delete SuccessFully');
				setShowDeleteModal(false);
			} else {
				toast.error('Property Delete Failed');
			}
		});
	};

	const handleMakePublished = async (data: string) => {
		const toastId = toast.loading('Updating Property Status...');
		const formatedData = {
			title: item.title,
			published: data === 'publish' ? true : false,
		};
		catchAsync(async () => {
			// Assuming there's an API call to update the property status
			const res = await updatePropertyStatus({id: item.id, data: formatedData});
			if (res) {
				toast.success(`Property marked as ${data} successfully`, {id: toastId});
			} else {
				toast.error('Failed to Update Property Status', {id: toastId});
			}
		});
	};

	return (
		<div className="col-md-12 col-sm-12 col-md-12">
			<div className="singles-dashboard-list ">
				<div className="sd-list-left d-block d-md-block ">
					<Image
						src={item.image1 || '/assets/img/p1.jpg'}
						width={0}
						height={0}
						sizes="100vw"
						style={{width: '100%', height: 'auto'}}
						className="img-fluid"
						alt=""
					/>
				</div>
				<div className="sd-list-right bg-white">
					<h4 className="listing_dashboard_title">
						<Link href={`/dashboard/my-property/${item.id}`} className="text-primary">
							{item.title}
						</Link>
					</h4>
					<div className="user_dashboard_listed">Price: from ৳ {item.price}</div>
					<div className="user_dashboard_listed">
						Property Type: <span className="text-primary fw-bolder">{item.property_type}</span>
					</div>
					<div className="user_dashboard_listed">
						Post Status:{' '}
						<span className="text-primary">
							{item.published ? (
								<span className="text-success fw-bolder">Published</span>
							) : (
								<span className="text-danger fw-bolder">Unpublished</span>
							)}
						</span>
						<div className="user_dashboard_listed">
							Address:{' '}
							<span className="text-primary">
								{item.address?.length > 30 ? (
									<>
										{item.address.slice(0, 30)}
										<br />
										{item.address.slice(30)}
									</>
								) : (
									item.address
								)}
							</span>
						</div>
						<div className="action">
							{user?.role === 'admin' &&
								(item.published ? (
									<Link
										href="#"
										className="me-2"
										onClick={() => handleMakePublished('unpublish')}
										title="Unpublish"
										target="_self"
									>
										<i className="fa-regular fa-circle-xmark"></i>
									</Link>
								) : (
									<Link
										href="#"
										title="Make Published"
										onClick={() => handleMakePublished('publish')}
										target="_self"
									>
										<i className="fa-solid fa-check"></i>
									</Link>
								))}
							<Link
								href={`/${user?.role === 'admin' ? 'admin' : 'dashboard'}/my-property/${
									item.property_type.toLowerCase() === 'land' ? 'land' : 'apartment'
								}/${item.id}`}
								title="Edit"
							>
								<i className="fa-solid fa-pen-to-square"></i>
							</Link>
							<Link href="#" title="202 User View">
								<i className="fa-regular fa-eye"></i>
							</Link>
							<Link
								href="#"
								title="Delete Property"
								className="delete"
								onClick={() => setShowDeleteModal(true)}
								target="_self"
							>
								<i className="fa-regular fa-trash-can"></i>
							</Link>
						</div>
					</div>
				</div>
				{user?.role === 'admin' && (
					<div className="sd-list-right bg-white  align-self-start">
						<h4 className="listing_dashboard_title">Contact Information</h4>
						<div className="user_dashboard_listed">
							Name: <span className="text-primary fw-bolder">{item.contact_information.name}</span>
						</div>
						<div className="user_dashboard_listed">
							Email:{' '}
							<span className="text-primary fw-bolder">{item.contact_information.email}</span>
						</div>

						<div className="user_dashboard_listed">
							Phone:{' '}
							<span className="text-primary fw-bolder">{item.contact_information.phone}</span>
						</div>
					</div>
				)}
			</div>
			<DeleteModal
				show={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDelete}
				loading={isLoading}
				text="Property"
			/>
		</div>
	);
};

export default MyProperty;
