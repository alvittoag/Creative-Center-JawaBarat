import Navbar from "../../components/globals/Navbar";
import TextInput from "../../components/globals/TextInput";
import TextArea from "../../components/globals/TextArea";
import { NavLink, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

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

export default function PeminjamanRuangan() {
  const { state } = useLocation();
  const formik = useFormik({
    initialValues: {
      namaPemohon: state?.namaPemohon || "",
      alamatPemohon: state?.alamatPemohon || "",
      kecamatanPemohon: state?.kecamatanPemohon || "",
      kelurahanPemohon: state?.kelurahanPemohon || "",
      kabPemohon: state?.kabPemohon || "",
      statusPemohon: state?.statusPemohon || "",
      noPemohon: state?.noPemohon || "",
      emailPemohon: state?.emailPemohon || "",
      nikPemohon: state?.nikPemohon || "",
    },
    validationSchema: validation,
  });
  const [ktp, setKtp] = React.useState(null);

  const handleOnChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="flex bg-white">
        <div className="">
          <ul className="menu bg-[#F6F6F6] text-black text-[15px] font-semibold w-64 h-screen">
            <li>
              <h2 className="menu-title text-black">Form Peminjaman Ruangan</h2>
              <ul>
                <NavLink to="/peminjaman">
                  <li>
                    <a>Data Pemohon</a>
                  </li>
                </NavLink>
                <NavLink to="/DataIntansi">
                  <li>
                    <a>Data Intansi</a>
                  </li>
                </NavLink>
                <NavLink to="/DataAcara">
                  <li>
                    <a>Data Acara</a>
                  </li>
                </NavLink>
              </ul>
            </li>
          </ul>
        </div>

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
            <p className="text-red-500 text-[13px]">
              {formik.errors.namaPemohon}
            </p>
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
            <p className="text-red-500 text-[13px]">
              {formik.errors.kabPemohon}
            </p>
          </div>

          <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
            <div className="label">
              <span className="label-text text-black">Lokasi Gedung</span>
            </div>
            <select
              className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
              name="statusPemohon"
              value={formik.values.statusPemohon}
              onChange={handleOnChange}
            >
              <option disabled selected>
                Pilih
              </option>
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
            <p className="text-red-500 text-[13px]">
              {formik.errors.noPemohon}
            </p>
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
            <p className="text-red-500 text-[13px]">
              {formik.errors.emailPemohon}
            </p>
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
            <p className="text-red-500 text-[13px]">
              {formik.errors.nikPemohon}
            </p>
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
            <NavLink to="/DataIntansi">
              <div className="btn w-20 bg-[#1A8C44] border-white text-white">
                Next
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
