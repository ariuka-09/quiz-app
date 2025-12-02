export default function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="p-30">
      <h3>{id} </h3>
    </div>
  );
}
