import InputField from "./InputField";

const companyFields = [
  { name: "companyName", label: "Company Name", type: "text" },
  { name: "foundedYear", label: "Founded Year", type: "number" },
  { name: "website", label: "Website URL", type: "text" },
  { name: "x", label: "X (Twitter) URL", type: "text" },
  { name: "linkedin", label: "LinkedIn URL", type: "text" },
  { name: "facebook", label: "Facebook URL", type: "text" },
];

const CompanyDetails = () => {
  return (
    <div className="flex flex-col">
      {/* Informational Note */}
      <h3 className="mb-4 text-xl text-gray-600">
        This section is not mandatory for students submitting their ideas. 
        This is to be filled by registered start-ups.
      </h3>

      {/* Company Details Section */}
      <h2 className="font-semibold mt-6 mb-4 text-2xl">Company Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companyFields.map((field) => (
          <InputField key={field.name} name={field.name} label={field.label} type={field.type} />
        ))}
      </div>
    </div>
  );
};

export default CompanyDetails;
