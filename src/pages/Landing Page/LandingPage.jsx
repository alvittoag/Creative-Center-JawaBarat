import { NavLink } from "react-router-dom";
import Footer from "../../components/globals/Footer";
import Navbar from "../../components/globals/Navbar";

function LandingPage() {
  return (
    <div className="bg-[#fdfdfd]">
      <Navbar />
      {/* hero */}
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="src\assets\bogor.png" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-outline btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-outline btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="src\assets\purwakarta.png" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-outline btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-outline btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="src\assets\ahmad.png" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-outline btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-outline btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      {/* section1 */}
      <div className="mx-auto w-[80%] py-10 mt-16">
        <div className="flex  mx-auto items-center">
          <div className="flex flex-col">
            <p className="text-black font-semibold">ABOUT</p>
            <p className="font-semibold text-black text-[40px]">
              Creative Center Jawa Barat
            </p>
            <img src="src\assets\section-one.png" alt="" className="w-[60%]" />
            <p className="mt-2 text-black font-semibold">
              Pemanfaatan fasilitas Creative Center Jawa Barat tidak dipungut
              biaya apapun.
            </p>
          </div>

          <div className="flex flex-col w-[40%] text-justify text-black pt-10 leading-loose">
            <p>
              {" "}
              Creative Center merupakan sarana dalam pengembangan dan
              pemberdayaan ekonomi kreatif Jawa Barat yang memiliki fungsi
              sebagai pusat inovasi dan kekayaan intelektual, pusat pendidikan
              dan pelatihan, pusat promosi dan pemasaran, pusat pengembangan
              industri perangkat lunak dan konten, serta pusat inkubasi bisnis.
            </p>
            <NavLink to="/pedomanRuangan">
              <a
                href=""
                className="btn text-white border-white bg-[#1A8C44] mt-10"
              >
                Lihat Persyaratan
              </a>
            </NavLink>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div className="flex mx-auto w-[90%] mt-24 mb-36">
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img src="src\assets\bogor.png" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">Bogor Creative Center</h2>
            <p className="text-[13px]">
              Jl. Ir. H. Juanda, No. 4, RT. 03 / RW. 01, Kel. Pabaton, Kec.
              Bogor Tengah, Kota Bogor.
            </p>
            <div className="card-actions justify-end">
              <NavLink to="/BogorCreativeCenter">
                <button className="btn bg-white text-black border-none hover:text-white">
                  Lihat Fasilitas
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl image-full mx-4">
          <figure>
            <img src="src\assets\purwakarta.png" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">
              Purwakarta Creative Center
            </h2>
            <p className="text-[13px]">
              Jl. K.K Singawinata No.87, Nagri Kidul, Kec. Purwakarta, Kab.
              Purwakarta
            </p>
            <div className="card-actions justify-end">
              <NavLink to="/PurwakartaCreativeCenter">
                <button className="btn bg-white text-black border-none hover:text-white">
                  Lihat Fasilitas
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img src="src\assets\ahmad.png" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">
              Ruang Kreatife Ahmad Djuhara
            </h2>
            <p className="text-[13px]">
              Jl. Kesenden, Kec. Kejaksan, Kota Cirebon
            </p>
            <div className="card-actions justify-end">
              <NavLink to="/AhmadDjuhara">
                <button className="btn bg-white text-black border-none hover:text-white">
                  Lihat Fasilitas
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className="mx-auto w-[80%] my-20">
        <div className="grid grid-cols-2">
          <div className="">
            <div className="collapse collapse-arrow border border-base-300 bg-white text-black">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-lg font-medium">
                1. Cek Ketersedian Jadwal Ruangan
              </div>
              <div className="collapse-content">
                <p>
                  Langkah pertama, anda bisa cek{" "}
                  <a href="" className="font-bold underline">
                    jadwal
                  </a>{" "}
                  ruangan yang anda ingin pinjam apakah masih tersedia atau
                  tidak.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-base-300 bg-white mt-2 text-black">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg font-medium">
                2. Login atau Buat Akun Terlebih Dahulu
              </div>
              <div className="collapse-content">
                <p>
                  Selanjutnya untuk melakukan pengajuan peminjaman ruangan, anda
                  diwajibkan untuk{" "}
                  <a href="" className="font-bold underline">
                    login
                  </a>{" "}
                  atau{" "}
                  <a href="" className="font-bold underline">
                    membuat akun
                  </a>{" "}
                  terlebih dahulu.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-base-300 bg-white mt-2 text-black">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg font-medium">
                3. Isi dan Lengkapi Persyaratan
              </div>
              <div className="collapse-content">
                <p>
                  Langkah berikutnya, isi{" "}
                  <a href="" className="font-bold underline">
                    form peminjaman ruangan
                  </a>{" "}
                  dan lengkapi persyaratan yang dibutuhkan. Dokumen yang harus
                  dilengkapi adalah : KTP peminjam ruangan, surat permohonan
                  peminjaman ruangan{" "}
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-base-300 bg-white mt-2 text-black">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg font-medium">
                4. Cek Status Pengajuan Secara Berkala
              </div>
              <div className="collapse-content">
                <p>
                  Langkah berikutnya, isi{" "}
                  <a href="" className="font-bold underline">
                    form peminjaman ruangan
                  </a>{" "}
                  dan lengkapi persyaratan yang dibutuhkan. Dokumen yang harus
                  dilengkapi adalah : KTP peminjam ruangan, surat permohonan
                  peminjaman ruangan{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <img
              src="src\assets\phone.png"
              alt=""
              className="rounded-lg ml-8 w-[90%]"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
