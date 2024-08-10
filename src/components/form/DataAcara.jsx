import TextInput from "../../components/globals/TextInput";
import Radio from "../../components/globals/Radio";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import React from "react";
import { supabase } from "../../lib/supabase";
import { hasEmptyString } from "../../lib/cekEmptyString";
import { checkMaxValues } from "../../lib/cekMaxPesertas";
import { getValues } from "../../lib/getValues";
import { cekValidDate } from "../../lib/cekValidDate";

const validation = Yup.object().shape({
  lokasiGedung: Yup.string().required("Lokasi Gedung Wajib Diisi"),
  subsektorAcara: Yup.string().required("Subsektor Acara Wajib Diisi"),
  jenisAcara: Yup.string().required("Jenis Acara Wajib Diisi"),
  namaAcara: Yup.string().required("Nama Acara Wajib Diisi"),
  tanggalMulaiAcara: Yup.string().required("Tanggal Mulai Acara Wajib Diisi"),
  tanggalAkhirAcara: Yup.string().required("Tanggal Akhir Acara Wajib Diisi"),
  jamMulai: Yup.string().required("Jam Mulai Wajib Diisi"),
  jamBerakhir: Yup.string().required("Jam Berakhir Wajib Diisi"),
  // jumlahPeserta: Yup.number().integer().required("Jumlah Peserta Wajib Diisi"),
});

export default function DataAcara({ setDataSend, dataSend }) {
  const { state } = useLocation();
  const formik = useFormik({
    initialValues: {
      lokasiGedung: state?.lokasiGedung || "Bogor Creative Center",
      subsektorAcara: state?.subsektorAcara || "Aplikasi",
      jenisAcara: state?.jenisAcara || "Rapat",
      namaAcara: state?.namaAcara || "",
      tanggalMulaiAcara: state?.tanggalMulaiAcara || "",
      tanggalAkhirAcara: state?.tanggalAkhirAcara || "",
      jamMulai: state?.jamMulai || "",
      jamBerakhir: state?.jamBerakhir || "",
      // jumlahPeserta: state?.jumlahPeserta || "",
    },
    validationSchema: validation,
  });
  const [surat, setSurat] = React.useState(null);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [jumlahPesertas, setJumlahPesertas] = React.useState(null);

  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const [dataFormPemohon, setDataFormPemohon] = React.useState(null);
  const [dataFormIntansi, setDataFormIntansi] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      setLoading1(true);
      const userLcl = localStorage.getItem("user");

      const user = JSON.parse(userLcl);
      try {
        let { data, error } = await supabase
          .from("pemohon")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        const singleData = data[0];

        const dataSave = {
          alamatPemohon: singleData?.alamatPemohon,
          emailPemohon: singleData?.emailPemohon,
          kecamatanPemohon: singleData?.kecamatanPemohon,
          kelurahanPemohon: singleData?.kelurahanPemohon,
          namaPemohon: singleData?.namaPemohon,
          nikPemohon: singleData?.nikPemohon,
          noPemohon: singleData?.noPemohon,
          statusPemohon: singleData?.statusPemohon,
          kabPemohon: singleData?.kabPemohon,
          ktp: singleData?.ktp,
        };

        setDataFormPemohon(singleData ? dataSave : null);
      } catch (error) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengambil data",
        });
      } finally {
        setLoading1(false);
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      setLoading2(true);
      const userLcl = localStorage.getItem("user");

      const user = JSON.parse(userLcl);
      try {
        let { data, error } = await supabase
          .from("intansi")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        const singleData = data[0];

        const dataSave = {
          alamatIntansi: singleData?.alamatIntansi,
          emailIntansi: singleData?.emailIntansi,
          namaIntansi: singleData?.namaIntansi,
          noTelpIntansi: singleData?.noTelpIntansi,
          statusIntansi: singleData?.statusIntansi,
        };

        setDataFormIntansi(singleData ? dataSave : null);
      } catch (error) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengambil data",
        });
      } finally {
        setLoading2(false);
      }
    };

    getData();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      const newData = { ...jumlahPesertas };
      delete newData[value];
      setJumlahPesertas(newData);
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const handleOnChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
    console.log(target.name + target.value);
  };

  const navigate = useNavigate();

  const uploadPermohonan = async () => {
    setLoadingUpload(true);

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("berkas")
        .upload(`surat/${formik.values.namaAcara} - ${Math.random()}`, surat);

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

      return { surat: data.publicUrl };
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
      Object.values(formik.values).some((value) => value === "") ||
      selectedOptions.length === 0;

    if (isError) {
      return Swal.fire({
        title: "Data Acara",
        text: "Harap lengkapi semua data",
        icon: "error",
      });
    }

    if (!jumlahPesertas) {
      return Swal.fire({
        title: "Data Acara",
        text: "Harap lengkapi jumlah peserta",
        icon: "error",
      });
    }

    if (
      hasEmptyString(jumlahPesertas) ||
      Object.keys(jumlahPesertas).length === 0
    ) {
      return Swal.fire({
        title: "Data Acara",
        text: "Harap lengkapi jumlah peserta",
        icon: "error",
      });
    }

    const cekMaxPesertas = checkMaxValues(jumlahPesertas);

    if (cekMaxPesertas.length !== 0) {
      return Swal.fire({
        title: "Jumlah Peserta Terlalu Besar",
        text: cekMaxPesertas.join(", \n"),
        icon: "error",
      });
    }

    if (
      !cekValidDate(formik.values.tanggalMulaiAcara) ||
      !cekValidDate(formik.values.tanggalAkhirAcara)
    ) {
      return Swal.fire({
        title: "Tanggal Acara Tidak Valid",
        text: "Tanggal mulai dan tanggal akhir acara tidak boleh kurang dari hari ini",
        icon: "error",
      });
    }

    if (!surat) {
      return Swal.fire({
        title: "Data Acara",
        text: "Harap unggah Surat Permohonan",
        icon: "error",
      });
    }

    const upload = await uploadPermohonan();

    console.log(upload);

    if (upload?.error) {
      return Swal.fire({
        title: "...Ooops",
        text: "Terjadi kesalahan saat upload surat permohonan",
        icon: "error",
      });
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const prevData = JSON.parse(localStorage.getItem("datapinjam"));

    const dataAcara = {
      id: Math.random(),
      acara: {
        ...formik.values,
        ruangan: JSON.stringify(selectedOptions),
        jumlahPesertas: JSON.stringify(jumlahPesertas),
      },
      user: user,
      surat: upload.surat,
    };

    const newDataSend = {
      pemohon: dataFormPemohon,
      intansi: dataFormIntansi,
      ...dataAcara,
    };

    if (prevData?.length > 0) {
      const newData = [...prevData, newDataSend];
      localStorage.setItem("datapinjam", JSON.stringify(newData));
    } else {
      localStorage.setItem("datapinjam", JSON.stringify([newDataSend]));
    }

    Swal.fire({
      title: "Berhasil",
      text: "Data Berhasil Ditambahkan",
      icon: "success",
    });

    navigate("/profile");
  };

  if (loading1 || loading2) {
    return (
      <div className="flex justify-center items-center h-screen w-full -mt-20">
        Loading...
      </div>
    );
  }

  if (!dataFormPemohon || !dataFormIntansi) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen w-full -mt-20">
        <h1 className="text-xl">
          Harap isi data Pemohon dan Instansi terlebih dahulu
        </h1>

        <button
          className="bg-green-600 p-3 w-64 text-white rounded-md"
          onClick={() =>
            navigate("/form-profile", {
              state: { pemohon: null, intansi: null },
            })
          }
        >
          isi data disini
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#fcfcfc] w-[80%] m-7 rounded-lg border justify-center">
      <div className="px-10 py-5 flex items-center gap-5 bg-yellow-400 text-black">
        <h1>
          Sebelum melakukan peminjaman, anda dapat melihat dan mengubah data
          pemohon dan instansi terlebih dahulu agar tidak ada kesalahan data
        </h1>

        <button
          onClick={() =>
            navigate("/form-profile", {
              state: { pemohon: dataFormPemohon, intansi: dataFormIntansi },
            })
          }
          className="px-5 py-2 bg-green-600 text-white rounded-md"
        >
          Cek disini
        </button>
      </div>

      {/* lokasi gedung */}
      <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
        <div className="label">
          <span className="label-text text-black">Lokasi Gedung</span>
        </div>
        <select
          className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
          name="lokasiGedung"
          value={formik.values.lokasiGedung}
          onChange={(event) => [handleOnChange(event), setSelectedOptions([])]}
        >
          <option disabled>Pilih</option>
          <option value="Bogor Creative Center">
            [BCC] Bogor Creative Center
          </option>
          <option value="Purwakarta Creative Center">
            [PCC] Purwakarta Creative Center
          </option>
          <option value="Ruang Kreatif Ahmad Djuhara">
            [AD] Ruang Kreatif Ahmad Djuhara
          </option>
        </select>
      </label>

      {/* ruangan */}
      <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
        <div className="flex">
          {/* BCC */}
          <div className="form-control text-black">
            <label className="label items-start flex flex-col">
              <p className="text-sm font-bold">Bogor Creative Center</p>

              {ruanganBogor.map((ruangan) => (
                <div
                  key={ruangan}
                  className="flex mt-3 gap-4 justify-between w-36"
                >
                  <span className="label-text text-black">{ruangan}</span>
                  {formik.values.lokasiGedung === "Bogor Creative Center" && (
                    <input
                      type="checkbox"
                      value={ruangan}
                      checked={selectedOptions.includes(ruangan)}
                      onChange={handleCheckboxChange}
                      className="checkbox border-black"
                    />
                  )}
                </div>
              ))}
            </label>
          </div>

          {/* PCC */}
          <div className="form-control text-black ml-10">
            <label className="label items-start flex flex-col">
              <p className="text-sm font-bold">Purwakarta Creative Center</p>
              {ruanganCreativeCenter.map((ruangan) => (
                <div
                  key={ruangan}
                  className="flex mt-3 gap-4 justify-between w-36"
                >
                  <span className="label-text text-black">{ruangan}</span>
                  {formik.values.lokasiGedung ===
                    "Purwakarta Creative Center" && (
                    <input
                      type="checkbox"
                      value={ruangan}
                      checked={selectedOptions.includes(ruangan)}
                      onChange={handleCheckboxChange}
                      className="checkbox border-black"
                    />
                  )}
                </div>
              ))}
            </label>
          </div>

          {/* AD */}
          <div className="form-control text-black ml-10">
            <label className="label items-start flex flex-col">
              <p className="text-sm font-bold">Ruang Kreatif Ahmad Djuhara</p>
              {ruanganKreatifAD.map((ruangan) => (
                <div
                  key={ruangan}
                  className="flex mt-3 gap-4 justify-between w-36"
                >
                  <span className="label-text text-black">{ruangan}</span>
                  {formik.values.lokasiGedung ===
                    "Ruang Kreatif Ahmad Djuhara" && (
                    <input
                      type="checkbox"
                      value={ruangan}
                      checked={selectedOptions.includes(ruangan)}
                      onChange={handleCheckboxChange}
                      className="checkbox border-black"
                    />
                  )}
                </div>
              ))}
            </label>
          </div>
        </div>
      </label>

      {/* subsektor kegiatan */}
      <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
        <div className="label">
          <span className="label-text text-black">Subsektor Kegiatan</span>
        </div>
        <select
          className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
          name="subsektorAcara"
          value={formik.values.subsektorAcara}
          onChange={handleOnChange}
        >
          <option disabled>Pilih</option>
          <option value="Aplikasi">Aplikasi</option>
          <option value="Arsitektur">Arsitektur</option>
          <option value="Desain Interior">Desain Interior</option>
          <option value="Desain Produk">Desain Produk</option>
          <option value="Desain Komunikasi Visual">
            Desain Komunikasi Visual
          </option>
          <option value="Film, Animasi dan Video">
            Film, Animasi dan Video
          </option>
          <option value="Fashion">Fashion</option>
          <option value="Fotografi">Fotografi</option>
          <option value="Kuliner">Kuliner</option>
          <option value="Musik">Musik</option>
          <option value="Penerbitan">Penerbitan</option>
          <option value="Pengambangan Permainan">Pengambangan Permainan</option>
          <option value="Periklanan">Periklanan</option>
          <option value="Seni Kriya">Seni Kriya</option>
          <option value="Seni Pertunjukan">Seni Pertunjukan</option>
          <option value="Seni Rupa">Seni Rupa</option>
          <option value="TV dan Radio">TV dan Radio</option>
        </select>
      </label>

      {/* jenis kegiatan */}
      <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
        <div className="label">
          <span className="label-text text-black">Jenis Kegiatan</span>
        </div>
        <select
          className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
          name="jenisAcara"
          value={formik.values.jenisAcara}
          onChange={handleOnChange}
        >
          <option disabled>Pilih</option>
          <option value="Rapat">Rapat</option>
          <option value="Talkshow/Seminar">Talkshow/Seminar</option>
          <option value="Pameran">Pameran</option>
          <option value="Event">Event</option>
          <option value="Workshop">Workshop</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </label>

      <TextInput
        label={"Nama Kegiatan"}
        placeholder={"Nama Kegiatan"}
        id={"namaAcara"}
        nama={"namaAcara"}
        value={formik.values.namaAcara}
        onChange={handleOnChange}
      />

      {/* tanggal mulai */}
      <label className="grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
        <div className="label">
          <span className="label-text text-black">Tanggal Mulai</span>
        </div>
        <input
          type="date"
          id="tanggalMulaiAcara"
          name="tanggalMulaiAcara"
          className="input input-bordered w-56 bg-white placeholder:text-sm"
          value={formik.values.tanggalMulaiAcara}
          onChange={handleOnChange}
        />
      </label>

      {/* tanggal selesai */}
      <label className="grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
        <div className="label">
          <span className="label-text text-black">Tanggal Berakhir</span>
        </div>
        <input
          type="date"
          id="tanggalAkhirAcara"
          name="tanggalAkhirAcara"
          className="input input-bordered w-56 bg-white placeholder:text-sm"
          value={formik.values.tanggalAkhirAcara}
          onChange={handleOnChange}
        />
      </label>

      {/* jam mulai */}
      <div className="flex w-full max-w-xs ml-[85px] mt-4 text-black ">
        <p className="w-40 text-sm">Jam Mulai</p>
        <div className="flex">
          <div className="">
            <Radio
              label={"08.00"}
              value={"08.00"}
              nama={"jamMulai"}
              onChange={handleOnChange}
              checked={
                state?.jamMulai === "08.00" ||
                formik.values.jamMulai === "08.00"
              }
            />
            <Radio
              label={"09.00"}
              value={"09.00"}
              nama={"jamMulai"}
              onChange={handleOnChange}
              checked={
                state?.jamMulai === "09.00" ||
                formik.values.jamMulai === "09.00"
              }
            />
            <Radio
              label={"10.00"}
              value={"10.00"}
              nama={"jamMulai"}
              onChange={handleOnChange}
              checked={
                state?.jamMulai === "10.00" ||
                formik.values.jamMulai === "10.00"
              }
            />
            <Radio
              label={"11.00"}
              nama={"jamMulai"}
              value={"11.00"}
              onChange={handleOnChange}
              checked={
                state?.jamMulai === "11.00" ||
                formik.values.jamMulai === "11.00"
              }
            />
          </div>

          <div className="ml-4">
            <Radio
              label={"12.00"}
              value={"12.00"}
              nama={"jamMulai"}
              onChange={handleOnChange}
              checked={
                state?.jamMulai === "12.00" ||
                formik.values.jamMulai === "12.00"
              }
            />
            <Radio
              label={"13.00"}
              value={"13.00"}
              nama={"jamMulai"}
              onChange={handleOnChange}
              checked={
                state?.jamMulai === "13.00" ||
                formik.values.jamMulai === "13.00"
              }
            />
            <Radio
              label={"14.00"}
              value={"14.00"}
              nama={"jamMulai"}
              onChange={handleOnChange}
              checked={
                state?.jamMulai === "14.00" ||
                formik.values.jamMulai === "14.00"
              }
            />
            <Radio
              label={"15.00"}
              value={"15.00"}
              nama={"jamMulai"}
              onChange={handleOnChange}
              checked={
                state?.jamMulai === "15.00" ||
                formik.values.jamMulai === "15.00"
              }
            />
          </div>
        </div>
      </div>

      {/* jam berakhir */}
      <div className="flex w-full max-w-xs ml-[85px] mt-4 text-black ">
        <p className="w-40 text-sm">Jam Berakhir</p>
        <div className="flex">
          <div className="">
            <Radio
              label={"09.00"}
              value={"09.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "09.00" ||
                formik.values.jamBerakhir === "09.00"
              }
            />
            <Radio
              label={"10.00"}
              value={"10.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "10.00" ||
                formik.values.jamBerakhir === "10.00"
              }
            />
            <Radio
              label={"11.00"}
              value={"11.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "11.00" ||
                formik.values.jamBerakhir === "11.00"
              }
            />
            <Radio
              label={"12.00"}
              value={"12.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "12.00" ||
                formik.values.jamBerakhir === "12.00"
              }
            />
            <Radio
              label={"13.00"}
              value={"13.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "13.00" ||
                formik.values.jamBerakhir === "13.00"
              }
            />
          </div>
          <div className="ml-4">
            <Radio
              label={"14.00"}
              value={"14.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "14.00" ||
                formik.values.jamBerakhir === "14.00"
              }
            />
            <Radio
              label={"15.00"}
              value={"15.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "15.00" ||
                formik.values.jamBerakhir === "15.00"
              }
            />
            <Radio
              label={"16.00"}
              value={"16.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "16.00" ||
                formik.values.jamBerakhir === "16.00"
              }
            />
            <Radio
              label={"17.00"}
              value={"17.00"}
              nama={"jamBerakhir"}
              onChange={handleOnChange}
              checked={
                state?.jamBerakhir === "17.00" ||
                formik.values.jamBerakhir === "17.00"
              }
            />
          </div>
        </div>
      </div>
      {/* 
      <TextInput
        label={"Jumlah Peserta"}
        placeholder={"Jumlah Peserta"}
        id={"jumlahPeserta"}
        nama={"jumlahPeserta"}
        onChange={handleOnChange}
        value={formik.values.jumlahPeserta}
      /> */}

      {selectedOptions.map((item) => (
        <TextInput
          type="tel"
          key={item}
          label={`Jumlah Peserta ${item}`}
          placeholder={"Jumlah Peserta"}
          id={"jumlahPeserta"}
          nama={item}
          onChange={(e) =>
            setJumlahPesertas({ ...jumlahPesertas, [item]: e.target.value })
          }
        />
      ))}

      <div className="w-full max-w-xs ml-[85px] mt-4 text-black ">
        <p className="text-sm mb-2">Unggah Surat Permohonan</p>
        <input
          type="file"
          className="file-input file-input-bordered file-input-md  w-full max-w-xs bg-white"
          name="suratPermohonan"
          onChange={(e) => setSurat(e.target.files[0])}
        />
      </div>

      <div className="grid place-content-end px-14 my-5">
        <button
          onClick={handleSubmit}
          disabled={loadingUpload}
          className="btn w-20 bg-[#1A8C44] border-white text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-200"
        >
          {loadingUpload ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
}

const ruanganBogor = [
  "Cafe Outdoor",
  "Cafe Indoor",
  "Ruang Galeri",
  "Ruang Fotografi",
  "Ruang Musik",
  "Auditorium",
];

const ruanganCreativeCenter = [
  "Ruang Flexible",
  "Workshop",
  "Auditorium",
  "Ruang Kelas",
  "Ruang Audio",
];

const ruanganKreatifAD = [
  "Gor",
  "Workshop",
  "Plaza Terbuka",
  "Co-working Space",
  "Auditorium",
  "Kantin",
];
