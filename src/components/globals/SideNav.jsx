import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideNav() {
  return (
    <div>
        <ul className="menu bg-[#F6F6F6] text-black text-[15px] font-semibold w-64 h-screen">
          <NavLink to="/jadwal">
            <li><a className="py-4">Bogor Creative Center</a></li>
          </NavLink>
          <NavLink to="/jadwalPCC">
            <li><a className="py-4">Purwakata Creative Center</a></li>
          </NavLink>
          <NavLink to="/jadwalAD">
            <li><a className="py-4">Ruang Kreatif Ahmad Djuhara</a></li>
          </NavLink>
        </ul>
    </div>
  )
}
