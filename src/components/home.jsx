import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKENDURL}/api/parcel/upload-xml`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_BACKENDURL}/api/auth/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
          Parcel Manager
        </h1>
        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
          >
            Products
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-1 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
            Upload Parcel XML
          </h1>

          <div className="flex flex-col items-center mb-6">
            <label
              htmlFor="fileUpload"
              className="cursor-pointer w-full flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition-colors bg-gray-50"
            >
              <svg
                className="w-12 h-12 mb-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-3-3m3 3l3-3M12 12V4m0 0l-3 3m3-3l3 3"
                ></path>
              </svg>
              <span className="text-gray-700 font-medium">
                {file ? file.name : "Click to select XML file"}
              </span>
              <input
                id="fileUpload"
                type="file"
                accept=".xml"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            onClick={handleUpload}
            className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-colors mb-4"
          >
            Upload Now
          </button>

          {message && (
            <div className="text-center mt-4 p-3 rounded-lg bg-gray-100 text-gray-800 font-medium shadow-sm">
              {message}
            </div>
          )}

          <p className="mt-6 text-center text-gray-500 text-sm">
            Supported format: <span className="font-semibold">.xml</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
