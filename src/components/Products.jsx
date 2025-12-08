import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [mail, setMail] = useState([]);
  const [regular, setRegular] = useState([]);
  const [heavy, setHeavy] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParcels = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKENDURL}/api/parcel/approved`,
        { withCredentials: true }
      );

      const parcels = res.data;

      setMail(parcels.filter(p => p.department === "Mail"));
      setRegular(parcels.filter(p => p.department === "Regular"));
      setHeavy(parcels.filter(p => p.department === "Heavy"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading Parcels...
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
           Parcel Manager
        </h1>
        <Link
          to="/home"
          className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
        >
          Home
        </Link>
      </nav>

      <div className="p-8 pt-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Approved Parcels
        </h1>

        <Category title="Mail" data={mail} />
        <Category title="Regular" data={regular} />
        <Category title="Heavy" data={heavy} />
      </div>
    </div>
  );
}

function Category({ title, data }) {
  return (
    <div className="mb-14">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {title} Department
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No parcels available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(parcel => (
            <div
              key={parcel._id}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {parcel.name}
              </h3>

              <div className="text-sm text-gray-700 space-y-1">
                <p><b>Weight:</b> {parcel.weight} kg</p>
                <p><b>Value:</b> ₹{parcel.value}</p>

                <p className="mt-3 font-medium text-gray-900">Address</p>
                <p>{parcel.address.street}, {parcel.address.houseNumber}</p>
                <p>{parcel.address.city} - {parcel.address.postalCode}</p>
              </div>

              <div className="mt-4 text-xs inline-block px-4 py-1 bg-gray-200 rounded-full font-medium text-gray-700">
                {parcel.department}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
