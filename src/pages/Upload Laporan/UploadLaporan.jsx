import React, { useState } from "react";
import TextInput from "../../components/globals/TextInput";
import TextArea from "../../components/globals/TextArea";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import convertStringify from "../../lib/convertStringify";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabase";
import { getValues } from "../../lib/getValues";

export default function UploadLaporan() {
  const { state } = useLocation();

  const [rangkuman, setRangkuman] = React.useState("");

  const { id, pemohon, acara } = state;

  const dataPemohon = convertStringify(pemohon);
  const dataAcara = convertStringify(acara);

  const [foto, setfoto] = useState(null);
  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const peserta = getValues(convertStringify(dataAcara.jumlahPesertas)).join(
    ", "
  );

  const navigate = useNavigate();

  const uploadFoto = async () => {
    setLoadingUpload(true);

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("berkas")
        .upload(`bukti/${dataPemohon.namaPemohon} - ${Math.random()}`, foto);

      if (uploadError) {
        console.error(uploadError);
        return { error: true };
      }

      const { data, error: publicURLError } = await supabase.storage
        .from("berkas")
        .getPublicUrl(uploadData.path);

      if (publicURLError) {
        console.error(publicURLError);
        return { error: true };
      }

      return { foto: data.publicUrl };
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      return { error: true };
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleUpload = async () => {
    if (rangkuman.length === 0) {
      return Swal.fire({
        title: "Gagal",
        text: "Harap isi data rangkuman",
        icon: "error",
      });
    }

    if (!foto) {
      return Swal.fire({
        title: "Laporan",
        text: "Harap unggah Foto",
        icon: "error",
      });
    }

    const upload = await uploadFoto();

    if (upload?.error) {
      return Swal.fire({
        title: "...Ooops",
        text: "Terjadi kesalahan saat upload foto",
        icon: "error",
      });
    }

    try {
      const { error } = await supabase
        .from("peminjaman")
        .update({
          user_status: "Selesai",
          rangkuman_acara: rangkuman,
          foto_laporan: upload.foto,
        })
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
            value={peserta}
            disable
          />

          <div className="w-full max-w-xs ml-[85px] mt-4 text-black ">
            <p className="text-sm mb-2">Unggah Foto</p>
            <input
              type="file"
              className="file-input file-input-bordered file-input-md  w-full max-w-xs bg-white"
              name="ktp"
              onChange={(e) => setfoto(e.target.files[0])}
            />
          </div>

          <div className="flex justify-center mt-10">
            <div
              onClick={handleUpload}
              disabled={loadingUpload}
              className="btn w-24 bg-green-400 text-black hover:bg-white"
            >
              {loadingUpload ? "Loading..." : "Upload"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
