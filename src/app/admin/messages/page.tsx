import InquiryTable from '@/app/components/property-inquiry-table/InquiryTable';

const page = () => {
	return (
		<div className="container-fluid">
			<div className="dashboard-wraper">
				<div className="form-submit mb-4">
					<h4>User Messages</h4>
				</div>

				<div className="row">
					<InquiryTable type="message" />
				</div>
			</div>
		</div>
	);
};

export default page;
