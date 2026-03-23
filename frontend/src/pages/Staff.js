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

    // Refresh staff list
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

        // Refresh list
        const updatedStaff = await fetchWithAuth("/staff/");
        setStaffList(updatedStaff);

        };




  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Staff Management</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Approved</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id} className="text-center">
              <td className="p-2 border">{staff.username}</td>
              <td className="p-2 border">{staff.email}</td>
              <td className="p-2 border">
                {staff.is_active ? "Yes" : "No"}
              </td>
              <td className="p-2 border">
                {!staff.is_active && (
                  <button
                    onClick={()=>handleApprove(staff.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={()=>handleDelete(staff.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;