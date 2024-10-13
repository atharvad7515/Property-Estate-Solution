"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
    //formData INItializatio here

    await connectDB();
    //formData data from where
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required");
    }

    const { userId } = sessionUser;
    // console.log(userId);

    // Access all values for amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((image) => image.name !== ""); //getting rid of map   
    // console.log('Images received:', images);
    // const imageUrls = [];
    // Upload images and get URLs
    // console.log("Property ID:", params.id);

    const propertyData = {

        type: formData.get("type"),
        name: formData.get("name"),
        description: formData.get("description"),
        location: {
            street: formData.get("location.street"),
            city: formData.get("location.city"),
            state: formData.get("location.state"),
            zipcode: formData.get("location.zipcode"),
        },
        beds: formData.get("beds"),
        baths: formData.get("baths"),
        square_feet: formData.get("square_feet"),
        amenities,
        rates: {
            weekly: formData.get("rates.weekly"),
            monthly: formData.get("rates.monthly"),
            nightly: formData.get("rates.nightly."),
        },
        seller_info: {
            name: formData.get("seller_info.name"),
            email: formData.get("seller_info.email"),
            phone: formData.get("seller_info.phone"),
        },
        owner: userId,
    };
    // console.log(formData);

    const imageUrls = [];

    for (const imagefile of images) {
        const imageBuffer = await imagefile.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        // Convert the image data to base64
        const imageBase64 = imageData.toString('base64');

        // Make request to upload to Cloudinary
        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
                folder: 'propertypulse',
            }
        );

        imageUrls.push(result.secure_url);

    }

    // console.log("Uploaded image URLs:", imageUrls);


    propertyData.images = imageUrls;

    const newProperty = new Property(propertyData);
    await newProperty.save();
    // console.log("Saving property with data:", propertyData);

    revalidatePath("/", "layout");

    redirect(`/properties/${newProperty._id}`);
}

export default addProperty;

//
