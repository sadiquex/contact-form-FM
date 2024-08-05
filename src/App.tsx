import { useState, ChangeEvent, FormEvent } from "react";
import * as Yup from "yup";

// Define types for form data and errors
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  queryType: string;
  message: string;
  consent: boolean;
}

interface Errors {
  [key: string]: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Errors>({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    queryType: Yup.string().required("Query Type is required"),
    message: Yup.string().required("Message is required"),
    consent: Yup.bool().oneOf([true], "Consent is required"),
  });

  const validateField = async (field: keyof FormData, value: any) => {
    try {
      const fieldSchema = Yup.reach(validationSchema, field) as Yup.Schema<any>;
      await fieldSchema.validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: (err as Yup.ValidationError).message,
      }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));

    validateField(name as keyof FormData, fieldValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      alert("Form submitted successfully");
      // Handle form submission
    } catch (err) {
      const validationErrors: Errors = {};
      if (err instanceof Yup.ValidationError && err.inner) {
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full h-screen bg-primary-200 px-3 sm:p-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white py-12 px-6 rounded-lg min-w-[40%] space-y-4"
      >
        <h3 className="text-2xl font-medium text-neutral-900">Contact Us</h3>

        {/* first name and last name */}
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <div className="flex flex-col flex-1">
            <label htmlFor="firstName" className="text-label">
              First Name <sup className="text-primary-600">*</sup>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 rounded-md border border-neutral-500 outline-none"
            />
            {errors.firstName && (
              <div className="text-red-500">{errors.firstName}</div>
            )}
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="lastName" className="text-label">
              Last Name <sup className="text-primary-600">*</sup>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 rounded-md border border-neutral-500 outline-none"
            />
            {errors.lastName && (
              <div className="text-red-500">{errors.lastName}</div>
            )}
          </div>
        </div>

        {/* email address */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-label">
            Email address <sup className="text-primary-600">*</sup>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded-md border border-neutral-500 outline-none"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>

        {/* query type */}
        <div className="flex flex-col">
          <label htmlFor="queryType" className="text-label">
            Query Type <sup className="text-primary-600">*</sup>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <label
              htmlFor="general-equity"
              className="border border-gray-500 py-3 px-4 rounded-md flex-1"
            >
              <input
                name="queryType"
                type="radio"
                id="general-equity"
                value="General Equity"
                checked={formData.queryType === "General Equity"}
                onChange={handleChange}
                className="p-2 rounded-md border border-neutral-500 outline-none bg-blue-300 mr-2"
              />
              General Equity
            </label>

            <label
              htmlFor="support-request"
              className="border border-gray-500 py-3 px-4 rounded-md flex-1"
            >
              <input
                name="queryType"
                type="radio"
                id="support-request"
                value="Support Request"
                checked={formData.queryType === "Support Request"}
                onChange={handleChange}
                className="p-2 rounded-md border border-neutral-500 outline-none bg-blue-300 mr-2"
              />
              Support Request
            </label>
          </div>
          {errors.queryType && (
            <div className="text-red-500">{errors.queryType}</div>
          )}
        </div>

        {/* message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-label">
            Message <sup className="text-primary-600">*</sup>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="p-2 rounded-md border border-neutral-500 outline-none"
          />
          {errors.message && (
            <div className="text-red-500">{errors.message}</div>
          )}
        </div>

        {/* checkbox */}
        <div className="flex flex-col">
          <label htmlFor="consent" className="cursor-pointer">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2"
            />
            I consent to being contacted by the team{" "}
            <sup className="text-primary-600">*</sup>
          </label>
          {errors.consent && (
            <div className="text-red-500">{errors.consent}</div>
          )}
        </div>

        {/* button */}
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-600/85 w-full py-4 text-white font-medium rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
