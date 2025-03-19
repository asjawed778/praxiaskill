import RadioButtonField from "./RadioButtonField";
import TextAreaField from "./TextAreaField";

const OtherDetails = () => {

    const hearAbout = [
        { label: "Competition Website", value: "Competition Website" },
        { label: "Social Media (Facebook, Instagram, LinkedIn)", value: "Social Media (Facebook, Instagram, LinkedIn)" },
        { label: "Poster/Flyer", value: "Poster/Flyer" },
        { label: "Newspaper", value: "Newspaper" },
        { label: "Friends & Family", value: "Friends & Family" },
      ];
    return(
        <div className="flex flex-col space-y-8">
              
    
                <div>
                  <h2 className="font-semibold text-2xl">Additional Information to disclose about your idea start-up.:</h2>
                  <TextAreaField
                  placeholder="Details of Product Patent, Copyright, Awards etc. (word limit: 50)"
                  name="additional"  
                  />
                </div>

                <div>
                <h2 className="font-semibold text-2xl">Idea Belonging to Sector (Please tick)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hearAbout.map((hear) => (
                    <RadioButtonField key={hear.value} name="ideaSector" {...hear} />
                  ))}
                </div>
              </div>
            </div>
    )
}
export default OtherDetails;