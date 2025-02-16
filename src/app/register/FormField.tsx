import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder: string;
  type?: string; // Make type optional
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, handleChange, placeholder, type = 'text' }) => {
  return (
    <div className="flex flex-col">
      <label className="text-white mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-input bg-zinc-800 text-white p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#fc1464] transition duration-300"
      />
    </div>
  );
};

export default FormField;