import { useFormContext } from "react-hook-form";
import RadioButtonField from "./RadioButtonField";
import StarMark from "./StarMark";
import TextAreaField from "./TextAreaField";

const IdeaDescription = () => {
  const { formState: { errors } } = useFormContext();
  const startupStages = [
    { label: "Idea", value: "idea" },
    { label: "Idea with Prototype", value: "Idea with Prototype" },
    { label: "Pilot Launched", value: "Pilot Launched" },
    { label: "Already Launched", value: "Already Launched" },
  ];

  const sectors = [
    { label: "Hospital", value: "Hospital" },
    { label: "Social Development and Art & Culture", value: "Social Development and Art & Culture" },
    { label: "Tech Automation", value: "Tech Automation" },
    { label: "Supply Chain & Logistics", value: "supplyChain" },
    { label: "Fin Tech", value: "Fin Tech" },
    { label: "Media, Communication & Entertainment", value: "Media, Communication & Entertainment" },
    { label: "IoT", value: "IoT" },
    { label: "Textile & Apparels", value: "Textile & Apparels" },
    { label: "Health-Wellness & Pharma", value: "Health-Wellness & Pharma" },
    { label: "Food and Beverage", value: "Food and Beverage" },
    { label: "Environment, Green Tech & Sustainability", value: "Environment, Green Tech & Sustainability" },
    { label: "FMCG", value: "FMCG" },
  ];

  const businessModels = [
    { label: "For Profit", value: "For Profit" },
    { label: "Not for Profit", value: "Not for Profit" },
    { label: "Hybrid", value: "Hybrid" },
  ];

  const ventureTypes = [
    { label: "Single Ownership", value: "Single Ownership" },
    { label: "Partnership/LLP", value: "Partnership/LLP" },
    { label: "Others", value: "Others" },
  ];

  const textAreas = [
    {
      label: "Description of idea and source of your inspiration",
      name: "explainIdea",
      placeholder: "Explain your idea, from where/which events did you get the inspiration for it? (word limit: 150)",
    },
    {
      label: "Idea Overview",
      name: "explainObjective",
      placeholder:
        "Explain the objective of your idea. Also explain its core offerings and probable outputs. (word limit: 200)",
    },
    {
      label: "Product Description",
      name: "explainProduct",
      placeholder:
        "Explain what is your product (software, technology, intervention, design, research, prototype etc.), its distinct features & advantages. Additionally, give details of product’s offerings. (word limit: 150)",
    },
    {
      label: "Explain pain points your idea/product primarily address",
      name: "explainPainPoint",
      placeholder:
        "What current issues and challenges of society/sector/lifestyle your idea addresses? What is your idea’s approach to solve these issues? (word limit: 150)",
    },
    {
      label: "Explain your business model",
      name: "explainBusiness",
      placeholder: "How does/will your venture make money? (word limit: 200)",
    },
    {
      label: "Describe your Market & Consumer",
      name: "explainMarket",
      placeholder:
        "Explain the market for your product, current pricing, category of consumer, growth trends. (word limit: 100)",
    },
    {
      label: "Major Competitors & Barriers",
      name: "explainCompetitor",
      placeholder:
        "Explain your competitor products (Give specific Product/Company). Major barriers you will face entering in market and how do you plan to overcome these barriers. (word limit: 150)",
    },
    {
      label: "How will you scale the venture?",
      name: "explainVenture",
      placeholder:
        "Is your product replicable? If yes, then how will you overcome that challenge? (word limit: 150)",
    },
    {
      label: "What makes your management team qualified to scale-up proposed idea?",
      name: "explainManagement",
      placeholder: "(word limit: 100)",
    },
    {
      label: "What social/environmental co-benefits that your venture can generate, if any?",
      name: "explainSocial",
      placeholder: "(word limit: 100)",
    },
  ];

  return (
    <div className="flex flex-col space-y-8">
      {/* Stage of Start-up */}
      <div>
        <h2 className="font-semibold text-xl ">Stage of Start-up (Please tick)<StarMark /></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {startupStages.map((stage) => (
            <RadioButtonField key={stage.value} name="ideaStage" {...stage} />
          ))}
          {errors.ideaStage && (
        <p className="text-red-500 text-sm mt-1">{errors.ideaStage.message}</p>
      )}
        </div>
      </div>

      {/* Idea Belonging to Sector */}
      <div>
        <h2 className="font-semibold text-xl">Idea Belonging to Sector (Please tick)<StarMark /></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sectors.map((sector) => (
            <RadioButtonField key={sector.value} name="ideaSector" {...sector} />
          ))}
          {errors.ideaSector && (
        <p className="text-red-500 text-sm mt-1">{errors.ideaSector.message}</p>
      )}
        </div>
      </div>

      {/* Business Model */}
      <div>
        <h2 className="font-semibold text-xl ">Business Model (Please tick)<StarMark /></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {businessModels.map((model) => (
            <RadioButtonField key={model.value} name="businessModel" {...model} />
          ))}
          {errors.businessModel && (
        <p className="text-red-500 text-sm mt-1">{errors.businessModel.message}</p>
      )}
        </div>
      </div>

      {/* Type of Venture */}
      <div>
        <h2 className="font-semibold text-xl ">Type of Venture (Please tick)<StarMark /></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ventureTypes.map((venture) => (
            <RadioButtonField key={venture.value} name="ventureType" {...venture} />
          ))}
        {errors.ventureType && (
        <p className="text-red-500 text-sm mt-1">{errors.ventureType.message}</p>
      )}
        </div>
      </div>

      {/* Text Area Fields */}
      {textAreas.map(({ label, name, placeholder }) => (
        <div key={name}>
          <h2 className="font-semibold text-xl">{label}:</h2>
          <TextAreaField name={name} placeholder={placeholder} 
          starMark={["explainIdea", "explainObjective", "explainProduct", "explainPainPoint", "explainBusiness", "explainMarket", "explainCompetitor", "explainVenture", "explainManagement", "explainSocial"].includes(name)}
          />
        </div>
      ))}
    </div>
  );
};

export default IdeaDescription;
