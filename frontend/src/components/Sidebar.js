import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeClass =
    "flex items-center gap-3 p-3 rounded-xl bg-blue-600 text-white shadow-lg cursor-pointer";

  const normalClass =
    "flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 cursor-pointer";

  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold">
          CR<span className="text-blue-400">M</span>
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Customer Management System
        </p>
      </div>

      

      {/* Navigation */}
      <div className="flex-1 p-4">

        <ul className="space-y-3">

          <li
            onClick={() => navigate("/dashboard")}
            className={
              location.pathname === "/dashboard"
                ? activeClass
                : normalClass
            }
          >
            📊 Dashboard
          </li>

          <li
            onClick={() => navigate("/customers")}
            className={
              location.pathname === "/customers"
                ? activeClass
                : normalClass
            }
          >
            👥 Customers
          </li>

          {localStorage.getItem("role") === "admin" && (
            <li
              onClick={() => navigate("/staff")}
              className={
                location.pathname === "/staff"
                  ? activeClass
                  : normalClass
              }
            >
              🧑‍💼 Staff
            </li>
          )}

          <li
            onClick={() => navigate("/notes")}
            className={
              location.pathname === "/notes"
                ? activeClass
                : normalClass
            }
          >
            📝 Notes
          </li>

        </ul>
      </div>


            {/* User Info */}
      <div className="p-6 border-b border-slate-700">
        <div className="bg-slate-800 rounded-xl p-4">

          
          <h3 className="font-semibold text-lg">
            {localStorage.getItem("username")}
          </h3>

          <span className="text-blue-400 text-sm capitalize">
            {localStorage.getItem("role")}
          </span>

        </div>
      </div>



      {/* Logout */}
      <div className="p-4 border-t border-slate-700">

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all duration-200"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;