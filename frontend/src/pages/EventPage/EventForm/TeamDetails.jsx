import { useFormContext, useFieldArray } from "react-hook-form";
import InputField from "./InputField";
import { FiX } from "react-icons/fi";
import StarMark from "./StarMark";

const TeamDetails = () => {
  const { control, trigger, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const staticFields = {
    ideaDetails: [
      { name: "title", label: "Title of Idea/Start-up", type: "text" },
      { name: "institution", label: "Name of Institution/University/Incubation", type: "text" },
    ],
    contactDetails: [
      { name: "address", label: "Address", type: "text" },
      { name: "city", label: "City", type: "text" },
      { name: "district", label: "District", type: "text" },
      { name: "state", label: "State", type: "text" },
      { name: "email", label: "E-mail", type: "email" },
      { name: "number", label: "Mobile Number/Landline", type: "number" },
      { name: "website", label: "Website", type: "text" },
      { name: "x", label: "X URL", type: "text" },
      { name: "linkedin", label: "LinkedIn URL", type: "text" },
      { name: "facebook", label: "Facebook URL", type: "text" },
      { name: "alternateNumber", label: "Alternate Contact Number", type: "number" },
    ],
  };

  // Ensure at least one team member exists on mount
  if (fields.length === 0) {
    append({ name: "", education: "", additionalAchievement: "", pastExperience: "" }, {shouldFocus: false});
  }

  // Handle Adding New Team Member
  const handleAddMember = async () => {
      const isValid = await trigger("teamMembers"); // 🔥 Ensure validation before adding
      if (!isValid) return;
      append({ name: "", education: "", additionalAchievement: "", pastExperience: "" });

  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Idea Details */}
      <div>
        <h2 className="font-semibold mb-2 text-2xl">Idea Details:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staticFields.ideaDetails.map((field) => (
            <InputField key={field.name} {...field} starMark="true" />
          ))}
        </div>
      </div>

      {/* Team Details */}
      <div>
      <h2 className="font-semibold mb-2 text-2xl">Team Details:</h2>

      {fields.map((member, index) => (
        <div key={member.id} className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 border p-4 rounded-md mb-2">
          {/* Remove button (only for new team members, not the first one) */}
          {fields.length > 1 && index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 p-2 text-red-600 hover:text-red-500 cursor-pointer transition"
            >
              <FiX size={28} />
            </button>
          )}
          <h3 className="text-lg font-semibold col-span-2">Team Member {index + 1}</h3>
        <div>
        <InputField
          name={`teamMembers.${index}.name`}
          label="Team Member Name"
          starMark="true"
        />
        {errors.teamMembers?.[index]?.name && (
          <p className="text-red-500 text-sm">
            {errors.teamMembers[index].name.message}
          </p>
        )}
        </div>

        <div>
        <InputField
          name={`teamMembers.${index}.education`}
          label="Education"
          starMark="true"
        />
        {errors.teamMembers?.[index]?.education && (
          <p className="text-red-500 text-sm">
            {errors.teamMembers[index].education.message}
          </p>
        )}
        </div>

        <InputField
          name={`teamMembers.${index}.additionalAchievement`}
          label="Additional Achievement"
        />

        <InputField
          name={`teamMembers.${index}.pastExperience`}
          label="Past Experience"
        />
      </div>
      ))}

      {/* Add More Team Members Button */}
      <button
        type="button"
        onClick={handleAddMember}
        className="bg-red-600 text-white px-4 py-2 mt-3 rounded hover:bg-red-500 cursor-pointer"
      >
        + Add More Team Member
      </button>
    </div>

      {/* Contact Details */}
      <div>
        <h2 className="font-semibold mb-2 text-2xl">
          Primary Contact Details (All communications will be done to given contact details):
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staticFields.contactDetails.map((field) => (
            <InputField key={field.name} {...field}
            starMark={["address", "city", "district", "state", "email", "number"].includes(field.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
