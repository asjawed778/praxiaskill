export default function CourseSkeleton() {
  return (
    <div className="flex flex-wrap gap-5 p-5">
      <div className="flex flex-col gap-5 mx-auto">
        <div className="w-64 h-40 bg-gray-300 rounded-xl animate-pulse" />
        <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
        <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
      </div>

      <div className="flex flex-col gap-5 mx-auto">
        <div className="w-64 h-40 bg-gray-300 rounded-xl animate-pulse" />
        <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
        <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
      </div>

      <div className="flex flex-col gap-5 mx-auto">
        <div className="w-64 h-40 bg-gray-300 rounded-xl animate-pulse" />
        <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
        <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
