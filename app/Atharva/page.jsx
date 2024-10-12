import connectDB from "@/config/database";
import Atharva from "@/models/Atharva";
import "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";

const AtharvaPage = async () => {
  // Ensure the database connection is established
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return <p>User not authenticated</p>; // Handle unauthenticated state
  }

  const { userId } = sessionUser;
  console.log(userId);

  // Fetch read messages
  const readMessages = await Atharva.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 }) // Sort read Atharvas in desc order
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // Fetch unread messages
  const unreadMessages = await Atharva.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // Convert messages to serializable objects
  const Atharvas = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const Atharva = convertToSerializableObject(messageDoc);
    Atharva.sender = convertToSerializableObject(messageDoc.sender);
    Atharva.property = convertToSerializableObject(messageDoc.property);
    return Atharva;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {Atharvas.length === 0 ? (
              <p>You have no Atharvas</p>
            ) : (
              Atharvas.map((Atharva) => (
                <MessageCard key={Atharva._id} Atharva={Atharva} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtharvaPage; // Updated export name to be consistent
