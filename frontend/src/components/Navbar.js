function Navbar() {
  const username = localStorage.getItem("username");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-md px-6 py-4 mb-6 flex justify-between items-center">
      
      {/* Left Side */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500">
          {today}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Logged in as
          </p>
          <p className="font-semibold text-gray-800">
            {username}
          </p>
        </div>

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow">
          {username?.charAt(0).toUpperCase()}
        </div>

      </div>

    </div>
  );
}

export default Navbar;