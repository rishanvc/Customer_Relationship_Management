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
  <div className="p-6">

    {/* Header */}
    <div className="bg-white rounded-2xl shadow p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Customers
        </h1>
        <p className="text-gray-500">
          Manage your customer database
        </p>
      </div>

      {localStorage.getItem("role") === "admin" && (
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow hover:scale-105 transition"
        >
          + Add Customer
        </button>
      )}
    </div>

    {/* Form */}
    {showForm && (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingCustomerId
            ? "Edit Customer"
            : "Add Customer"}
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleSaveCustomer}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl mr-3"
          >
            Save
          </button>

          <button
            onClick={() => {
              setShowForm(false);
              setEditingCustomerId(null);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Table */}
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Lead Status</th>

              {localStorage.getItem("role") === "admin" && (
                <th className="p-4">Assigned Staff</th>
              )}

              {localStorage.getItem("role") === "admin" && (
                <th className="p-4">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {currentCustomers.map((c) => (
              <tr
                key={c.id}
                className="text-center border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{c.name}</td>
                <td className="p-4">{c.email}</td>
                <td className="p-4">{c.phone}</td>

                <td className="p-4">
                  <select
                    value={c.lead_status}
                    onChange={(e) =>
                      handleStatusChange(
                        c.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg p-2"
                  >
                    <option value="new">New</option>
                    <option value="contacted">
                      Contacted
                    </option>
                    <option value="follow_up">
                      Follow Up
                    </option>
                    <option value="converted">
                      Converted
                    </option>
                    <option value="lost">Lost</option>
                  </select>
                </td>

                {localStorage.getItem("role") === "admin" && (
                  <td className="p-4">
                    <select
                      value={c.assigned_user || ""}
                      onChange={(e) =>
                        handleAssignStaff(
                          c.id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg p-2"
                    >
                      <option value="">
                        Unassigned
                      </option>

                      {staffList.map((staff) => (
                        <option
                          key={staff.id}
                          value={staff.id}
                        >
                          {staff.username}
                        </option>
                      ))}
                    </select>
                  </td>
                )}

                {localStorage.getItem("role") === "admin" && (
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleEditClick(c)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(c.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

    {/* Pagination */}
    <div className="flex justify-center items-center mt-6 gap-3">

      <button
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 disabled:opacity-40"
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {currentPage}
      </span>

      <button
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
        disabled={
          indexOfLastCustomer >= customers.length
        }
        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 disabled:opacity-40"
      >
        Next
      </button>

    </div>

  </div>
);
}

export default Customers;