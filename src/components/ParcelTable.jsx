import React from "react";

const ParcelTable = ({ parcels, onApprove, approvingId, canApprove }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <div className="grid grid-cols-4 bg-zinc-50 px-4 py-3 text-xs font-semibold text-zinc-700">
        <div>Parcel ID</div>
        <div>Recipient</div>
        <div>City</div>
        <div>Action</div>
      </div>

      {parcels.length === 0 ? (
        <div className="px-4 py-5 text-sm text-zinc-500">No pending parcels.</div>
      ) : (
        parcels.map((p) => (
          <div
            key={p._id}
            className="grid grid-cols-4 items-center border-t border-zinc-100 px-4 py-3 text-sm"
          >
            <div className="font-mono text-xs text-zinc-800">{p._id}</div>
            <div className="text-zinc-800">{p?.recipientName || "-"}</div>
            <div className="text-zinc-800">{p?.city || "-"}</div>
            <div>
              <button
                onClick={() => onApprove(p._id)}
                disabled={!canApprove || approvingId === p._id}
                title={!canApprove ? "Only insurance department can approve" : "Approve"}
                className={[
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition",
                  canApprove
                    ? "border-zinc-300 bg-white hover:bg-zinc-50 active:bg-zinc-100"
                    : "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400",
                  approvingId === p._id ? "opacity-70" : ""
                ].join(" ")}
              >
                {approvingId === p._id ? "Approving..." : "Approve"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ParcelTable;
