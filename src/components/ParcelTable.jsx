import React from "react";

const ParcelTable = ({
  parcels,
  onApprove,
  onReject,
  approvingId,
  rejectingId,
  canApprove,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="grid grid-cols-12 gap-2 border-b border-zinc-100 bg-zinc-50/60 px-5 py-4">
        <div className="col-span-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          Parcel
        </div>
        <div className="col-span-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          Address
        </div>
        <div className="col-span-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          Weight
        </div>
        <div className="col-span-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          Value
        </div>
        <div className="col-span-2 text-right text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
          Actions
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
          {parcels.map((p) => {
            const addr = p?.address || {};
            const addressLine = [addr.street, addr.houseNumber]
              .filter(Boolean)
              .join(" ");

            const busy = approvingId === p._id || rejectingId === p._id;

            return (
              <div
                key={p._id}
                className="grid grid-cols-12 gap-2 px-5 py-4 transition hover:bg-zinc-50/70"
              >
                <div className="col-span-3">
                  <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-[11px] text-zinc-800">
                    {p._id}
                  </span>
                  <div className="mt-1 text-sm font-medium text-zinc-900">
                    {p?.name || "—"}
                  </div>
                  <div className="text-[10px] text-zinc-400">PENDING</div>
                </div>

                <div className="col-span-3">
                  <div className="text-sm text-zinc-900">
                    {addressLine || "—"}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {(addr.city || "—") +
                      (addr.postalCode ? `, ${addr.postalCode}` : "")}
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="text-sm font-medium text-zinc-900">
                    {typeof p?.weight === "number" ? `${p.weight} kg` : "—"}
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="text-sm font-medium text-zinc-900">
                    {typeof p?.value === "number" ? p.value : "—"}
                  </div>
                  <div className="text-[11px] text-zinc-500">Declared</div>
                </div>

                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => onReject(p._id)}
                    disabled={!canApprove || busy}
                    title={
                      !canApprove
                        ? "Only insurance department can reject"
                        : "Reject (removes from DB)"
                    }
                    className={[
                      "rounded-xl px-3 py-2 text-xs font-semibold transition",
                      "focus:outline-none focus:ring-2",
                      canApprove
                        ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-200"
                        : "cursor-not-allowed bg-zinc-100 text-zinc-400",
                      busy ? "opacity-70" : "",
                    ].join(" ")}
                  >
                    {rejectingId === p._id ? "Rejecting..." : "Reject"}
                  </button>

                  <button
                    onClick={() => onApprove(p._id)}
                    disabled={!canApprove || busy}
                    title={
                      !canApprove
                        ? "Only insurance department can approve"
                        : "Approve"
                    }
                    className={[
                      "rounded-xl px-3 py-2 text-xs font-semibold transition",
                      "focus:outline-none focus:ring-2 focus:ring-zinc-900/10",
                      canApprove
                        ? "bg-zinc-900 text-white hover:bg-black"
                        : "cursor-not-allowed bg-zinc-100 text-zinc-400",
                      busy ? "opacity-70" : "",
                    ].join(" ")}
                  >
                    {approvingId === p._id ? "Approving..." : "Approve"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ParcelTable;
