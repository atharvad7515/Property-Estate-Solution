import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  // console.log("Image path:", image);

  return (
    <section>
      <div className="container-xl m-auto">
        <div className="relative w-full h-[400px]">
          <Image
            src={image} // Ensure `image` is a complete URL or a valid path.
            alt="Property Image"
            fill // Use fill to make the image responsive
            style={{ objectFit: "cover" }} // Ensures the image covers the container
            className="rounded-t-xl"
          />
          Propheader
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
