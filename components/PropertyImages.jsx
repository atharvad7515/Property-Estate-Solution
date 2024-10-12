"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        Images nk
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]} // Corrected typo "imahes" to "images"
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  src={images[0]} // Use images[0] to get the single image
                  alt="Property Image"
                  ref={ref}
                  onClick={open}
                  className="object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
                  width={700}
                  height={300}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="col-span-1">
                  <Item
                    original={image} // Use the correct image for each item
                    thumbnail={image} // Corrected typo "imahes" to "images"
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        src={image} // Use the image variable from the map function
                        alt={`Property Image ${index + 1}`}
                        ref={ref} // Added ref here for the map loop
                        onClick={open} // Added onClick for opening the image
                        className="object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
                        width={1800}
                        height={400}
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
