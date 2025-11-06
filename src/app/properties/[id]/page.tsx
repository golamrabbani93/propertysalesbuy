import SingleProperty from '@/app/components/single-property/SingleProperty';

interface PageProps {
	params: {id: string};
}

// server component
export default async function Page({params}: PageProps) {
	const id = await params.id; // ✅ access directly
	return <SingleProperty id={id} />;
}
