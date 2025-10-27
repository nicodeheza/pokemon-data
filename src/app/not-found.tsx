import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Not Found</h2>
        <p className="mb-6 text-gray-600">Could not find requested resource</p>
        <Link
          href="/"
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
