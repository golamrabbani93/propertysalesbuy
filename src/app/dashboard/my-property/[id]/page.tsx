import EditProperty from '@/app/components/edit-property/EditProperty';

const page = async ({params}: {params: {id: string}}) => {
	const {id} = await params;

	return (
		<>
			<div className="container-fluid">
				<div className="dashboard-wraper">
					<div className="form-submit mb-4">
						<h4>Edit Property</h4>
					</div>

					<div className="row mt-4">
						<EditProperty id={id} />
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
