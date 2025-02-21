import * as yup from "yup";

export const jobSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  minSalary: yup
    .number()
    .typeError("Minimum salary must be a number")
    .required("Minimum salary is required"),
  maxSalary: yup
    .number()
    .typeError("Maximum salary must be a number")
    .required("Maximum salary is required")
    .min(yup.ref("minSalary"), "Maximum salary must be greater than minimum salary"),
    skillsRequired: yup
    .array()
    .of(yup.string().required("Skill cannot be empty"))
    .transform((value, originalValue) =>
      typeof originalValue === "string"
        ? originalValue.split(",").map((skill) => skill.trim())
        : value
    )
    .required("At least one skill is required"),
  experienceLevel: yup
    .string()
    .required("Experience level is required")
    .oneOf(["Entry", "Mid", "Senior"], "Experience level must be one of Entry, Mid, or Senior"),
  jobType: yup
    .string()
    .required("Job type is required")
    .oneOf(["Full-time", "Part-time", "Contract", "Remote"], "Invalid job type"),
  status: yup
    .string()
    .oneOf(["Open", "Closed"], "Status must be Open or Closed")
    .default("Open"),
    image: yup.mixed().required(' photo is required')
  
});
