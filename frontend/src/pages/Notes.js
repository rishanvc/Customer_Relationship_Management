import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [assignedCustomers, setAssignedCustomers] = useState([]);

  useEffect(() => {
  const loadNotes = async () => {
    const data = await fetchWithAuth("/notes/list/");
    setNotes(data);
  };

  const loadCustomers = async () => {
    const customers = await fetchWithAuth("/customers/list/");
    setAssignedCustomers(customers);
  };

  loadNotes();
  loadCustomers();
  }, []);





  const handleAddNote = async () => {

    if (!customerId || !noteText) {
    alert("Please select customer and write note");
    return;
  }


   await fetchWithAuth("/notes/", {
    method: "POST",
    body: JSON.stringify({
      customer: customerId,
      note: noteText,
    }),
  });

  const updatedNotes = await fetchWithAuth("/notes/list/");
  setNotes(updatedNotes);

  setNoteText("");
  setCustomerId("");
  setShowForm(false);
};




  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Interaction Notes</h1>

        {localStorage.getItem("role") === "staff" && (
            <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
            >
            + Add Note
            </button>
        )}
        </div>



        {showForm && (
        <div className="mb-4 bg-gray-100 p-4 rounded">
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="border p-2 mr-2"
            >
              <option value="">Select Customer</option>

              {assignedCustomers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>

            <input
            type="text"
            placeholder="Write note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="border p-2 mr-2"
            />

            <button
            onClick={handleAddNote}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
            Save
            </button>

            <button
            onClick={() => setShowForm(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
            >
            Cancel
            </button>
        </div>
        )}




      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Customer</th>
            {localStorage.getItem("role")==="admin" && (
            <th className="p-2 border">Staff</th>
            )}
            <th className="p-2 border">Note</th>
            <th className="p-2 border">Created At</th>
          </tr>
        </thead>

        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td className="p-2 border">{note.customer_name}</td>
              {localStorage.getItem("role")==="admin" && (
              <td className="p-2 border">{note.staff_name}</td>
              )}
              <td className="p-2 border">{note.note}</td>
              <td className="p-2 border">
                {new Date(note.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notes;