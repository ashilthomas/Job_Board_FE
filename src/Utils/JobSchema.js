// src/Utils/JobSchema.js
import * as yup from "yup";

export const jobSchema = yup.object().shape({
  title: yup.string().trim().required("Job title is required"),
  description: yup.string().trim().required("Description is required"),
  location: yup.string().trim().required("Location is required"),

  minSalary: yup
    .number()
    .required("Minimum salary is required")
    .min(0, "Minimum salary cannot be negative"),

  maxSalary: yup
    .number()
    .required("Maximum salary is required")
    .moreThan(yup.ref("minSalary"), "Maximum salary must be greater than minimum salary"),

  skillsRequired: yup
    .array()
    .of(yup.string().trim().required("Skill cannot be empty"))
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);
      }
      return value;
    })
    .min(1, "At least one skill is required"),

  experienceLevel: yup
    .string()
    .required("Experience level is required")
    .oneOf(["Entry", "Mid", "Senior"], "Invalid experience level"),

  jobType: yup
    .string()
    .required("Job type is required")
    .oneOf(["Full-time", "Part-time", "Contract", "Remote"], "Invalid job type"),

  status: yup
    .string()
    .oneOf(["Open", "Closed"], "Status must be Open or Closed")
    .default("Open"),

image: yup
  .mixed()
  .required("Photo is required")
 
});