"use client"; // Ensure this component runs on the client-side

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  // Check if property is defined
  if (!property) {
    return null; // Or some fallback UI
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <div className="flex gap-3 justify-center pb-5">
          <FacebookShareButton
            url={shareUrl}
            quote={property.name}
            hashtag={`#${
              property.type ? property.type.replace(/\s/g, "") : "DefaultType"
            }ForRent`}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={property.name}
            hashtags={[
              `${
                property.type ? property.type.replace(/\s/g, "") : "DefaultType"
              }ForRent`,
            ]}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={property.name}
            separator=":: "
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={property.name}
            body={`Check out this property listing: ${shareUrl}`}
          >
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
        </div>
      </div>
    </>
  );
};

export default ShareButtons;
