import React from 'react'

export default function Select({
    label,
    option
}) {
  return (
    <div>
      <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
            <div className="label">
                <span className="label-text text-black"></span>
            </div>
            <select className="select select-bordered w-52 bg-white placeholder:text-sm text-black">
                <option disabled selected>Pilih</option>
                <option></option>
            </select>
        </label>
    </div>
  )
}
