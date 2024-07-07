import React from "react";
import TextInput from "../../components/globals/TextInput";
import TextArea from "../../components/globals/TextArea";
import { NavLink, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabase";

const validation = Yup.object().shape({
  namaPemohon: Yup.string()
    .required("Nama Pemohon Harus Diisi")
    .min(3, "Nama Pemohon Minimal Terdiri Dari 3 Karakter"),
  alamatPemohon: Yup.string().required("Alamat Pemohon Harus Diisi"),
  kecamatanPemohon: Yup.string().required("Kecamatan Pemohon Harus Diisi"),
  kelurahanPemohon: Yup.string().required("Kelurahan Pemohon Harus Diisi"),
  kabPemohon: Yup.string().required("Kabupaten/Kota Pemohon Harus Diisi"),
  statusPemohon: Yup.string().required("Status Pemohon Harus Diisi"),
  noPemohon: Yup.number()
    .integer()
    .required("Nomor Telepon Pemohon Harus Diisi"),
  nikPemohon: Yup.number().integer().required("NIK Pemohon Harus Diisi"),
  emailPemohon: Yup.string()
    .email("Format Email Harus Benar")
    .required("Email Pemohon Harus Diisi"),
});

export default function DataPemohon({ setDataSend, setActive }) {
  const { state } = useLocation();
  const formik = useFormik({
    initialValues: {
      namaPemohon: state?.namaPemohon || "",
      alamatPemohon: state?.alamatPemohon || "",
      kecamatanPemohon: state?.kecamatanPemohon || "",
      kelurahanPemohon: state?.kelurahanPemohon || "",
      kabPemohon: state?.kabPemohon || "",
      statusPemohon: state?.statusPemohon || "Pelajar/Mahasiswa",
      noPemohon: state?.noPemohon || "",
      emailPemohon: state?.emailPemohon || "",
      nikPemohon: state?.nikPemohon || "",
    },
    validationSchema: validation,
  });
  const [ktp, setKtp] = React.useState(null);
  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const handleOnChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const uploadKTP = async () => {
    setLoadingUpload(true);

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("berkas")
        .upload(`ktp/${formik.values.namaPemohon} - ${Math.random()}`, ktp);

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

      return { ktp: data.publicUrl };
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      return { error: true };
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSubmit = async () => {
    const isError =
      Object.keys(formik.errors).length !== 0 ||
      Object.values(formik.values).some((value) => value === "");

    if (isError) {
      return Swal.fire({
        title: "Data Pemohon",
        text: "Harap lengkapi semua data",
        icon: "error",
      });
    }

    if (!ktp) {
      return Swal.fire({
        title: "Data Pemohon",
        text: "Harap unggah KTP",
        icon: "error",
      });
    }

    const upload = await uploadKTP();

    if (upload?.error) {
      return Swal.fire({
        title: "...Ooops",
        text: "Terjadi kesalahan saat upload ktp",
        icon: "error",
      });
    }

    setDataSend((prev) => ({
      ...prev,
      pemohon: { ...formik.values },
      ktp: upload?.ktp,
    }));
    setActive("Data Intansi");
  };

  return (
    <div className="flex flex-col bg-[#fcfcfc] w-[40%] m-7 rounded-lg border justify-center">
      <TextInput
        label={"Nama Lengkap"}
        placeholder={"Nama Lengkap Pemohon"}
        id={"namaPemohon"}
        nama={"namaPemohon"}
        value={formik.values.namaPemohon}
        onChange={handleOnChange}
        type={"text"}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">{formik.errors.namaPemohon}</p>
      </div>

      <TextArea
        label={"Alamat Pemohon"}
        placeholder={"Alamat"}
        id={"alamatPemohon"}
        nama={"alamatPemohon"}
        type={"text"}
        value={formik.values.alamatPemohon}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">
          {formik.errors.alamatPemohon}
        </p>
      </div>

      <TextInput
        label={"Kecamatan"}
        placeholder={"Kecamatan"}
        id={"kecamatanPemohon"}
        nama={"kecamatanPemohon"}
        type={"text"}
        value={formik.values.kecamatanPemohon}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">
          {formik.errors.kecamatanPemohon}
        </p>
      </div>

      <TextInput
        label={"Kelurahan"}
        placeholder={"Kelurahan"}
        id={"kelurahanPemohon"}
        nama={"kelurahanPemohon"}
        type={"text"}
        value={formik.values.kelurahanPemohon}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">
          {formik.errors.kelurahanPemohon}
        </p>
      </div>

      <TextInput
        label={"Kabupaten/Kota"}
        placeholder={"Kabupaten/Kota"}
        id={"kabPemohon"}
        nama={"kabPemohon"}
        type={"text"}
        value={formik.values.kabPemohon}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">{formik.errors.kabPemohon}</p>
      </div>

      <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
        <div className="label">
          <span className="label-text text-black">Status Pemohon</span>
        </div>
        <select
          className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
          name="statusPemohon"
          value={formik.values.statusPemohon}
          onChange={handleOnChange}
        >
          <option disabled>Pilih</option>
          <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
          <option value="Guru/Dosen">Guru/Dosen</option>
          <option value="Wirausahawan">Wirausahawan</option>
          <option value="PNS/ASN">PNS/ASN</option>
          <option value="Pegawai Swasta">Pegawai Swasta</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </label>
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">
          {formik.errors.statusPemohon}
        </p>
      </div>

      <TextInput
        label={"No Telepon"}
        placeholder={"No Telepon"}
        id={"noPemohon"}
        nama={"noPemohon"}
        type={"number"}
        value={formik.values.noPemohon}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">{formik.errors.noPemohon}</p>
      </div>

      <TextInput
        label={"Email"}
        placeholder={"Email"}
        id={"emailPemohon"}
        nama={"emailPemohon"}
        type={"text"}
        value={formik.values.emailPemohon}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">{formik.errors.emailPemohon}</p>
      </div>

      <TextInput
        label={"NIK"}
        placeholder={"NIK"}
        id={"nikPemohon"}
        nama={"nikPemohon"}
        type={"number"}
        value={formik.values.nikPemohon}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">{formik.errors.nikPemohon}</p>
      </div>

      <div className="w-full max-w-xs ml-[85px] mt-4 text-black ">
        <p className="text-sm mb-2">Unggah KTP</p>
        <input
          type="file"
          className="file-input file-input-bordered file-input-md  w-full max-w-xs bg-white"
          name="ktp"
          onChange={(e) => setKtp(e.target.files[0])}
        />
      </div>

      <div className="grid place-content-end px-14 my-5">
        <button
          disabled={loadingUpload}
          className="btn w-20 bg-[#1A8C44] border-white text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-200"
          onClick={handleSubmit}
        >
          {loadingUpload ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
}
