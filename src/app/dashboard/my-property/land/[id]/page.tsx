import EditLand from '@/app/components/edit-property/EditLand';

const page = async ({params}: {params: {id: string}}) => {
	const {id} = await params;

	return (
		<>
			<div className="container-fluid">
				<div className="dashboard-wraper">
					<div className="form-submit mb-4">
						<h4>Edit Land Property</h4>
					</div>

					<div className="row mt-4">
						<EditLand id={id} />
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
