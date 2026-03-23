import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";

function Dashboard() {

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);

  useEffect(() => {

    const loadDashboardData = async () => {

      // customers count
      const customers = await fetchWithAuth("/customers/list/");
      setTotalCustomers(customers.length);

      // staff approvals count
      const role = localStorage.getItem("role");

      if (role === "admin") {
        const staff = await fetchWithAuth("/staff/");
        const pending = staff.filter(s => !s.is_active);
        setPendingApprovals(pending.length);
      }

      // notes count
      const notes = await fetchWithAuth("/notes/list/");
      setTotalNotes(notes.length);

    };

    loadDashboardData();

  }, []);

  return (
    <div>

      <h1 className="text-2xl font-semibold mb-6">
        Dashboard Summary
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {/* Total Customers */}
        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h2 className="text-lg">Total Customers</h2>
          <p className="text-3xl font-bold">
            {totalCustomers}
          </p>
        </div>


        {/* Pending Approvals */}
        {localStorage.getItem("role")==="admin" &&(
        <div className="bg-yellow-500 text-white p-6 rounded shadow">
          <h2 className="text-lg">Pending Approvals</h2>
          <p className="text-3xl font-bold">
            {pendingApprovals}
          </p>
        </div>
        )}


        {/* Total Notes */}
        <div className="bg-green-500 text-white p-6 rounded shadow">
          <h2 className="text-lg">Total Notes</h2>
          <p className="text-3xl font-bold">
            {totalNotes}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;