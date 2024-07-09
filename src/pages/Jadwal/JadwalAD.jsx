import React, { useState } from "react";
import Navbar from "../../components/globals/Navbar";
import SideNav from "../../components/globals/SideNav";
import Calendar from "../../components/globals/Calendar/Calendar";
import dayjs from "dayjs";
import {
  generateDate,
  months,
} from "../../components/globals/Calender/calender";
import cn from "../../components/globals/Calender/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import convertStringify from "../../lib/convertStringify";
import { findRuangan } from "../../lib/findRuangan";
import { getRuangan } from "../../lib/getRuangan";
import Swal from "sweetalert2";
import LabelRuangan from "../../components/LabelRuangan";

export default function JadwalAD({ label }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const [jadwalRuangan, setJadwalRuangan] = useState({
    gor: {},
    workshop: {},
    plazaTerbuka: {},
    CoworkingSpace: {},
    auditorium: {},
    kantin: {},
  });

  React.useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase.from("peminjaman").select("*");

        if (error) {
          throw error;
        }

        const dateNow = today.toDate().toLocaleDateString();
        const dateSelect = selectDate.toDate().toLocaleDateString();

        const filteredDate = data?.filter((item) => {
          const date = new Date(
            convertStringify(item.acara).tanggalMulaiAcara
          ).toLocaleDateString();
          return date === dateNow || date === dateSelect;
        });

        const filteredLocation = filteredDate?.filter((item) => {
          return (
            convertStringify(item.acara).lokasiGedung ===
              "Ruang Kreatif Ahmad Djuhara" &&
            item.admin_utama_status === "Disetujui"
          );
        });

        const gor = findRuangan({
          data: filteredLocation,
          namaRuangan: "Gor",
        });

        const workshop = findRuangan({
          data: filteredLocation,
          namaRuangan: "Workshop",
        });

        const plazaTerbuka = findRuangan({
          data: filteredLocation,
          namaRuangan: "Plaza Terbuka",
        });

        const coWorkingSpace = findRuangan({
          data: filteredLocation,
          namaRuangan: "Co-working Space",
        });

        const auditorium = findRuangan({
          data: filteredLocation,
          namaRuangan: "auditorium",
        });

        const kantin = findRuangan({
          data: filteredLocation,
          namaRuangan: "Kantin",
        });

        setJadwalRuangan((prev) => ({
          ...prev,
          gor: getRuangan({
            data: gor,
            ruangan: "Gor",
          }),
          workshop: getRuangan({
            data: workshop,
            ruangan: "Workshop",
          }),
          plazaTerbuka: getRuangan({
            data: plazaTerbuka,
            ruangan: "Plaza Terbuka",
          }),
          auditorium: getRuangan({
            data: auditorium,
            ruangan: "Auditorium",
          }),
          CoworkingSpace: getRuangan({
            data: coWorkingSpace,
            ruangan: "Co-working Space",
          }),
          kantin: getRuangan({
            data: kantin,
            ruangan: "Kantin",
          }),
        }));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengambil data",
        });
        console.log(error);
      }
    };

    getData();
  }, [selectDate]);
  return (
    <div className="bg-white">
      <Navbar />
      <div className="flex">
        <SideNav />
        <div className="flex gap-10 sm:divide-x bg-white text-black justify-center sm:w-1/2 mx-auto  h-screen mt-[40px] sm:flex-row flex-col">
          <div className="w-100 h-96 ">
            <p className="font-semibold">Ruang Kreatif Ahmad Djuhara</p>
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
                    setSelectDate(currentDate);
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
                          today ? "bg-red-600 text-white" : "",
                          selectDate.toDate().toDateString() ===
                            date.toDate().toDateString()
                            ? "bg-black text-white"
                            : "",
                          "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                        )}
                        onClick={() => {
                          setToday(date);
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
              <p>Gor</p>
              <LabelRuangan data={jadwalRuangan.gor} />
            </div>
            <div className="flex flex-col py-5">
              <p>Workshop</p>
              <LabelRuangan data={jadwalRuangan.workshop} />
            </div>
            <div className="flex flex-col py-5">
              <p>Plaza Terbuka</p>
              <LabelRuangan data={jadwalRuangan.plazaTerbuka} />
            </div>
            <div className="flex flex-col py-5">
              <p>Co-working Space</p>
              <LabelRuangan data={jadwalRuangan.CoworkingSpace} />
            </div>
            <div className="flex flex-col py-5">
              <p>Auditorium</p>
              <LabelRuangan data={jadwalRuangan.auditorium} />
            </div>
            <div className="flex flex-col py-5">
              <p>Kantin</p>
              <LabelRuangan data={jadwalRuangan.kantin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
