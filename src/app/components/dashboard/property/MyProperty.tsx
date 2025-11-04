import {IProperty} from '@/types/property.types';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import DeleteModal from '../modal/delete-modal/DeleteModal';
import {useDeletePropertyMutation} from '@/redux/features/property/propertyManagementApi';
import {catchAsync} from '@/utils/catchAsync';
import {toast} from 'sonner';

const MyProperty = ({item}: {item: IProperty}) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteProperty, {isLoading}] = useDeletePropertyMutation();

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
						Property Type: <span className="text-primary">{item.property_type}</span>
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
					</div>
					<div className="user_dashboard_listed">
						Address: <span className="text-primary">{item.address}</span>
					</div>
					<div className="action">
						<Link href={`/dashboard/my-property/${item.id}`} title="Edit">
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
						>
							<i className="fa-regular fa-trash-can"></i>
						</Link>
					</div>
				</div>
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
