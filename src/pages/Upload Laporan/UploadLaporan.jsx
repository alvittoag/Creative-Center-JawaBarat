import React from "react";
import TextInput from "../../components/globals/TextInput";
import TextArea from "../../components/globals/TextArea";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import convertStringify from "../../lib/convertStringify";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabase";

export default function UploadLaporan() {
  const { state } = useLocation();

  const [rangkuman, setRangkuman] = React.useState("");

  const { id, pemohon, acara } = state;

  const dataPemohon = convertStringify(pemohon);
  const dataAcara = convertStringify(acara);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (rangkuman.length === 0) {
      Swal.fire({
        title: "Gagal",
        text: "Harap isi data rangkuman",
        icon: "error",
      });
    }

    try {
      const { error } = await supabase
        .from("peminjaman")
        .update({ user_status: "Selesai", rangkuman_acara: rangkuman })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dikonfirmasi",
      });

      navigate("/profile");
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Data gagal diupload",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white h-screen w-screen">
      <div className="pt-10 mb-[70px] flex flex-col items-center justify-center ">
        <div className="flex flex-col bg-[#fcfcfc] w-[40%] rounded-lg border justify-center py-10">
          <TextInput
            label={"Nama Pemohon"}
            placeholder={"Nama Lengkap Pemohon"}
            id={"namaPemohon"}
            nama={"namaPemohon"}
            value={dataPemohon.namaPemohon}
            type={"text"}
            disable
          />

          <TextArea
            label={"Rangkuman Acara"}
            placeholder={"Rangkuman Singkat Acara"}
            id={"rangkumanAcara"}
            nama={"rangkumanAcara"}
            type={"text"}
            value={rangkuman}
            onChange={(e) => setRangkuman(e.target.value)}
          />

          <TextInput
            label={"Nama Acara"}
            placeholder={"Nama Acara"}
            id={"namaKegiatan"}
            nama={"namaKegiatan"}
            type={"text"}
            value={dataAcara.namaAcara}
            disable
          />

          <TextInput
            label={"Jumlah Peserta"}
            placeholder={"Jumlah Peserta"}
            id={"jumlahPeserta"}
            nama={"jumlahPeserta"}
            type={"text"}
            value={dataAcara.jumlahPeserta}
            disable
          />

          <div className="flex justify-center mt-10">
            <div
              onClick={handleUpload}
              className="btn w-24 bg-green-400 text-black hover:bg-white"
            >
              Upload
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
