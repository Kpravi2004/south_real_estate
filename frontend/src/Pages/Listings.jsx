import React from "react";
import PropertyCard from "../Components/PropertyCard";

const allProperties = [
  {
    id: 1,
    title: "2 Acres Farm Land",
    district: "Madurai",
    region: "Vadipatti",
    price: 2000000,
    imageUrls: ["/sample-land.jpg"]
  },
  {
    id: 2,
    title: "Residential Plot",
    district: "Tirunelveli",
    region: "Palayamkottai",
    price: 1500000,
    imageUrls: ["/sample-land2.jpg"]
  },
  {
    id: 3,
    title: "Commercial Land",
    district: "Madurai",
    region: "Thirumangalam",
    price: 5000000,
    imageUrls: ["/sample-land3.jpg"]
  }
];

function Listings() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allProperties.map((prop) => (
        <PropertyCard key={prop.id} property={prop} />
      ))}
    </div>
  );
}

export default Listings;
