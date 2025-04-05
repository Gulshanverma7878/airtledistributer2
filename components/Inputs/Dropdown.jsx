'use client';
import React from 'react';

const Dropdown = ({ options, value, onChange, name, placeholder }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
      required
    >
      <option value="">{placeholder || 'Select an option'}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
