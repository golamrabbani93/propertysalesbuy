import InquiryTable from '@/app/components/property-inquiry-table/InquiryTable';
import UserTable from '@/app/components/UserTable/UserTable';

const page = () => {
	return (
		<div className="container-fluid">
			<div className="dashboard-wraper">
				<div className="form-submit mb-4">
					<h4>User Messages</h4>
				</div>

				<div className="row">
					<UserTable />
				</div>
			</div>
		</div>
	);
};

export default page;
