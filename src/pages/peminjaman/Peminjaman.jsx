import React from "react";
import Navbar from "../../components/globals/Navbar";
import DataPemohon from "../../components/form/DataPemohon";
import DataIntansi from "../../components/form/DataIntansi";
import DataAcara from "../../components/form/DataAcara";

export default function PeminjamanRuangan() {
  const [active, setActive] = React.useState("Data Acara");
  const items = ["Data Acara"];

  const [dataSend, setDataSend] = React.useState({
    pemohon: {},
    intansi: {},
    acara: {},
  });

  return (
    <div>
      <Navbar />
      <div className="flex  bg-white">
        <div></div>
        <div className="">
          <ul className=" bg-[#F6F6F6]  text-[15px] font-semibold w-64 h-screen">
            <li>
              <h2 className="menu-title text-black text-center">
                Form Peminjaman Ruangan
              </h2>
              <ul className="px-4 space-y-3 mt-5">
                {items.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`${
                        active === item
                          ? "rounded-md bg-gray-200 text-black"
                          : "cursor-not-allowed"
                      } p-3 w-full`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* {active === "Data Pemohon" && (
          <DataPemohon setDataSend={setDataSend} setActive={setActive} />
        )}
        {active === "Data Intansi" && (
          <DataIntansi setDataSend={setDataSend} setActive={setActive} />
        )} */}

        {active === "Data Acara" && (
          <DataAcara setDataSend={setDataSend} dataSend={dataSend} />
        )}
      </div>
    </div>
  );
}
