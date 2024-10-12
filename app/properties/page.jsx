import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Pagination from "@/components/Pagination";
import Property from "@/models/Property.js";

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 9 } }) => {
  let properties = [];
  // console.log(searchParams);
  const skip = (page - 1) * pageSize;

  const total = await Property.countDocuments({});
  const showPagination = total > pageSize;

  //to count all the properties

  try {
    await connectDB();
    properties = await Property.find({}).skip(skip).limit(pageSize);
  } catch (error) {
    console.error("Error fetching properties:", error);
    // Optionally, handle the error state here
  }

  return (
    <section className="px-4 py-4">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
