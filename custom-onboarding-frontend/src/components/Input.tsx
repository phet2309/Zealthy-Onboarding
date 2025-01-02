import React from 'react';
import { FormInputProps } from '../types';

// Generic input component
const FormInput: React.FC<FormInputProps> = ({ label, type, id, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded w-64"
      />
    </div>
  );
};

export default FormInput;
