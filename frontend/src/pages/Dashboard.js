import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";
import {
  FaUsers,
  FaUserClock,
  FaStickyNote,
} from "react-icons/fa";

function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const customers = await fetchWithAuth("/customers/list/");
        setTotalCustomers(customers.length);

        const role = localStorage.getItem("role");

        if (role === "admin") {
          const staff = await fetchWithAuth("/staff/");
          const pending = staff.filter((s) => !s.is_active);
          setPendingApprovals(pending.length);
        }

        const notes = await fetchWithAuth("/notes/list/");
        setTotalNotes(notes.length);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, {localStorage.getItem("username")}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Customers */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">
                Total Customers
              </h2>

              <p className="text-4xl font-bold mt-2">
                {totalCustomers}
              </p>
            </div>

            <FaUsers size={45} />
          </div>
        </div>

        {/* Pending Approvals */}
        {localStorage.getItem("role") === "admin" && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium">
                  Pending Approvals
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {pendingApprovals}
                </p>
              </div>

              <FaUserClock size={45} />
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">
                Total Notes
              </h2>

              <p className="text-4xl font-bold mt-2">
                {totalNotes}
              </p>
            </div>

            <FaStickyNote size={45} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;