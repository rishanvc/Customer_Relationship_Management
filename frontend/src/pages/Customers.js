import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    });

  const [staffList, setStaffList] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 6;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );





    useEffect(() => {

        const loadCustomers = async () => {
            const data = await fetchWithAuth("/customers/list/");
            setCustomers(data);
        };

        const loadStaff = async () => {
            const data = await fetchWithAuth("/staff/");
            setStaffList(data);
        };

        const role = localStorage.getItem("role");

        loadCustomers();

        if (role === "admin") {
            loadStaff();
        }

    }, []);




    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");

    if (!confirmDelete) return;

    await fetchWithAuth(`/customers/${id}/delete/`, {
        method: "DELETE",
    });

    // Refresh list after delete
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    };





    const handleStatusChange = async (id, newStatus) => {
    await fetchWithAuth(`/customers/${id}/update/`, {
        method: "PATCH",
        body: JSON.stringify({
        lead_status: newStatus,
        }),
    });

    // Update UI instantly
    setCustomers((prev) =>
        prev.map((c) =>
        c.id === id ? { ...c, lead_status: newStatus } : c
        )
    );
    };




  const handleSaveCustomer = async () => {

  if (editingCustomerId) {
    // EDIT MODE
    await fetchWithAuth(`/customers/${editingCustomerId}/update/`, {
      method: "PATCH",
      body: JSON.stringify(formData),
    });

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === editingCustomerId
          ? { ...c, ...formData }
          : c
      )
    );

  } else {
    // ADD MODE
    const data = await fetchWithAuth("/customers/", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    setCustomers((prev) => [...prev, data]);
  }

  // Reset form
  setFormData({
    name: "",
    email: "",
    phone: "",
  });

  setEditingCustomerId(null);
  setShowForm(false);
};




    const handleAssignStaff = async (customerId, staffId) => {
        await fetchWithAuth(`/customers/${customerId}/update/`, {
            method: "PATCH",
            body: JSON.stringify({
            assigned_user: staffId,
            }),
        });

        // Update UI instantly
        setCustomers((prev) =>
            prev.map((c) =>
            c.id === customerId
                ? { ...c, assigned_user: staffId }
                : c
            )
        );
    };




    const handleEditClick = (customer) => {
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
        });

        setEditingCustomerId(customer.id);
        setShowForm(true);
        };



  return (
    <div>
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold ">Customers</h1>

        {localStorage.getItem("role")==="admin" && (
        <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
        >
            + Add Customer
        </button>
        )}
        </div>



        {showForm && (
        <div className="mb-6 p-4 border rounded bg-gray-100">
            <h2 className="text-lg mb-4">
            {editingCustomerId ? "Edit Customer" : "Add Customer"}
            </h2>

        <input
        type="text"
        placeholder="Name"
        className="border p-2 mr-2"
        value={formData.name}
        onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
        }
        />

        <input
        type="email"
        placeholder="Email"
        className="border p-2 mr-2"
        value={formData.email}
        onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
        }
        />

        <input
        type="text"
        placeholder="Phone"
        className="border p-2 mr-2"
        value={formData.phone}
        onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
        }
        />

        <button
        onClick={handleSaveCustomer}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
        Save
        </button>

        <button
        onClick={() => {
                        setShowForm(false);
                        setEditingCustomerId(null);
                        }}
        className="bg-gray-500 text-white px-4 py-2 rounded"
        >
        Cancel
        </button>
    </div>
    )}




      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Lead Status</th>
            {localStorage.getItem("role") === "admin" && (
                <th className="p-2 border">Assigned Staff</th>
            )}
            {localStorage.getItem("role") === "admin" && (
            <th className="p-2 border">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentCustomers.map((c) => (
            <tr key={c.id} className="text-center">
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.phone}</td>
              <td className="p-2 border">
                <select
                    value={c.lead_status}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="border p-1 rounded"
                >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow_up">Follow Up</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                </select>
                </td>

                {localStorage.getItem("role")==="admin" && (
                <td className="p-2 border">
                <select
                    value={c.assigned_user || ""}
                    onChange={(e) =>
                    handleAssignStaff(c.id, e.target.value)
                    }
                    className="border p-1 rounded"
                >
                    <option value="">Unassigned</option>

                    {staffList.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                        {staff.username}
                    </option>
                    ))}
                </select>
                </td>
                )}

              
              {localStorage.getItem("role") === "admin" && (

              <td className="p-2 border">
                <button 
                    onClick={() => handleEditClick(c)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button 
                    onClick={()=>handleDelete(c.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                </button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>



<div className="flex justify-center mt-4 space-x-2">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-3 py-1">
          Page {currentPage}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            indexOfLastCustomer >= customers.length
          }
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>



    </div>
  );
}

export default Customers;