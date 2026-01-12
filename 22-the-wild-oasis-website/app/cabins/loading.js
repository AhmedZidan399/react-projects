import Spinner from "@/app/_components/Spinner";

function Loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p className="text-primary-200">Loading cabins data...</p>
    </div>
  );
}

export default Loading;
