import UpdateTourModal from '@/components/dashboard/update-tour';

const page = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;

  return (
    <div className="w-full">
      <UpdateTourModal slug={slug} />
    </div>
  );
};

export default page;
