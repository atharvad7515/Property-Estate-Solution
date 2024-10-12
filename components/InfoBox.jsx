import Link from "next/link";

const InfoBox = ({
  children,
  heading,
  bgcolor = "bg-gray-100",
  buttonInfo,
  textcolor = "text-gray-800",
}) => {
  return (
    <div className={`${bgcolor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textcolor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textcolor} mt-2 mb-4`}>{children}</p>
      <Link
        href={buttonInfo.Link}
        className={`${buttonInfo.bgcolor} inline-block
             text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {/* Browse Properties */}
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
