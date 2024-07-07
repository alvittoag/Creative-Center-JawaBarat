import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import Swal from "sweetalert2";

export default function DetailKerusakanFasilitas() {
  const { state } = useLocation();
  const [buktiPembayaran, setBuktiPembayaran] = React.useState(null);

  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const navigate = useNavigate();

  const uploadBukti = async () => {
    setLoadingUpload(true);

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("berkas")
        .upload(
          `bukti/${state.users.nama} - ${Math.random()}`,
          buktiPembayaran
        );

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

      return { bukti: data.publicUrl };
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      return { error: true };
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleUpload = async () => {
    if (!buktiPembayaran) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lengkapi bukti pembayaran",
      });
    }

    const upload = await uploadBukti();

    if (upload?.error) {
      return Swal.fire({
        title: "...Ooops",
        text: "Terjadi kesalahan saat upload bukti pembayran",
        icon: "error",
      });
    }

    try {
      const { error } = await supabase
        .from("kerusakan")
        .update({
          user_status: "Sudah Bayar",
          admin_utama_status: "Sudah Bayar",
          bukti_pembayaran: upload?.bukti,
        })
        .eq("id", state.id)
        .select();

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Bukti pembayaran berhasil dikirim",
      });

      navigate("/profile");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "...Oops",
        text: "Gagal menambahkan bukti pembayaran",
      });
      console.log(error);
    }
  };
  return (
    <div className="bg-white h-screen">
      <div className="artboard artboard-horizontal phone-1 mx-auto items-center flex justify-center">
        <div className="rounded-lg border p-10 text-black mt-10">
          <p className="text-lg">Denda Kerusakan Fasilitas</p>
          <p>Silahkan membayar denda ke nomor rekening berikut</p>
          <p className="font-bold pb-5">2941904812 (BCA)</p>

          <div className="w-full max-w-xs mt-4 text-black ">
            <p className="text-sm mb-2">Unggah Bukti Pembayaran</p>
            <input
              type="file"
              onChange={(e) => setBuktiPembayaran(e.target.files[0])}
              className="file-input file-input-bordered file-input-md  w-full max-w-xs bg-white"
              name="buktiPembayaran"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={loadingUpload}
            className="btn mt-4 bg-green-500 hover:bg-white text-black disabled:bg-slate-600 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            {loadingUpload ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
