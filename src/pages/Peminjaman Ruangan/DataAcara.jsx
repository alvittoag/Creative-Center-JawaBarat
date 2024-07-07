import React from 'react'
import Navbar from '../../components/globals/Navbar'
import TextInput from '../../components/globals/TextInput'
import TextArea from '../../components/globals/TextArea'
import FileInput from '../../components/globals/FileInput'
import Select from '../../components/globals/Select'
import Radio from '../../components/globals/Radio'
import { NavLink, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"

const validation = Yup.object().shape({
  lokasiGedung: Yup.string().required("Lokasi Gedung Wajib Diisi"),
  namaRuangan: Yup.string().required("Nama Ruangan Wajib Diisi"),
  lokasiGedung: Yup.string().required("Lokasi Gedung Wajib Diisi"),
  subsektorAcara: Yup.string().required("Subsektor Acara Wajib Diisi"),
  jenisAcara: Yup.string().required("Jenis Acara Wajib Diisi"),
  namaAcara: Yup.string().required("Nama Acara Wajib Diisi"),
  tanggalMulaiAcara: Yup.string().required("Tanggal Mulai Acara Wajib Diisi"),
  tanggalAkhirAcara: Yup.string().required("Tanggal Akhir Acara Wajib Diisi"),
  jamMulai: Yup.string().required("Jam Mulai Wajib Diisi"),
  jamBerakhir: Yup.string().required("Jam Berakhir Wajib Diisi"),
  jumlahPeserta: Yup.number().integer().required("Jumlah Peserta Wajib Diisi"),
  suratPermohonan: Yup.string().required("Surat Permohonan Wajib Diisi"),
})

export default function DataAcara() {
  const {state}= useLocation()
  const formik = useFormik({
    initialValues: {
      lokasiGedung: state?.lokasiGedung || "",
      namaRuangan: state?.namaRuangan || "",
      subsektorAcara: state?.subsektorAcara || "",
      jenisAcara: state?.jenisAcara || "",
      namaAcara: state?.namaAcara || "",
      tanggalMulaiAcara: state?.tanggalMulaiAcara || "",
      tanggalAkhirAcara: state?.tanggalAkhirAcara || "",
      jamMulai: state?.jamMulai || "",
      jamBerakhir: state?.jamBerakhir || "",
      jumlahPeserta: state?.jumlahPeserta || "",
      suratPermohonan: state?.suratPermohonan || ""
    },
    validationSchema: validation
  })

  const handleOnChange = (event) => {
    const { target } = event
    formik.setFieldValue(target.name, target.value)
    console.log(target.name + target.value);
  }
  
  return (
    <div>
      <Navbar/>
      <div className="flex bg-white">
        <div className="">
              <ul className="menu bg-[#F6F6F6] text-black text-[15px] font-semibold w-64 h-screen">
                  <li>
                      <h2 className="menu-title text-black">Form Peminjaman Ruangan</h2>
                      <ul>
                      <NavLink to="/peminjaman">
                        <li><a>Data Pemohon</a></li>
                      </NavLink>
                      <NavLink to="/DataIntansi">
                        <li><a>Data Intansi</a></li>
                      </NavLink>
                      <NavLink to="/DataAcara">
                        <li><a>Data Acara</a></li>
                      </NavLink>
                      </ul>
                  </li>
              </ul>
          </div>

        <div className="flex flex-col bg-[#fcfcfc] w-[80%] m-7 rounded-lg border justify-center">

          {/* lokasi gedung */}
            <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
                <div className="label">
                    <span className="label-text text-black">Lokasi Gedung</span>
                </div>
                <select 
                  className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
                  name='lokasiGedung'
                  value={formik.values.lokasiGedung}
                  onChange={handleOnChange}
                  >
                    <option disabled selected>Pilih</option>
                    <option value="Bogor Creative Center">[BCC] Bogor Creative Center</option>
                    <option value="Purwakarta Creative Center">[PCC] Purwakarta Creative Center</option>
                    <option value="Ruang Kreatif Ahmad Djuhara">[AD] Ruang Kreatif Ahmad Djuhara</option>
                </select>
            </label>

            {/* ruangan */}
              <label className=" grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
                <div className="flex">
                    <div className="label">
                        <span className="label-text text-black">Ruangan</span>
                    </div>

                    <div className="form-control text-black ml-20">
                      <label className="label items-start flex flex-col">
                        <p className='text-sm font-bold'>Bogor Creative Center</p>
                          <div className="flex mt-3 gap-4 justify-between w-36">
                            <span className="label-text text-black">Cafe Outdoor</span>
                            <input type="checkbox" className="checkbox border-black" />
                          </div>
                          <div className="flex mt-3 gap-4 justify-between w-36">
                            <span className="label-text text-black">Cafe Indoor</span>
                            <input type="checkbox" className="checkbox border-black" />
                          </div>
                          <div className="flex mt-3 gap-4 justify-between w-36">
                            <span className="label-text text-black">Ruang Galeri</span>
                            <input type="checkbox" className="checkbox border-black" />
                          </div>
                          <div className="flex mt-3 gap-4 justify-between w-36">
                            <span className="label-text text-black">Ruang Fotografi</span>
                            <input type="checkbox" className="checkbox border-black" />
                          </div>
                          <div className="flex mt-3 gap-4 justify-between w-36">
                            <span className="label-text text-black ">Ruang Musik</span>
                            <input type="checkbox" className="checkbox border-black" />
                          </div>
                          <div className="flex mt-3 gap-4 justify-between w-36">
                            <span className="label-text text-black">Auditorium</span>
                            <input type="checkbox" className="checkbox border-black" />
                          </div>
                      </label>
                    </div>
                      <div className="form-control text-black ml-20">
                        <label className="label items-start flex flex-col">
                          <p className='text-sm font-bold'>Purwakarta Creative Center</p>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Ruang Flexible</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Workshop</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Auditorium</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Ruang Kelas</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black ">Ruang Audio</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                        </label>
                      </div>
                      <div className="form-control text-black ml-20">
                        <label className="label items-start flex flex-col">
                          <p className='text-sm font-bold'>Ruang Kreatif Ahmad Djuhara</p>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Gor</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Plaza Terbuka</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Workshop</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Co-working Space</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black ">Auditorium</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
                            <div className="flex mt-3 gap-4 justify-between w-36">
                              <span className="label-text text-black">Kantin</span>
                              <input type="checkbox" className="checkbox border-black" />
                            </div>
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
                    name='subsektorAcara'
                    value={formik.values.subsektorAcara}
                    onChange={handleOnChange}>
                      <option disabled selected>Pilih</option>
                      <option value="Aplikasi">Aplikasi</option>
                      <option value="Arsitektur">Arsitektur</option>
                      <option value="Desain Interior">Desain Interior</option>
                      <option value="Desain Produk">Desain Produk</option>
                      <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
                      <option value="Film, Animasi dan Video">Film, Animasi dan Video</option>
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
                  name='jenisAcara'
                  value={formik.values.jenisAcara}
                  onChange={handleOnChange}>
                    <option disabled selected>Pilih</option>
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
            onChange={handleOnChange}/>

            {/* tanggal mulai */}
            <label className="grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
              <div className="label">
                  <span className="label-text text-black">Tanggal Mulai</span>
                </div>
                <input 
                  type="date" 
                  id='tanggalMulaiAcara'
                  name='tanggalMulaiAcara'
                  className="input input-bordered w-56 bg-white placeholder:text-sm"
                  value={formik.values.tanggalMulaiAcara} 
                  onChange={handleOnChange}/>
            </label>

            {/* tanggal selesai */}
            <label className="grid grid-cols-2 form-control w-full max-w-xs ml-20 mt-4">
              <div className="label">
                  <span className="label-text text-black">Tanggal Berakhir</span>
                </div>
                <input 
                  type="date" 
                  id='tanggalAkhirAcara'
                  name='tanggalAkhirAcara'
                  className="input input-bordered w-56 bg-white placeholder:text-sm" 
                  value={formik.values.tanggalAkhirAcara}
                  onChange={handleOnChange}/>
            </label>

            {/* jam mulai */}
            <div className="flex w-full max-w-xs ml-[85px] mt-4 text-black ">
              <p className='w-40 text-sm'>Jam Mulai</p>
              <div className="flex">
                <div className="">
                  <Radio
                    label={"08.00"}
                    nama={"jamMulai"}
                    value={"08.00"}
                    onChange={handleOnChange}
                    checked={ state?.jamMulai === '08.00' || formik.values.jamMulai==='08.00'}/>
                  <Radio
                    label={"09.00"}
                    nama={"jamMulai"}
                    value={"09.00"}
                    onChange={handleOnChange}
                    checked={ state?.jamMulai === '09.00' || formik.values.jamMulai==='09.00'}/>
                  <Radio
                    label={"10.00"}
                    nama={"jamMulai"}
                    onChange={handleOnChange}
                    checked={ state?.jamMulai === '10.00' || formik.values.jamMulai==='10.00'}/>
                  <Radio
                    label={"11.00"}
                    nama={"jamMulai"}
                    onChange={handleOnChange}
                    checked={ state?.jamMulai === '11.00' || formik.values.jamMulai==='11.00'}/>
                </div>
                <div className="ml-4">
                  <Radio
                    label={"12.00"}
                    nama={"jamMulai"}
                    onChange={handleOnChange}
                    checked={ state?.jamMulai === '12.00' || formik.values.jamMulai==='12.00'}/>
                  <Radio
                    label={"13.00"}
                    nama={"jamMulai"}
                    onChange={handleOnChange}
                    checked={ state?.jamMulai === '13.00' || formik.values.jamMulai==='13.00'}/>
                  <Radio
                    label={"14.00"}
                    nama={"jamMulai"}
                    onChange={handleOnChange}
                    checked={ state?.jamMulai === '14.00' || formik.values.jamMulai==='14.00'}/>
                  <Radio
                    label={"15.00"}
                    nama={"jamMulai"}
                    onChange={handleOnChange}
                    checked={ state?.jamMulai === '15.00' || formik.values.jamMulai==='15.00'}/>
                </div>
              </div>
            </div>

            {/* jam berakhir */}
            <div className="flex w-full max-w-xs ml-[85px] mt-4 text-black ">
              <p className='w-40 text-sm'>Jam Berakhir</p>
              <div className="flex">
                <div className="">
                  <Radio
                    label={"09.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '09.00' || formik.values.jamBerakhir==='09.00'}/>
                  <Radio
                    label={"10.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '10.00' || formik.values.jamBerakhir==='10.00'}/>
                  <Radio
                    label={"11.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '11.00' || formik.values.jamBerakhir==='11.00'}/>
                  <Radio
                    label={"12.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '12.00' || formik.values.jamBerakhir==='12.00'}/>
                  <Radio
                    label={"13.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '13.00' || formik.values.jamBerakhir==='13.00'}/>
                </div>
                <div className="ml-4">
                  <Radio
                    label={"14.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '14.00' || formik.values.jamBerakhir==='14.00'}/>
                  <Radio
                    label={"15.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '15.00' || formik.values.jamBerakhir==='15.00'}/>
                  <Radio
                    label={"16.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '16.00' || formik.values.jamBerakhir==='16.00'}/>
                  <Radio
                    label={"17.00"}
                    nama={"jamBerakhir"}
                    onChange={handleOnChange}
                    checked={ state?.jamBerakhir === '17.00' || formik.values.jamBerakhir==='17.00'}/>
                </div>
              </div>
            </div>
            
            <TextInput
            label={"Jumlah Peserta"}
            placeholder={"Jumlah Peserta"}
            id={"jumlahPeserta"}
            nama={"jumlahPeserta"}
            onChange={handleOnChange}
            value={formik.values.jumlahPeserta}/>

            <div className="w-full max-w-xs ml-[85px] mt-4 text-black ">
              <p className='text-sm mb-2'>Unggah Surat Permohonan</p>
              <input 
                type="file" 
                className="file-input file-input-bordered file-input-md  w-full max-w-xs bg-white"
                name='suratPermohonan'
                value={formik.values.suratPermohonan} />
            </div>

            <div className="grid place-content-end px-14 my-5">
              <NavLink to="/Profile">
                <div className="btn w-20 bg-[#1A8C44] border-white text-white">Next</div>
              </NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}
