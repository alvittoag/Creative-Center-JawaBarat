import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/globals/Navbar";
import TextInput from "../../../components/globals/TextInput";
import TextArea from "../../../components/globals/TextArea";
import Radio from "../../../components/globals/Radio";
import React from "react";
import Swal from "sweetalert2";
import { supabase } from "../../../lib/supabase";
import { hasEmptyString } from "../../../lib/cekEmptyString";
import { checkMaxValues } from "../../../lib/cekMaxPesertas";

export default function EditPermohonan() {
  const {
    state: { data },
  } = useLocation();

  const { pemohon, intansi, acara } = data;

  const ruangan = JSON.parse(acara.ruangan);
  const peserta = JSON.parse(acara.jumlahPesertas);

  console.log(peserta);

  const [dataValuePemohon, setdataValuePemohon] = React.useState({
    namaPemohon: pemohon.namaPemohon,
    alamatPemohon: pemohon.alamatPemohon,
    kecamatanPemohon: pemohon.kecamatanPemohon,
    kelurahanPemohon: pemohon.kelurahanPemohon,
    statusPemohon: pemohon.statusPemohon,
    kabPemohon: pemohon.kabPemohon,
    noPemohon: pemohon.noPemohon,
    emailPemohon: pemohon.emailPemohon,
    nikPemohon: pemohon.nikPemohon,
  });

  const [dataValueIntansi, setDataValueIntansi] = React.useState({
    namaIntansi: intansi.namaIntansi,
    alamatIntansi: intansi.alamatIntansi,
    noTelpIntansi: intansi.noTelpIntansi,
    emailIntansi: intansi.emailIntansi,
    statusIntansi: intansi.statusIntansi,
  });

  const [dataValueAcara, setdataValueAcara] = React.useState({
    lokasiGedung: acara.lokasiGedung,
    subsektorAcara: acara.subsektorAcara,
    jenisAcara: acara.jenisAcara,
    namaAcara: acara.namaAcara,
    tanggalMulaiAcara: acara.tanggalMulaiAcara,
    tanggalAkhirAcara: acara.tanggalAkhirAcara,
    jamMulai: acara.jamMulai,
    jamBerakhir: acara.jamBerakhir,
    jumlahPeserta: acara.jumlahPeserta,
  });

  const [selectedOptions, setSelectedOptions] = React.useState(
    JSON.parse(data.acara.ruangan)
  );

  const [jumlahPesertas, setJumlahPesertas] = React.useState(peserta);

  console.log(jumlahPesertas);

  const [ktp, setKtp] = React.useState(null);
  const [changeKtp, setChangeKtp] = React.useState(false);
  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const [surat, setSurat] = React.useState(null);
  const [changeSurat, setChangeSurat] = React.useState(false);
  const [loadingUploadSurat, setLoadingUploadSurat] = React.useState(false);

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

  const handleOnChangePemohon = (event) => {
    const { target } = event;
    setdataValuePemohon((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleOnChangeIntansi = (event) => {
    const { target } = event;
    setDataValueIntansi((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleOnChangeAcara = (event) => {
    const { target } = event;
    setdataValueAcara((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const uploadKTP = async () => {
    setLoadingUpload(true);

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("berkas")
        .upload(`ktp/${dataValuePemohon.namaPemohon} - ${Math.random()}`, ktp);

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

  const uploadPermohonan = async () => {
    setLoadingUploadSurat(true);

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("berkas")
        .upload(`surat/${dataValueAcara.namaAcara} - ${Math.random()}`, surat);

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
      setLoadingUploadSurat(false);
    }
  };

  const navigate = useNavigate();

  const handleEdit = async () => {
    let ktpBaru = null;
    let suratBaru = null;

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

    if (changeKtp) {
      const upload = await uploadKTP();

      if (upload?.error) {
        return Swal.fire({
          title: "...Ooops",
          text: "Terjadi kesalahan saat upload ktp",
          icon: "error",
        });
      }

      ktpBaru = upload.ktp;
    }

    if (changeSurat) {
      const upload = await uploadPermohonan();

      if (upload?.error) {
        return Swal.fire({
          title: "...Ooops",
          text: "Terjadi kesalahan saat upload surat permohonan",
          icon: "error",
        });
      }

      suratBaru = upload.surat;
    }

    const dataPinjam = JSON.parse(localStorage.getItem("datapinjam"));

    const findKey = dataPinjam.findIndex((item) => item.id === data.id);

    dataPinjam[findKey] = {
      id: Math.random(),
      pemohon: { ...dataValuePemohon, ktp: ktpBaru ?? pemohon.ktp },
      intansi: dataValueIntansi,
      acara: {
        ...dataValueAcara,
        ruangan: JSON.stringify(selectedOptions),
        jumlahPesertas: JSON.stringify(jumlahPesertas),
      },
      user: data.user,
      surat: suratBaru ?? data.surat,
    };

    localStorage.setItem("datapinjam", JSON.stringify(dataPinjam));

    Swal.fire({
      title: "Berhasil",
      text: "Data berhasil diubah",
      icon: "success",
    });

    navigate("/Profile");
  };
  return (
    <div>
      <Navbar />
      <div className="flex bg-white">
        <div className="flex flex-col bg-[#fcfcfc] w-[40%] m-7 rounded-lg border">
          <TextInput
            label={"Nama Lengkap"}
            placeholder={"Nama Lengkap Pemohon"}
            id={"namaPemohon"}
            nama={"namaPemohon"}
            value={dataValuePemohon.namaPemohon}
            type={"text"}
            onChange={handleOnChangePemohon}
          />

          <TextArea
            label={"Alamat Pemohon"}
            placeholder={"Alamat"}
            id={"alamatPemohon"}
            nama={"alamatPemohon"}
            type={"text"}
            value={dataValuePemohon.alamatPemohon}
            onChange={handleOnChangePemohon}
          />

          <TextInput
            label={"Kecamatan"}
            placeholder={"Kecamatan"}
            id={"kecamatanPemohon"}
            nama={"kecamatanPemohon"}
            type={"text"}
            value={dataValuePemohon.kecamatanPemohon}
            onChange={handleOnChangePemohon}
          />

          <TextInput
            label={"Kelurahan"}
            placeholder={"Kelurahan"}
            id={"kelurahanPemohon"}
            nama={"kelurahanPemohon"}
            type={"text"}
            value={dataValuePemohon.kelurahanPemohon}
            onChange={handleOnChangePemohon}
          />

          <TextInput
            label={"Kabupaten/Kota"}
            placeholder={"Kabupaten/Kota"}
            id={"kabPemohon"}
            nama={"kabPemohon"}
            type={"text"}
            value={dataValuePemohon.kabPemohon}
            onChange={handleOnChangePemohon}
          />

          <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
            <div className="label">
              <span className="label-text text-black">Status Pemohon</span>
            </div>
            <select
              name={"statusPemohon"}
              value={dataValuePemohon.statusPemohon}
              onChange={handleOnChangePemohon}
              className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
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

          <TextInput
            label={"No Telepon"}
            placeholder={"No Telepon"}
            id={"noPemohon"}
            nama={"noPemohon"}
            type={"number"}
            value={dataValuePemohon.noPemohon}
            onChange={handleOnChangePemohon}
          />

          <TextInput
            label={"Email"}
            placeholder={"Email"}
            id={"emailPemohon"}
            nama={"emailPemohon"}
            type={"text"}
            value={dataValuePemohon.emailPemohon}
            onChange={handleOnChangePemohon}
          />

          <TextInput
            label={"NIK"}
            placeholder={"NIK"}
            id={"nikPemohon"}
            nama={"nikPemohon"}
            type={"number"}
            value={dataValuePemohon.nikPemohon}
            onChange={handleOnChangePemohon}
          />

          <div className="ml-[85px] mt-4">
            <p className="text-sm mb-2 text-black">KTP</p>
            <a href={pemohon.ktp} className="underline" target="_blank">
              Lihat KTP
            </a>
          </div>

          <div className="w-full max-w-xs ml-[85px] mt-4 text-black ">
            <p className="text-sm mb-2">Unggah KTP Baru</p>
            <input
              type="file"
              onChange={(e) => [setKtp(e.target.files[0], setChangeKtp(true))]}
              className="file-input file-input-bordered file-input-md  w-full max-w-xs bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col bg-[#fcfcfc] w-[40%] m-7 rounded-lg border justify-center">
          {/* Intansi */}
          <TextInput
            label={"Nama Intansi/Pribadi"}
            placeholder={"Nama Intansi/Pribadi"}
            id={"namaIntansi"}
            nama={"namaIntansi"}
            type={"text"}
            value={dataValueIntansi.namaIntansi}
            onChange={handleOnChangeIntansi}
          />

          <TextArea
            label={"Alamat Intansi"}
            placeholder={"Alamat Intansi"}
            id={"alamatIntansi"}
            nama={"alamatIntansi"}
            type={"text"}
            value={dataValueIntansi.alamatIntansi}
            onChange={handleOnChangeIntansi}
          />

          <TextInput
            label={"No Telepon "}
            placeholder={"No Telepon Intansi"}
            id={"noTelpIntansi"}
            nama={"noTelpIntansi"}
            type={"number"}
            value={dataValueIntansi.noTelpIntansi}
            onChange={handleOnChangeIntansi}
          />

          <TextInput
            label={"Alamat Email"}
            placeholder={"Email Intansi"}
            id={"emailIntansi"}
            nama={"emailIntansi"}
            type={"text"}
            value={dataValueIntansi.emailIntansi}
            onChange={handleOnChangeIntansi}
          />

          <TextInput
            label={"Status dalam Intansi/Pribadi"}
            placeholder={"Status dalam Intansi/Pribadi"}
            id={"statusIntansi"}
            nama={"statusIntansi"}
            type={"text"}
            value={dataValueIntansi.statusIntansi}
            onChange={handleOnChangeIntansi}
          />
          {/* End Intansi */}

          {/* acara */}

          {/* lokasi gedung */}
          <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
            <div className="label">
              <span className="label-text text-black">Lokasi Gedung</span>
            </div>
            <select
              name={"lokasiGedung"}
              value={dataValueAcara.lokasiGedung}
              onChange={(event) => [
                handleOnChangeAcara(event),
                setSelectedOptions([]),
              ]}
              className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
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
            <div className="label">
              <span className="label-text text-black">Ruangan</span>
            </div>
            <div className="flex">
              {/* BCC */}
              {dataValueAcara.lokasiGedung === "Bogor Creative Center" && (
                <div className="form-control text-black">
                  <label className="label items-start flex flex-col">
                    {ruanganBogor.map((ruangan) => (
                      <div
                        key={ruangan}
                        className="flex mt-3 gap-4 justify-between w-36"
                      >
                        <span className="label-text text-black">{ruangan}</span>

                        <input
                          type="checkbox"
                          value={ruangan}
                          checked={selectedOptions.includes(ruangan)}
                          onChange={handleCheckboxChange}
                          className="checkbox border-black"
                        />
                      </div>
                    ))}
                  </label>
                </div>
              )}

              {/* PCC */}
              {dataValueAcara.lokasiGedung === "Purwakarta Creative Center" && (
                <div className="form-control text-black">
                  <label className="label items-start flex flex-col">
                    {ruanganCreativeCenter.map((ruangan) => (
                      <div
                        key={ruangan}
                        className="flex mt-3 gap-4 justify-between w-36"
                      >
                        <span className="label-text text-black">{ruangan}</span>

                        <input
                          type="checkbox"
                          value={ruangan}
                          checked={selectedOptions.includes(ruangan)}
                          onChange={handleCheckboxChange}
                          className="checkbox border-black"
                        />
                      </div>
                    ))}
                  </label>
                </div>
              )}

              {/* AD */}
              {dataValueAcara.lokasiGedung ===
                "Ruang Kreatif Ahmad Djuhara" && (
                <div className="form-control text-black">
                  <label className="label items-start flex flex-col">
                    {ruanganKreatifAD.map((ruangan) => (
                      <div
                        key={ruangan}
                        className="flex mt-3 gap-4 justify-between w-36"
                      >
                        <span className="label-text text-black">{ruangan}</span>
                        <input
                          type="checkbox"
                          value={ruangan}
                          checked={selectedOptions.includes(ruangan)}
                          onChange={handleCheckboxChange}
                          className="checkbox border-black"
                        />
                      </div>
                    ))}
                  </label>
                </div>
              )}
            </div>
          </label>

          {/* subsektor kegiatan */}
          <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
            <div className="label">
              <span className="label-text text-black">Subsektor Kegiatan</span>
            </div>
            <select
              name={"subsektorAcara"}
              value={dataValueAcara.subsektorAcara}
              onChange={handleOnChangeAcara}
              className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
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
              <option value="Pengambangan Permainan">
                Pengambangan Permainan
              </option>
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
              name={"jenisAcara"}
              value={dataValueAcara.jenisAcara}
              onChange={handleOnChangeAcara}
              className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
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
            value={dataValueAcara.namaAcara}
            onChange={handleOnChangeAcara}
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
              value={dataValueAcara.tanggalMulaiAcara}
              onChange={handleOnChangeAcara}
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
              value={dataValueAcara.tanggalAkhirAcara}
              onChange={handleOnChangeAcara}
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
                  checked={dataValueAcara.jamMulai === "08.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"09.00"}
                  value={"09.00"}
                  nama={"jamMulai"}
                  checked={dataValueAcara.jamMulai === "09.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"10.00"}
                  value={"10.00"}
                  nama={"jamMulai"}
                  checked={dataValueAcara.jamMulai === "10.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"11.00"}
                  nama={"jamMulai"}
                  value={"11.00"}
                  checked={dataValueAcara.jamMulai === "11.00"}
                  onChange={handleOnChangeAcara}
                />
              </div>
              <div className="ml-4">
                <Radio
                  label={"12.00"}
                  nama={"jamMulai"}
                  value={"12.00"}
                  checked={dataValueAcara.jamMulai === "12.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"13.00"}
                  nama={"jamMulai"}
                  value={"13.00"}
                  checked={dataValueAcara.jamMulai === "13.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"14.00"}
                  nama={"jamMulai"}
                  value={"14.00"}
                  checked={dataValueAcara.jamMulai === "14.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"15.00"}
                  nama={"jamMulai"}
                  value={"15.00"}
                  checked={dataValueAcara.jamMulai === "15.00"}
                  onChange={handleOnChangeAcara}
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
                  nama={"jamBerakhir"}
                  value={"09.00"}
                  checked={dataValueAcara.jamBerakhir === "09.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"10.00"}
                  nama={"jamBerakhir"}
                  value={"10.00"}
                  checked={dataValueAcara.jamBerakhir === "10.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"11.00"}
                  nama={"jamBerakhir"}
                  value={"11.00"}
                  checked={dataValueAcara.jamBerakhir === "11.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"12.00"}
                  nama={"jamBerakhir"}
                  value={"12.00"}
                  checked={dataValueAcara.jamBerakhir === "12.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"13.00"}
                  nama={"jamBerakhir"}
                  value={"13.00"}
                  checked={dataValueAcara.jamBerakhir === "13.00"}
                  onChange={handleOnChangeAcara}
                />
              </div>
              <div className="ml-4">
                <Radio
                  label={"14.00"}
                  nama={"jamBerakhir"}
                  value={"14.00"}
                  checked={dataValueAcara.jamBerakhir === "14.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"15.00"}
                  nama={"jamBerakhir"}
                  value={"15.00"}
                  checked={dataValueAcara.jamBerakhir === "15.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"16.00"}
                  nama={"jamBerakhir"}
                  value={"16.00"}
                  checked={dataValueAcara.jamBerakhir === "16.00"}
                  onChange={handleOnChangeAcara}
                />
                <Radio
                  label={"17.00"}
                  nama={"jamBerakhir"}
                  value={"17.00"}
                  checked={dataValueAcara.jamBerakhir === "17.00"}
                  onChange={handleOnChangeAcara}
                />
              </div>
            </div>
          </div>

          {/* <TextInput
            label={"Jumlah Peserta"}
            placeholder={"Jumlah Peserta"}
            id={"jumlahPeserta"}
            nama={"jumlahPeserta"}
            value={dataValueAcara.jumlahPeserta}
            onChange={handleOnChangeAcara}
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
              value={jumlahPesertas[item]}
            />
          ))}

          <div className="ml-[85px] mt-4">
            <p className="text-sm mb-2 text-black">Surat Permohonan</p>
            <a href={data.surat} className="underline" target="_blank">
              Lihat Surat Permohonan
            </a>
          </div>

          <div className="w-full max-w-xs ml-[85px] mt-4 text-black ">
            <p className="text-sm mb-2">Unggah Surat Permohonan Baru</p>
            <input
              type="file"
              onChange={(e) => [
                setChangeSurat(true),
                setSurat(e.target.files[0]),
              ]}
              className="file-input file-input-bordered file-input-md  w-full max-w-xs bg-white"
            />
          </div>

          <div className="grid place-content-end px-14 my-5">
            {/* <NavLink to="/Profile"> */}
            <button
              disabled={loadingUpload || loadingUploadSurat}
              className="btn w-20 bg-[#1A8C44] border-white text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-200"
              onClick={handleEdit}
            >
              {loadingUpload || loadingUploadSurat ? "Loading..." : "Next"}
            </button>
            {/* </NavLink> */}
          </div>
        </div>
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
