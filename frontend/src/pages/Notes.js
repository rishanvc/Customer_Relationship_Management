import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [assignedCustomers, setAssignedCustomers] = useState([]);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

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

  const handleGenerateSummary = async () => {
    try {
      setLoadingSummary(true);

      const data = await fetchWithAuth("/notes/summarize/", {
        method: "POST",
        body: JSON.stringify({
          note: noteText,
        }),
      });

      setSummary(data.summary);
    } finally {
      setLoadingSummary(false);
    }
  };

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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Interaction Notes
          </h1>
          <p className="text-gray-500">Manage customer communication history</p>
        </div>

        {localStorage.getItem("role") === "staff" && (
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 md:mt-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow hover:scale-105 transition"
          >
            + Add Note
          </button>
        )}
      </div>

      {/* Add Note Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Note</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
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
              placeholder="Write interaction note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleGenerateSummary}
              disabled={!noteText.trim()}
              className={`w-full py-3 rounded-xl text-white ${
                !noteText.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-fuchsia-500"
              }`}
            >
              {loadingSummary ? "Generating..." : "✨ Generate AI Summary"}
            </button>
            {summary && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                <h3 className="font-semibold text-purple-700">✨ AI Summary</h3>

                <p className="mt-2 text-gray-700">{summary}</p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={handleAddNote}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl mr-3"
            >
              Save Note
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-4 text-left">Customer</th>

                {localStorage.getItem("role") === "admin" && (
                  <th className="p-4 text-left">Staff</th>
                )}

                <th className="p-4 text-center">Note</th>
                <th className="p-4 text-left">Created At</th>
              </tr>
            </thead>

            <tbody>
              {notes.map((note) => (
                <tr
                  key={note.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {note.customer_name}
                  </td>

                  {localStorage.getItem("role") === "admin" && (
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {note.staff_name}
                      </span>
                    </td>
                  )}

                  <td className="p-4 text-gray-700">{note.note}</td>

                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(note.created_at).toLocaleString()}
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

export default Notes;
