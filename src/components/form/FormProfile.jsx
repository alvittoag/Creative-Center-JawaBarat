import React from "react";
import Navbar from "../globals/Navbar";
import DataPemohonProfile from "./DataPemohonProfile";
import DataIntansiProfile from "./DataIntansiProfile";
import { useLocation } from "react-router-dom";

export default function FormProfile() {
  const [active, setActive] = React.useState("Data Pemohon");
  const items = ["Data Pemohon", "Data Intansi"];

  const { state } = useLocation();

  const handleChange = (item) => {
    if (state.pemohon && state.intansi) {
      setActive(item);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex  bg-white">
        <div className="">
          <ul className=" bg-[#F6F6F6]  text-[15px] font-semibold w-64 h-screen">
            <li>
              <h2 className="menu-title text-black text-center">
                Form Pemohon dan Intansi
              </h2>
              <ul className="px-4 space-y-3 mt-5">
                {items.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleChange(item)}
                      className={`${
                        active === item
                          ? "rounded-md bg-gray-200 text-black"
                          : `${
                              state.pemohon && state.intansi
                                ? ""
                                : "cursor-not-allowed"
                            }`
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

        {active === "Data Pemohon" && (
          <DataPemohonProfile setActive={setActive} data={state?.pemohon} />
        )}
        {active === "Data Intansi" && (
          <DataIntansiProfile data={state?.intansi} />
        )}
      </div>
    </div>
  );
}
