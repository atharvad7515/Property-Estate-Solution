"use client";
import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { toast } from "react-toastify";
import checkBookmarkStatus from "@/app/actions/CheckBookmarkStatus";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const [isBookmarked, setIsBookmarked] = useState(false); // Initialize the state

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });

    // setIsBookmarked(res.isBookmarked); // Update bookmark state
    toast.success(res.message); // Display success message
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return isBookmarked ? (
    <button
      className="text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center bg-blue-500 hover:bg-blue-600"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;

// "use client";
// import { useState, useEffect } from "react";
// import { FaBookmark } from "react-icons/fa";
// import { useSession } from "next-auth/react";
// import bookmarkProperty from "@/app/actions/bookmarkProperty";
// import { toast } from "react-toastify";

// const BookmarkButton = ({ property }) => {
//   const { data: session, status } = useSession();
//   const userId = session?.user?.id;
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const handleClick = async () => {
//     if (!userId) {
//       toast.error("You need to sign in to bookmark a property");
//       return;
//     }

//     const res = await bookmarkProperty(property._id);
//     if (res.error) {
//       toast.error(res.error);
//       return;
//     }
//     setIsBookmarked(res.isBookmarked);
//     toast.success(res.message);
//   };

//   return (
//     <button
//       className="text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center bg-blue-500"
//       onClick={handleClick}
//       disabled={status === "loading"}
//     >
//       <FaBookmark className="mr-2" />
//       {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
//     </button>
//   );
// };
