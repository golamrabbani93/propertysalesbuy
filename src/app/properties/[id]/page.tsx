import SingleProperty from '@/app/components/single-property/SingleProperty';

export default function Page({params}: {params: {id: string}}) {
	const id = params.id;
	return (
		<>
			<SingleProperty id={id} />
		</>
	);
}
