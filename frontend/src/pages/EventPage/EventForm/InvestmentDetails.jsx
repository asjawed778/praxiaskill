import { useFormContext } from "react-hook-form";
import InputField from "./InputField";
import RadioButtonField from "./RadioButtonField";
import StarMark from "./StarMark";
const InvestmentDetails = () => {
  const { watch, formState: { errors } } = useFormContext();
  const investmentSelected = watch("investmentDetails");
  const fundingReceived = watch("fundingReceived");

  return (
    <div className="flex flex-col">
      {/* Question 1 - What are you looking for? */}
      <h2 className="font-semibold mt-8 mb-2 text-2xl">
        What are you looking for? (Investment, Mentorship, etc.)<StarMark />
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {["Investment", "Mentorship", "Other"].map((option) => (
          <RadioButtonField 
            key={option}
            label={option}
            value={option.toLowerCase()}
            name="investmentDetails"
          />
        ))}
        {errors.investmentDetails && (
        <p className="text-red-500 text-sm mt-1">{errors.investmentDetails.message}</p>
      )}
      </div>

      {/* Show input if "Other" is selected */}
      {investmentSelected === "other" && (
        <InputField
          name="otherDetails"
          type="text"
          placeholder="Enter other details"
          starMark="true"
        />
      )}

      {/* Question 2 - Have you received funding? */}
      <h2 className="font-semibold mt-8 mb-2 text-2xl">Have you received funding?<StarMark /></h2>
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
        {["Yes", "No"].map((option) => (
          <RadioButtonField 
            key={option}
            label={option}
            value={option.toLowerCase()}
            name="fundingReceived"
          />
        ))}
        {errors.fundingReceived && (
        <p className="text-red-500 text-sm mt-1">{errors.fundingReceived.message}</p>
      )}
      </div>

      {/* Show funding details if "Yes" is selected */}
      {fundingReceived === "yes" && (
        <div className="mt-4">
          <InputField
            label="How much funding have you received?"
            type="number"
            name="fundingAmount"
            placeholder="Enter amount in Rs."
            starMark="true"
          />

          <h3 className="font-semibold mt-4 mb-2 text-lg">Source of Funding:</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {["Crowdfunding", "Seed Funding", "VC Firm", "Individual"].map((source) => (
              <RadioButtonField
                key={source}
                label={source}
                value={source.toLowerCase()}
                name="fundingSource"
              />
            ))}
          {errors.fundingSource && (
        <p className="text-red-500 text-sm mt-1">{errors.fundingSource.message}</p>
      )}
          </div>
        </div>
      )}

      {/* Funding Requirement */}
      <h2 className="font-semibold mt-8 mb-2 text-2xl">Requirement of Funding:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["2025", "2026"].map((year) => (
          <InputField
            key={year}
            label={`FY ${year}`}
            type="number"
            name={`requirement${year}`}
            placeholder="Enter amount in Rs."
            starMark={["requirement2025", "requirement2026"].includes(name)}
          />
        ))}
      </div>
    </div>
  );
};

export default InvestmentDetails;


