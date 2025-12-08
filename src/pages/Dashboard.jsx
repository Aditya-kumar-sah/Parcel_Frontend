import React, { useEffect, useMemo, useState } from "react";
import client from "../api/client";
import { useAuth } from "../auth/AuthContext";
import ParcelTable from "../components/ParcelTable";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState("");
  const [err, setErr] = useState("");

  const canApprove = useMemo(() => user?.department === "insurance", [user]);

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await client.get("/parcels/pending");
      setParcels(res.data || []);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load parcels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onApprove = async (id) => {
    if (!canApprove) return;
    setApprovingId(id);
    setErr("");
    try {
      await client.patch(/parcels//approve);
      setParcels((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      setErr(e?.response?.data?.message || "Approval failed");
    } finally {
      setApprovingId("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">Dashboard</h1>
            <p className="text-xs text-zinc-500">Pending Parcel Approvals</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-semibold text-zinc-900">{user?.name || "User"}</div>
              <div className="text-[10px] text-zinc-500">{user?.department || "unknown"} dept</div>
            </div>
            <button
              onClick={logout}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {!canApprove && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            You can view pending parcels, but only the insurance department can approve them.
          </div>
        )}

        {err && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {err}
          </div>
        )}

        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-zinc-700">
            {loading ? "Loading..." : parcels.length + " pending"}
          </div>
          <button
            onClick={load}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-50"
          >
            Refresh
          </button>
        </div>

        <ParcelTable
          parcels={parcels}
          onApprove={onApprove}
          approvingId={approvingId}
          canApprove={canApprove}
        />
      </main>
    </div>
  );
};

export default Dashboard;

