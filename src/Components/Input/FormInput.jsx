import React from "react";

const FormInput = ({
  name,
  label,
  type = "text",
  register,
  errors = {},
  placeholder = "",
  className = "",
  required = false,
}) => {
  const errorMessage = errors?.[name]?.message;

  return (
    <div className={`mb-5 w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || `Enter ${label}`}
        {...(register ? register(name) : {})}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${name}-error` : undefined}
        className={`w-full px-4 py-2 rounded-lg border 
          bg-gray-900 text-white placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary 
          transition
          ${
            errorMessage
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:border-primary"
          }`}
      />

      {/* Error Message */}
      {errorMessage && (
        <p id={`${name}-error`} className="text-red-500 text-xs mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;



