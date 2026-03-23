import { useLocation, useNavigate } from "react-router-dom";



function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const activeClass = "p-3 rounded bg-gray-700 cursor-pointer";
  const normalClass = "p-3 rounded hover:bg-gray-700 cursor-pointer";

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8">CRM</h1>

      {/* Menu */}
      <ul className="space-y-2">

        <li onClick={()=>navigate("/dashboard")}
            className={
            location.pathname === "/dashboard"
              ? activeClass
              : normalClass
          }>
          📊 Dashboard
        </li>

        <li onClick={() => navigate("/customers")}
            className={
            location.pathname === "/customers"
              ? activeClass
              : normalClass
          }>
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

      
      <div className="mt-auto">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="w-full p-3 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;