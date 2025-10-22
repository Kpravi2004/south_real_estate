import React from "react";
import { useParams } from "react-router-dom";

function PropertyDetails() {
  const { id } = useParams();

  // For now, just show the property ID
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Property Details - ID: {id}</h1>
      <p className="mt-4">Here we will show images, videos, description, price, and contact admin button.</p>
    </div>
  );
}

export default PropertyDetails;
