import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Category from "./Category";
import TeamDetails from "./TeamDetails";
import CompanyDetails from "./CompanyDetails";
import { categorySchema, companySchema, ideaSchema, investmentSchema, otherDetailsSchema, teamSchema } from "./validation";
import IdeaDescription from "./IdeaDescription";
import InvestmentDetails from "./InvestmentDetails";
import OtherDetails from "./OtherDetails";
import { useCcfsEventMutation } from "../../../services/auth.api";
import toast from "react-hot-toast";
import ButtonLoading from "../../../components/Button/ButtonLoading";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    name: "Category Selection",
    component: Category,
    validation: categorySchema
  },
  {
    name: "Team Details",
    component: TeamDetails,
    validation: teamSchema
  },
  {
    name: "Company Details",
    component: CompanyDetails,
    validation: companySchema
  },
  {
    name: "Idea Description",
    component: IdeaDescription,
    validation: ideaSchema
  },
  {
    name: "Investment Requirement",
    component: InvestmentDetails,
    validation: investmentSchema
  },
  {
    name: "Other Details",
    component: OtherDetails,
    schema: otherDetailsSchema
  }
];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: steps[step].validation ? yupResolver(steps[step].validation) : undefined,
    mode: "onChange",
  });
  const [ccfsEvent, { isLoading, error }] = useCcfsEventMutation();

  // const methods = useForm();
  const onSubmit = async (data) => {
    console.log("Step Data:", data);

    const isValid = await methods.trigger();
    if (!isValid) return;

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      try {
        await ccfsEvent(data);
        navigate("/ccfs");
        toast.success("Form submitted successfully");
      } catch (error) {
        toast.error("Failed to submit the form");
      }
    }
  };

  const StepComponent = steps[step].component;

  return (
    <FormProvider {...methods}>
      <div className="ml-10 mr-10 p-6  shadow-md rounded-lg">
        {/* Display the Current Step Name */}
        <h2 className="text-3xl font-semibold text-center text-red-500">{steps[step].name}</h2>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 m-4">
          <StepComponent />
          <div className={`flex ${step === 0 ? "justify-end" : "justify-between"} mt-4`}>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-500 cursor-pointer"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-40 h-12 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 cursor-pointer"
            >
              {step === steps.length - 1 ? (isLoading ? <ButtonLoading /> : "Submit") : "Save & Next"}
            </button>

          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
