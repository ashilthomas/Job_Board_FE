const FormInput = ({ name, label, type = "text", register, errors, className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        {...register(name)}
        className={`bg-inherit border rounded-md p-2 w-full ${
          errors[name] ? "border-red-500" : "border-gray-400"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormInput;



