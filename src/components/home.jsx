import { useState } from "react";
import axios from "axios";

function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKENDURL}/api/parcel/upload-xml`,formData,{
       headers: { "Content-Type": "multipart/form-data" },
       withCredentials: true,   
      }
);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className=" absolute inset-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-300 to-yellow-200">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
          Upload Parcel XML
        </h1>
        
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="fileUpload"
            className="cursor-pointer w-full flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 transition-colors bg-purple-50"
          >
            <svg
              className="w-12 h-12 mb-2 text-purple-400"
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
            <span className="text-purple-600 font-medium">
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
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors mb-4"
        >
          Upload Now
        </button>

        {message && (
          <div className="text-center mt-4 p-3 rounded-lg bg-purple-100 text-purple-800 font-medium shadow-sm">
            {message}
          </div>
        )}

        <p className="mt-6 text-center text-gray-500 text-sm">
          Supported format: <span className="font-semibold">.xml</span>
        </p>
      </div>
    </div>
  );
}

export default Home;
