import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";

function Staff() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const loadStaff = async () => {
      const data = await fetchWithAuth("/staff/");
      setStaffList(data);
    };

    loadStaff();
  }, []);

  const handleApprove = async (id) => {
    await fetchWithAuth(`/staff/${id}/approve/`, {
      method: "PATCH",
    });

    const updatedStaff = await fetchWithAuth("/staff/");
    setStaffList(updatedStaff);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff member?"
    );

    if (!confirmDelete) return;

    await fetchWithAuth(`/staff/${id}/delete/`, {
      method: "DELETE",
    });

    const updatedStaff = await fetchWithAuth("/staff/");
    setStaffList(updatedStaff);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Staff Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage staff approvals and access permissions
        </p>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {staffList.map((staff) => (
                <tr
                  key={staff.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {staff.username}
                  </td>

                  <td className="p-4 text-gray-600">
                    {staff.email}
                  </td>

                  <td className="p-4">
                    {staff.is_active ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Approved
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">

                    {!staff.is_active && (
                      <button
                        onClick={() => handleApprove(staff.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2 transition"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(staff.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Staff;