import React from 'react'

export default function CardRuangan({src, title, kapasitas}) {
  return (
    <div>
      <div className="card w-72 bg-white h-80 text-black shadow-xl hover:scale-110 mr-6">
        <figure><img src={src} alt="Shoes" className='w-72 h-48' /></figure>
            <div className="card-body">
                <h2 className="card-title">
                {title}
                </h2>
                    <div className="badge bg-[#1A8C44] text-white text-[13px]">{kapasitas}</div>
            </div>
        </div>
    </div>
  )
}
