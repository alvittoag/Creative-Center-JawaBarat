import React, { useState } from 'react'
import Navbar from '../../components/globals/Navbar'
import SideNav from '../../components/globals/SideNav'
import Calendar from '../../components/globals/Calendar/Calendar'
import dayjs from "dayjs";
import { generateDate, months } from "../../components/globals/Calender/calender";
import cn from "../../components/globals/Calender/cn"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { useNavigate } from "react-router-dom";


export default function JadwalAD({label}) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <div className='bg-white'>
      <Navbar/>
      <div className="flex">
        <SideNav/>
		<div className="flex gap-10 sm:divide-x bg-white text-black justify-center sm:w-1/2 mx-auto  h-screen mt-[40px] sm:flex-row flex-col">
			<div className="w-100 h-96 ">
        <p className='font-semibold'>Ruang Kreatif Ahmad Djuhara</p>
                <p className="pb-10 font-bold text-[20px] text-sky-950">{label}</p>
				<div className="flex justify-between items-center">
					<h1 className="select-none font-semibold">
						{months[today.month()]}, {today.year()}
					</h1>
					<div className="flex gap-10 items-center ">
						<GrFormPrevious
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						<h1
							className=" cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(currentDate);
							}}
						>
							Today
						</h1>
						<GrFormNext
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/>
					</div>
				</div>
				<div className="grid grid-cols-7 ">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
							>
								{day}
							</h1>
						);
					})}
				</div>

				<div className=" grid grid-cols-7 ">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<div
									key={index}
									className="p-2 text-center h-14 grid place-content-center text-sm border-t"
								>
									<h1
										className={cn(
											currentMonth ? "" : "text-gray-400",
											today
												? "bg-red-600 text-white"
												: "",
											selectDate
												.toDate()
												.toDateString() ===
												date.toDate().toDateString()
												? "bg-black text-white"
												: "",
											"h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
										)}
										onClick={() => {
											setSelectDate(date);
										}}
									>
										{date.date()}
									</h1>
								</div>
							);
						}
					)}
				</div>
			</div>
			<div className="h-96 w-96 sm:px-5">
				<h1 className=" font-semibold">
					Schedule for {selectDate.toDate().toDateString()}
				</h1>
                <div className="flex flex-col py-5">
                    <p>
                        Gor
                    </p>
                    <p className="text-gray-400 text-sm">Jadwal masih kosong</p>
                </div>
                <div className="flex flex-col py-5">
                    <p>
                        Workshop
                    </p>
                    <p className="text-gray-400 text-sm">Jadwal masih kosong</p>
                </div>
                <div className="flex flex-col py-5">
                    <p>
                        Plaza Terbuka
                    </p>
                    <p className="text-gray-400 text-sm">Jadwal masih kosong</p>
                </div>
                <div className="flex flex-col py-5">
                    <p>
                        Co-working Space
                    </p>
                    <p className="text-gray-400 text-sm">Jadwal masih kosong</p>
                </div>
                <div className="flex flex-col py-5">
                    <p>
                        Auditorium
                    </p>
                    <p className="text-gray-400 text-sm">Jadwal masih kosong</p>
                </div>
                <div className="flex flex-col py-5">
                    <p>
                        Kantin
                    </p>
                    <p className="text-gray-400 text-sm">Jadwal masih kosong</p>
                </div>
			</div>
		</div>
      </div>
    </div>
  )
}
