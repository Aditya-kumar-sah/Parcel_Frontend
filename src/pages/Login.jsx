import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);
      nav("/", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-zinc-50 grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-900 text-white text-xs font-bold">
            PA
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-zinc-900">
              Parcel Approval Portal
            </div>
            <div className="text-[11px] text-zinc-500">
              Secure access for internal teams
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <div className="text-sm font-semibold text-zinc-900">Sign in</div>
          <div className="mt-1 text-[11px] text-zinc-500">
            Use your organization credentials
          </div>

          <div className="mt-5">
            <label className="text-xs font-medium text-zinc-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="name@company.com"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-zinc-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>

          {err && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {err}
            </div>
          )}

          <button
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.99] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-400">
            <span>JWT-protected access</span>
            <span>Role-based approvals</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
