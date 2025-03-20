import RadioButtonField from "./RadioButtonField";
import TextAreaField from "./TextAreaField";

const OtherDetails = () => {

    const hearAbout = [
        { label: "Competition Website", value: "Competition Website" },
        { label: "Social Media (Facebook, Instagram, LinkedIn)", value: "Social Media (Facebook, Instagram, LinkedIn)" },
        { label: "Poster/Flyer", value: "Poster/Flyer" },
        { label: "Newspaper", value: "Newspaper" },
        { label: "Friends & Family", value: "Friends & Family" }
      ];

      const guidelines = [
        "Application has to be submitted online/offline.",
        "Refer to the competition application form in advance and have necessary details ready while applying.",
        "Type the answers to all questions in the space provided in a typed format.",
        "Do not overlap answers with other questions.",
        "Follow the word limit given for each question.",
        "Incomplete applications will not be entertained.",
        "Applicants submitting their answers in Hindi/Bengali are advised to prepare a Gujarati write-up in an MS Word document in advance and paste it in the appropriate boxes while applying.",
        "The start-up team can have multiple team members; however the applicants are advised to provide details of three to four leading members who will represent the team duringsemifinal & final round of pitching and also participate in .Inc Conference.",
        "The registration fee if any has to be paid online during final stage of application. Theprimary email & mobile number given during application & registration fees paymentmust be same. The applications failed to submit registration fees will not be accepted. Theregistration fees are non refundable.",
        "Letter of Association, Bonafide Certificates or Official Letter from college/universityauthority are required to be submitted along with application. Respective documentsshould be scanned & saved as PDF format with name of Idea/Enterprise as the file name.The size of that document should not exceed 10MB. No additional files can be attachedduring submission.",
        "Failure to disclose vital information or misrepresentation by participant/s can lead todisqualification and could also affect participation in future editions of PRAXIA SKILL –STARTOVATION Competition for Entrepreneurs.",
        "The participant/s retain all the rights of their proposal, however, the information sharedwill be used for the purpose of this competition."
      ];
    return(
        <div className="flex flex-col space-y-8">
              
    
                <div>
                  <h2 className="font-semibold text-xl">Additional Information to disclose about your idea start-up.:</h2>
                  <TextAreaField
                  placeholder="Details of Product Patent, Copyright, Awards etc. (word limit: 50)"
                  name="additional"  
                  />
                </div>

                <div>
                <h2 className="font-semibold text-xl">From where did you hear about this competition? (please tick)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hearAbout.map((hear) => (
                    <RadioButtonField key={hear.value} name="hearAbout" {...hear} />
                  ))}
                </div>

                <div className="">
                <h2 className="text-xl font-semibold mb-2 mt-12 text-center">Guidelines for Application</h2>
      <ul className="list-disc list-outside pl-5 text-lg  space-y-2">
        {guidelines.map((item, index) => (
          <li key={index} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>
                
    </div>
  </div>
    )
}
export default OtherDetails;
