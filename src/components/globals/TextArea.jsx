import React from 'react'

export default function TextArea(
    {
        placeholder,
        id,
        nama,
        value,
        onChange,
        label
    }
) {
  return (
    <div>
        <label className="form-control grid grid-cols-2 w-full max-w-xs ml-20 mt-4 label">
            <div className="">
                <span className="label-text text-black">{label}</span>
            </div>
            <textarea 
                className="textarea textarea-bordered h-24 w-52 bg-white placeholder:text-sm" 
                placeholder={placeholder}
                id={id}
                name={nama}
                value={value}
                onChange={onChange}></textarea>
        </label>
    </div>
  )
}
