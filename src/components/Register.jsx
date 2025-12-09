import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return alert("Password must be at least 6 characters");

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_BACKENDURL}/api/auth/register`, {
        name, email, password
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-gray-700 text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white p-4">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl w-full max-w-md p-10 flex flex-col gap-6 hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Register</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none shadow-sm"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none shadow-sm"
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none shadow-sm"
            required
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-600 mt-2">
          Already Registered?{" "}
          <Link to="/login" className="text-gray-800 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
