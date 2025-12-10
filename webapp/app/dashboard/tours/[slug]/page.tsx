import { TourPage } from '@/components/dashboard/tour-page';

export default async function TourDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return <TourPage slug={slug} />;
}
