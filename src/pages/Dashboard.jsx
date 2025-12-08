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

  useEffect(() => {
    load();
  }, []);

  const onApprove = async (id) => {
    if (!canApprove) return;

    setApprovingId(id);
    setErr("");
    try {
      await client.patch(`/parcels/${id}/approve`);
      setParcels((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      setErr(e?.response?.data?.message || "Approval failed");
    } finally {
      setApprovingId("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white text-xs font-bold">
              PA
            </div>
            <div>
              <h1 className="text-lg font-semibold text-zinc-900">
                Parcel Approvals
              </h1>
              <p className="text-[11px] text-zinc-500">
                Review and approve pending shipments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={[
                "rounded-full px-2.5 py-1 text-[10px] font-semibold",
                canApprove
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
              ].join(" ")}
            >
              {user?.department || "unknown"} dept
            </span>

            <div className="text-right">
              <div className="text-xs font-semibold text-zinc-900">
                {user?.name || "User"}
              </div>
              <div className="text-[10px] text-zinc-500">
                {user?.email || "—"}
              </div>
            </div>

            <button
              onClick={logout}
              className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              Pending Requests
            </div>
            <div className="mt-2 text-3xl font-bold text-zinc-900">
              {loading ? "—" : parcels.length}
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              Updated on refresh
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              Your Access
            </div>
            <div className="mt-2 text-lg font-semibold text-zinc-900">
              {canApprove ? "Approver" : "Viewer"}
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              Approval restricted to insurance
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              Quick Actions
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={load}
                className="rounded-xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-black"
              >
                Refresh List
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {!canApprove && (
          <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            You can view pending parcels, but only the insurance department can
            approve them.
          </div>
        )}

        {err && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {err}
          </div>
        )}

        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-zinc-700">
            {loading ? "Loading..." : parcels.length + " pending"}
          </div>
          <span className="text-[10px] text-zinc-400">Live API</span>
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
