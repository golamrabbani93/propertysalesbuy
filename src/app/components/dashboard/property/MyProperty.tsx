import {IProperty} from '@/types/property.types';
import Image from 'next/image';
import Link from 'next/link';

const MyProperty = ({item}: {item: IProperty}) => {
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
						<Link href="#" className="text-primary">
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
						<Link href="#" title="Edit">
							<i className="fa-solid fa-pen-to-square"></i>
						</Link>
						<Link href="#" title="202 User View">
							<i className="fa-regular fa-eye"></i>
						</Link>
						<Link href="#" title="Delete Property" className="delete">
							<i className="fa-regular fa-trash-can"></i>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProperty;
