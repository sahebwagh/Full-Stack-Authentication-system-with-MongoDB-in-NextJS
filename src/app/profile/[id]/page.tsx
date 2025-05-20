export default function UserProfile({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-600 p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <hr className="mb-6" />

        <p className="text-xl text-black">
          Profile page
          <span className="ml-3 inline-block px-3 py-1 rounded bg-blue-500 text-white text-base">
            {params.id}
          </span>
        </p>
      </div>
    </div>
  );
}
