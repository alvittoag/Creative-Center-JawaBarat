import React from "react";

export default function TextInput({
  placeholder,
  id,
  value,
  onChange,
  label,
  nama,
  type,
  disable,
}) {
  return (
    <label className="grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
      <div className="label">
        <span className="label-text text-black">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={nama}
        value={value}
        onChange={onChange}
        disabled={disable}
        className="input input-bordered w-56 bg-white placeholder:text-sm disabled:bg-gray-100 disabled:border-none disabled:text-slate-500"
      />
    </label>
  );
}
