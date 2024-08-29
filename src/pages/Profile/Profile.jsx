import Swal from "sweetalert2";
import Navbar from "../../components/globals/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { supabase } from "../../lib/supabase";
import convertStringify from "../../lib/convertStringify";
import { convertRupiah } from "../../lib/convertRupiah";

export default function Profile() {
  const [dataDraft, setdataDraft] = React.useState(null);
  const [dataPinjam, setdataPinjam] = React.useState([]);

  console.log(dataDraft);

  const [refetch, setRefetch] = React.useState(null);
  const [dataKerusakan, setDataKerusakan] = React.useState([]);
  const [dataFormPemohon, setDataFormPemohon] = React.useState(null);
  const [dataFormIntansi, setDataFormIntansi] = React.useState(null);

  const localStorageuser = localStorage.getItem("user");

  const user = JSON.parse(localStorageuser);

  React.useEffect(() => {
    const getLocalStorageData = () => {
      const localDraft = JSON.parse(localStorage.getItem("datapinjam"));
      setdataDraft(localDraft);
    };

    const getDataPinjam = async () => {
      try {
        const { data, error } = await supabase
          .from("peminjaman")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setdataPinjam(data);
      } catch (error) {
        Swal.fire({
          title: "Gagal",
          text: "Data gagal diambil",
          icon: "error",
        });
      }
    };

    getLocalStorageData();
    getDataPinjam();
  }, [refetch]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase
          .from("kerusakan")
          .select(`*, users(*)`)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setDataKerusakan(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengambil data",
        });
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const userLcl = localStorage.getItem("user");

      const user = JSON.parse(userLcl);
      try {
        let { data, error } = await supabase
          .from("pemohon")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        setDataFormPemohon(data[0] ?? null);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const userLcl = localStorage.getItem("user");

      const user = JSON.parse(userLcl);
      try {
        let { data, error } = await supabase
          .from("intansi")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        setDataFormIntansi(data[0] ?? null);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const navigate = useNavigate();

  const handleDeleteDraft = (id, confirm) => {
    console.log(id, confirm);
    const newData = dataDraft.filter((item) => item.id !== id);

    if (newData.length === 0) {
      localStorage.removeItem("datapinjam");
    } else {
      localStorage.setItem("datapinjam", JSON.stringify(newData));
    }

    setdataDraft(newData);

    setRefetch(id);

    if (!confirm) {
      Swal.fire({
        title: "Berhasil",
        text: "Data berhasil dihapus",
        icon: "success",
      });
    }
  };

  const handleConfirm = async (value) => {
    try {
      const { error } = await supabase
        .from("peminjaman")
        .insert({
          id_draft: value.id,
          user_id: value.user.id,
          user_status: "Terkirim",
          pemohon: JSON.stringify(value.pemohon),
          intansi: JSON.stringify(value.intansi),
          acara: JSON.stringify(value.acara),
          ktp: value.ktp,
          surat: value.surat,
        })
        .select();

      if (error) {
        throw error;
      }

      Swal.fire({
        title: "Berhasil",
        text: "Data berhasil dikirim",
        icon: "success",
      });

      handleDeleteDraft(value.id, true);
      setRefetch(Math.random());
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Data gagal dikirim",
        icon: "error",
      });
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const { error } = await supabase
        .from("peminjaman")
        .update({
          user_status: "Dibatalkan",
          admin_status: "Dibatalkan",
          admin_utama_status: "Dibatalkan",
        })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      Swal.fire({
        title: "Berhasil",
        text: "Data berhasil dibatalkan",
        icon: "success",
      });

      setRefetch(Math.random());
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Data gagal dibatalkan",
        icon: "error",
      });
      console.log(error);
    }
  };

  return (
    <div className="bg-white h-auto">
      <Navbar />

      <div className="px-10 py-5">
        <button
          className=" py-5 bg-green-500 text-white w-96 rounded-2xl"
          onClick={() =>
            navigate("/form-profile", {
              state: { pemohon: dataFormPemohon, intansi: dataFormIntansi },
            })
          }
        >
          Isi Data Pemohon dan Intansi
        </button>
      </div>

      <p className="text-black px-10  pb-5 font-semibold text-lg">
        Data Permohonan
      </p>
      <div className="overflow-x-auto bg-white mx-10 p-5 rounded-lg text-black border ">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-black text-center">
              <th>No Permohonan</th>
              <th>Pemohon</th>
              <th>Nama Acara</th>
              <th>Tanggal Mulai</th>
              <th>Lokasi Gedung</th>
              <th>Status</th>
              <th>Aksi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Draft Only */}
            {dataDraft?.map((item, key) => (
              <tr className="text-center" key={key}>
                <td>0001</td>
                <td>{item.pemohon.namaPemohon}</td>
                <td>{item.acara.namaAcara}</td>
                <td>{item.acara.tanggalMulaiAcara}</td>
                <td>{item.acara.lokasiGedung}</td>
                <td className="font-bold">
                  <p className="p-2 rounded-lg text-center bg-gray-200">
                    Draft
                  </p>
                </td>
                <th className="flex justify-center">
                  {/* Edit */}
                  <div className="tooltip cursor-pointer" data-tip="Edit">
                    <NavLink to="/editPermohonan" state={{ data: item }}>
                      <img
                        src="src\assets\editing.png"
                        alt=""
                        className="w-[21px] h-[21px] mr-2"
                      />
                    </NavLink>
                  </div>

                  {/* Kirim */}
                  <button
                    onClick={() => handleConfirm(item)}
                    className="tooltip cursor-pointer"
                    data-tip="Kirim"
                  >
                    <img src="src\assets\checked.png" alt="" />
                  </button>

                  {/* Hapus */}
                  <div
                    className="tooltip cursor-pointer mt-1"
                    data-tip="Batalkan"
                    onClick={() => {
                      handleDeleteDraft(item.id);
                    }}
                  >
                    <img
                      src="src\assets\close.png"
                      alt=""
                      className="w-[19px] h-[19px] ml-2"
                    />
                  </div>
                </th>
              </tr>
            ))}

            {/* Row From API */}
            {dataPinjam.map((item) => (
              <tr key={item.id} className="text-center">
                <td>{item.id}</td>
                <td>{convertStringify(item.pemohon).namaPemohon}</td>
                <td>{convertStringify(item.acara).namaAcara}</td>
                <td>{convertStringify(item.acara).tanggalMulaiAcara}</td>
                <td>{convertStringify(item.acara).lokasiGedung}</td>
                <td className="font-bold">
                  <p
                    className={`p-2 rounded-lg text-center bg-gray-200 ${
                      item.user_status === "Diterima" && "bg-green-500"
                    } ${item.user_status === "Ditolak" && "bg-red-500"} ${
                      item.user_status === "Selesai" && "bg-green-500"
                    } ${
                      item.user_status === "Dibatalkan" &&
                      "bg-red-600 text-white"
                    }`}
                  >
                    {item.user_status}
                  </p>
                </td>
                {item.user_status === "Diterima" && (
                  <th className="flex items-center justify-center gap-5">
                    <NavLink to="/detailPermohonan" state={item}>
                      <p className="cursor-pointer font-normal bg-white p-2 rounded-lg">
                        details
                      </p>
                    </NavLink>

                    <button
                      onClick={() => handleCancel(item.id)}
                      className="bg-red-600 p-2 rounded-md text-white font-normal"
                    >
                      Batalkan
                    </button>
                  </th>
                )}

                {item.user_status === "Ditolak" && (
                  <th className="flex">
                    <NavLink to="/detailPermohonann" state={item.alasan_tolak}>
                      <p className="cursor-pointer font-normal bg-white p-2 rounded-lg">
                        details
                      </p>
                    </NavLink>
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto bg-white mx-10 p-5 rounded-lg text-black border mt-20">
        <p className="text-black pb-5 font-semibold text-lg">
          Data Denda Kerusakan Fasilitas
        </p>
        <table className="table w-[100%]">
          {/* head */}
          <thead className="bg-slate-200 rounded-lg">
            <tr className="text-black text-center">
              <th>No Laporan</th>
              <th>Pemohon</th>
              <th>Lokasi Gedung</th>
              <th>Ruangan</th>
              <th>Tanggal</th>
              <th>Denda</th>
              <th>Bukti Kerusakan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataKerusakan.map((item) => (
              <tr className="text-center">
                <td>{item.id}</td>
                <td>{item.users.nama}</td>
                <td>{item.lokasi_gedung}</td>
                <td>{JSON.parse(item.ruangan).join(", ")}</td>
                <td>{item.tanggal}</td>
                <td>{convertRupiah(item.denda)}</td>
                <td>
                  <a
                    className="underline"
                    href={item.bukti_kerusakan}
                    target="_blank"
                  >
                    Lihat Bukti
                  </a>
                </td>
                <NavLink
                  to={
                    item.user_status === "Belum Bayar" &&
                    "/detailKerusakanFasilitas"
                  }
                  state={item}
                >
                  <td>
                    <p
                      className={`p-2 font-bold text-sm ${
                        item.user_status === "Belum Bayar" && "bg-red-300"
                      } ${
                        item.user_status === "Sudah Bayar" && "bg-green-300"
                      } ${item.user_status === "Selesai" && "bg-green-500"} 
                      
                      ${
                        item.user_status === "Pembayaran Ditolak" &&
                        "bg-red-400"
                      } rounded-lg`}

                    >
                      {item.user_status}
                    </p>
                  </td>
                </NavLink>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
