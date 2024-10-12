"use client";
//Reusable component
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
//check it
import deleteProperty from "@/app/actions/deleteProperty";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handle_Delete_Property = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;
    await deleteProperty(propertyId);

    // Use the correct variable 'pot' here instead of 'property'
    const updatedProperties = properties.filter(
      (pot) => pot._id !== propertyId
    );
    // PropertyId

    setProperties(updatedProperties);

    toast.success("property Deleted Successfully ");
    //Understand This
  };

  return properties.map((pot) => (
    // most imp note pot  is prop here

    // going to your profile image to home image

    <div key={pot._id} className="mb-10">
      <Link href={`/properties/${pot._id}`}>
        <Image
          className="h-300 w-600 rounded-md object-cover"
          src={pot.images[0]}
          alt="Property Image"
          width={300}
          height={120}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{pot.name}</p>
        <p className="text-gray-600">
          Address: {pot.location.street}, {pot.location.city},{" "}
          {pot.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${pot._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handle_Delete_Property(pot._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
