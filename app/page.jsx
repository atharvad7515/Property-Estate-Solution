import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
// import FeaturedProperty from "@/components/FeaturedProperty";
import HomeProperties from "@/components/HomePropertiees";
import connectDB from "@/config/database";
import FeaturedProperty from "@/components/FeaturedProperty";

const Homepage = () => {
  connectDB();
  // console.log(process.env.MONGODB_URI);
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperty />
      <HomeProperties />
    </>
  );
};

export default Homepage;
