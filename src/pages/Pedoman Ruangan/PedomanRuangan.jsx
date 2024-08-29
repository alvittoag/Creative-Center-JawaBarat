import React from "react";
import Navbar from "../../components/globals/Navbar";

export default function PedomanRuangan() {
  return (
    <div className="bg-white">
        <Navbar/>
        <div className="justify-center flex">
            <img src="src\assets\option.png" alt="" />
        </div>

        <div className="flex flex-col mx-auto w-[90%] text-black">
            <p className="text-3xl mt-20">Pedoman Ruangan</p>
            <p className="mt-10 font-lg bg-yellow-300 w-[55%] font-semibold rounded-sm p-2">Pemanfaatan Fasilitas Creative Center Jawa Barat Tidak Dipungut Biaya Apapun!</p>
                  {/* section 2 */}
                <div className="mx-auto w-[100%] my-10">
                    <div className="">
                            <div className="collapse collapse-arrow border border-base-300 bg-white text-black">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-lg font-medium">
                                Dokumen apa yang perlu disiapkan untuk meminjam ruangan Creative Center Jawa Barat?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    1. Kartu Identitas Asli (KTP/SIM/PASPORT)
                                    <br />
                                    2. Surat Permohonan Peminjaman Ruangan
                                </p>
                            </div>
                            </div>

                            <div className="collapse collapse-arrow border border-base-300 bg-white mt-2 text-black">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-lg font-medium">
                                Bagaimana caranya agar permohonan peminjaman ruangan lolos proses kurasi?
                            </div>
                            <div className="collapse-content">
                                <p>
                                   <a className="text-lg"> 1. Kegiatan yang diajukan harus termasuk dalam kategori <a className="font-bold">17 subsektor</a>  </a><br />
                                </p>
                                <div className="overflow-x-auto w-[50%] flex">
                                    <div className="">
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                            </thead>
                                            <tbody>
                                            {/* row 1 */}
                                            <tr>
                                                <th>1</th>
                                                <td>Aplikasi</td>
                                            </tr>
                                            <tr>
                                                <th>2</th>
                                                <td>Arsitektur</td>
                                            </tr>
                                            <tr>
                                                <th>3</th>
                                                <td>Desain Interior</td>
                                            </tr>
                                            <tr>
                                                <th>4</th>
                                                <td>Desain Produk</td>
                                            </tr>
                                            <tr>
                                                <th>5</th>
                                                <td>Desain Komunikasi Visual</td>
                                            </tr>
                                            <tr>
                                                <th>6</th>
                                                <td>Film, Animasi dan Video</td>
                                            </tr>
                                            <tr>
                                                <th>7</th>
                                                <td>Fashion</td>
                                            </tr>
                                            <tr>
                                                <th>8</th>
                                                <td>Fotografi</td>
                                            </tr>
                                            <tr>
                                                <th>9</th>
                                                <td>Kuliner</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="">
                                    <table className="table">
                                            {/* head */}
                                            <thead>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th>10</th>
                                                <td>Musik</td>
                                            </tr>
                                            <tr>
                                                <th>11</th>
                                                <td>Penerbitan</td>
                                            </tr>
                                            <tr>
                                                <th>12</th>
                                                <td>Pengembangan Permainan</td>
                                            </tr>
                                            <tr>
                                                <th>13</th>
                                                <td>Periklanan</td>
                                            </tr>
                                            <tr>
                                                <th>14</th>
                                                <td>Seni Kriya</td>
                                            </tr>
                                            <tr>
                                                <th>15</th>
                                                <td>Seni Pertunjukan</td>
                                            </tr>
                                            <tr>
                                                <th>16</th>
                                                <td>Seni Rupa</td>
                                            </tr>
                                            <tr>
                                                <th>17</th>
                                                <td>TV dan Radio</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <p className="text-lg mt-4">
                                    2. Jenis kegiatan harus berada dalam kategori berikut
                                </p>
                                <div className="overflow-x-auto w-[50%] flex">
                                    <div className="">
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                            </thead>
                                            <tbody>
                                            {/* row 1 */}
                                            <tr>
                                                <th>1</th>
                                                <td>Workshop</td>
                                            </tr>
                                            <tr>
                                                <th>2</th>
                                                <td>Coworker</td>
                                            </tr>
                                            <tr>
                                                <th>3</th>
                                                <td>Exhibition</td>
                                            </tr>
                                            <tr>
                                                <th>4</th>
                                                <td>Mini showcase</td>
                                            </tr>
                                            <tr>
                                                <th>5</th>
                                                <td>Class session</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <p className="text-lg mt-4">
                                    3. Pastikan jadwal hari dan waktu yang kamu pilih masih kosong!
                                </p>
                                <p className="text-lg mt-4">
                                    4. Identitas pemohon asli
                                </p>
                            </div>
                            </div>

                            <div className="collapse collapse-arrow border border-base-300 bg-white mt-2 text-black">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-lg font-medium">
                                Apa saja peraturan pelaksanaan acara?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    1. Menjaga fasilitas, sarana, dan prasarana yang tersedia dalam Ruangan/Area <br />
                                    2. Dilarang menempel, memaku benda apapun pada dinding Ruangan <br />
                                    3. Dilarang memasang atribut Partai Politik, atau Ormas Keagamaan yang berbau
                                    politik di Ruangan/Area <br />
                                    4. Seluruh bentuk kerjasama antara penyelenggara kegiatan dan EO menjadi
                                    tanggung jawab penyelenggara. <br />
                                    5. Apabila kegiatan tidak sesuai dengan konteks yang telah diajukan, maka pihak
                                    pengelola dapat menghentikan dan membubarkan kegiatan. <br />
                                    6. Pelaksana kegiatan bertanggungjawab penuh terhadap keamanan dan kebersihan. <br />
                                    7. Mengumpulkan sampah pada titik/tempat sampah yang tersedia <br />
                                    8. Ruangan yang sudah selesai digunakan serta peralatannya wajib dikembalikan
                                    pada posisi semula dan memberikan konfirmasi ke pengelola <br />
                                    9. Peminjam ruangan bertanggung jawab penuh atas kerusakan fasilitas yang
                                    digunakan. <br />
                                    10. Kerusakan fasilitas akan dikenai <a className="font-semibold">denda</a> <br />
                                    11. Apabila ditemukan pelanggaran pada poin-poin Syarat dan Ketentuan ini, maka
                                    pihak pengelola BCC berhak untuk menjatuhkan sanksi kepada Penyelenggara.
                                </p>
                            </div>
                            </div>
                    </div>

                </div>
        </div>
    </div>
  );
}