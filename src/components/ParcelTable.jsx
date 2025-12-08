import React from "react";

const ParcelTable = ({ parcels, onApprove, approvingId, canApprove }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="grid grid-cols-12 gap-2 border-b border-zinc-100 bg-zinc-50/60 px-5 py-4">
        <div className="col-span-4 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          Parcel ID
        </div>
        <div className="col-span-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          Recipient
        </div>
        <div className="col-span-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          City
        </div>
        <div className="col-span-2 text-right text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          Action
        </div>
      </div>

      {parcels.length === 0 ? (
        <div className="px-5 py-10">
          <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-8 text-center">
            <div className="text-sm font-medium text-zinc-800">
              No pending parcels
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              You&rsquo;re all caught up.
            </div>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100">
          {parcels.map((p) => (
            <div
              key={p._id}
              className="grid grid-cols-12 gap-2 px-5 py-4 transition hover:bg-zinc-50/70"
            >
              <div className="col-span-4">
                <div className="inline-flex items-center gap-2">
                  <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-[11px] text-zinc-800">
                    {p._id}
                  </span>
                  <span className="text-[10px] text-zinc-400">PENDING</span>
                </div>
              </div>

              <div className="col-span-3">
                <div className="text-sm font-medium text-zinc-900">
                  {p?.recipientName || "—"}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {p?.email || "Recipient"}
                </div>
              </div>

              <div className="col-span-3">
                <div className="text-sm text-zinc-900">{p?.city || "—"}</div>
                <div className="text-[11px] text-zinc-500">
                  {p?.postalCode || "—"}
                </div>
              </div>

              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => onApprove(p._id)}
                  disabled={!canApprove || approvingId === p._id}
                  title={
                    !canApprove
                      ? "Only insurance department can approve"
                      : "Approve"
                  }
                  className={[
                    "inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition",
                    "focus:outline-none focus:ring-2 focus:ring-zinc-900/10",
                    canApprove
                      ? "bg-zinc-900 text-white hover:bg-black active:scale-[0.98]"
                      : "cursor-not-allowed bg-zinc-100 text-zinc-400",
                    approvingId === p._id ? "opacity-70" : "",
                  ].join(" ")}
                >
                  {approvingId === p._id ? "Approving..." : "Approve"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParcelTable;
