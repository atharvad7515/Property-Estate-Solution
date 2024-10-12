import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyImages from "@/components/PropertyImages";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import { convertToSerializableObject } from "@/utils/convertToObject";
import PropertyContactgForm from "@/components/PropertyContactForm";
import ShareButtons from "@/components/ShareButton";
import BookmarkButton from "@/components/BookmarkButton";

const property_page = async ({ params }) => {
  console.log("hi params are here :- ");
  console.log(params); // Debugging: Check if `params.id` is correctly passed
  await connectDB();

  if (!params.id) {
    return <div>Property ID is missing</div>;
  }

  try {
    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializableObject(propertyDoc);
    //here property

    if (!property) {
      return (
        <h1 className="text-center text-2xl font-bold mt-10">
          Property not found
        </h1>
      );
    }

    return (
      <>
        <PropertyHeaderImage image={property.images[0]} />
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Properties
            </Link>
          </div>
        </section>
        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              {/* Property Info */}
              <PropertyDetails property={property} />
              <aside className="space-y-4">
                <BookmarkButton property={property} />
                <ShareButtons property={property} />
                <PropertyContactgForm property={property} />
              </aside>
            </div>
          </div>
          <PropertyImages images={property.images} />
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching property:", error);
    return <div>Error loading property d ata</div>;
  }
  console.log("Fetched property:", property);
};

export default property_page;
