import React from "react";
import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
      <img
        src={property.imageUrls[0]}
        alt={property.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{property.title}</h2>
      <p className="text-gray-600">{property.district} | {property.region}</p>
      <p className="text-green-600 font-semibold mt-1">₹{property.price}</p>
      <Link
        to={`/lands/${property.id}`}
        className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}

export default PropertyCard;
