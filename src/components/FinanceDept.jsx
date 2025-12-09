import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinanceDept = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const BASE_URL = import.meta.env.VITE_APP_BACKENDURL;
  const navigate = useNavigate();

  // Fetch pending parcels
  useEffect(() => {
    const fetchPendingParcels = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${BASE_URL}/api/parcel/pending`, {
          withCredentials: true,
        });

        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setParcels(data);
      } catch (err) {
        setError("Failed to load pending parcels");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingParcels();
  }, [BASE_URL]);

  // Approve parcel
  const handleApprove = async (id) => {
    try {
      setActionLoading(id);
      await axios.post(`${BASE_URL}/api/parcel/${id}/approve`, {}, { withCredentials: true });
      setParcels((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Approval failed");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // Reject parcel
  const handleReject = async (id) => {
    try {
      setActionLoading(id);
      await axios.delete(`${BASE_URL}/api/parcel/${id}/reject`, { withCredentials: true });
      setParcels((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Rejection failed");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading pending parcels...
        </p>
      </div>
    );
  }

  return (
    <div className=" absolute inset-0 bg-gray-50">
      <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Parcel Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Pending Parcels</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {parcels.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow">
            No pending parcels found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">Parcel ID</th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">Sender</th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">Weight</th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">Value</th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">Created At</th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {parcels?.map((parcel) => (
                  <tr key={parcel._id} className="hover:bg-gray-50 transition">
                    <td className="px-3 py-3 text-sm text-gray-700">{parcel._id}</td>
                    <td className="px-3 py-3 text-sm text-gray-700">{parcel.name}</td>
                    <td className="px-3 py-3 text-sm text-gray-700">{parcel.weight} kg</td>
                    <td className="px-3 py-3 text-sm font-semibold text-gray-900">₹{parcel.value}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{new Date(parcel.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-3 flex gap-3">
                      <button
                        onClick={() => handleApprove(parcel._id)}
                        disabled={actionLoading === parcel._id}
                        className="px-4 py-1.5 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {actionLoading === parcel._id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleReject(parcel._id)}
                        disabled={actionLoading === parcel._id}
                        className="px-4 py-1.5 rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {actionLoading === parcel._id ? "..." : "Reject"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceDept;
