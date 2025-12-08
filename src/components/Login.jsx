import React, { useState } from 'react'
import axios from "axios"
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_BACKENDURL}/api/auth/login`, {
        email, password
      },
  { withCredentials: true }
);
      navigate("/home")
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Login failed!");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 bg-opacity-90">
        <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0  flex items-center justify-center bg-gradient-to-tr from-purple-50 to-pink-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10 flex flex-col gap-6 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-4 drop-shadow-md">Login</h1>

        <div className="flex flex-col gap-4">
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
            required
          />

          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl hover:from-pink-500 hover:to-purple-600 shadow-lg transition-colors duration-300"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-600 mt-2">
          Not Registered?{" "}
          <Link to="/" className="text-purple-700 font-semibold hover:text-pink-500 hover:underline transition-colors duration-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
