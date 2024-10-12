import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            buttonInfo={{
              text: "browse properties",
              Link: "/properties",
              bgcolor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading="For Property Owners"
            bgcolor="bg-blue-200"
            buttonInfo={{
              text: "Add Property",
              Link: "/properties/add",
              bgcolor: "bg-blue-500",
            }}
          >
            List your properties and give your tenants rent as Airbnb or long
            term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
