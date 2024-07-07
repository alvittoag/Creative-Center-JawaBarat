import React from 'react'

export default function TextInputNonLabel(
    {
        placeholder,
        id,
        value,
        nama,
        onChange
    }
) {
  return (
    <div>
      <input 
        type="text" 
        placeholder={placeholder}
        id={id}
        value={value}
        name={nama}
        onChange={onChange}
        className="input input-bordered w-full max-w-xs bg-white text-black placeholder:text-sm mb-4" />
    </div>
  )
}
