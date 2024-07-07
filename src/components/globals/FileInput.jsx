import React from 'react'

export default function FileInput() {
  return (
    <div>
        <label className="form-control w-full max-w-xs ml-20 mt-4 label">
            <div className="label">
                <span className="label-text">Pick a file</span>
            </div>
            <input 
                type="file" 
                className="file-input file-input-bordered w-full max-w-xs" />
        </label>
    </div>
  )
}
