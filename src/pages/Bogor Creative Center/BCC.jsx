import React from 'react'
import Navbar from '../../components/globals/Navbar'
import CardRuangan from '../../components/globals/CardRuangan'
import assets from '../../assets/assets'
import Footer from '../../components/globals/Footer'

export default function BCC() {
  return (
    <div className='bg-white'>
      <Navbar/>
      <div className="hero mt-11 mb-14">
        <img src="src\assets\bogor.png" alt="" />
      </div>

      <div className="flex mx-auto w-[80%]">
        <div className="flex flex-col">
        <p className='text-black leading-relaxed text-justify mr-20'>Bogor Creative Center terletak di Jl. Ir. H. Juanda, No. 4, RT. 03 / RW. 01, Kel. Pabaton, Kec. Bogor Tengah, Kota Bogor. 
            Letaknya yang strategis berada di pusat kota dan berada di sebelah utara Gedung Kepresidenan Kota Bogor / Kebun Raya Bogor. Bogor Creative Center juga memilik akses yang mudah dijangkau karena dekat dengan Pintu Tol Bogor, dimana dapat ditempuh kurang lebih 10 menit.</p>
            <p className='text-black mt-4'><a className='font-bold'>Luas Area</a> : 14.572 m2</p>
            <p className='text-black mt-3'><a className='font-bold'>Kapasitas Parkir</a> : 50 Mobil dan Motor</p>
            <a href="" className='btn text-white border-white bg-[#1A8C44] mt-10 w-44'>Lihat Jadwal Ruangan</a>
        </div>
        <div className="width: 100% rounded-lg"><iframe width="400" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Jl.%20Ir.%20H.%20Juanda%20No.4,%20RT.03/RW.01,%20Pabaton,%20Kecamatan%20Bogor%20Tengah,%20Kota%20Bogor,%20Jawa%20Barat%2016121+(Bogor%20Creative%20Center)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>
      </div>

      <div className="flex mt-20 mx-auto w-[90%] justify-center">
        <CardRuangan
          src={assets.ruangan1}
          title={"Cafe Outdoor"}
          kapasitas={"Kapasitas 30 Orang"}/>
        <CardRuangan
          src={assets.bogor2}
          title={"Cafe Indoor"}
          kapasitas={"Kapasitas 25 Orang"}/>
        <CardRuangan
          src={assets.bogor3}
          title={"Ruang Galeri"}
          kapasitas={"Kapasitas 20 Orang"}/>
      </div>

      <div className="flex mt-20 mx-auto w-[90%] justify-center mb-20">
        <CardRuangan
          src={assets.bogor4}
          title={"Auditorium"}
          kapasitas={"Kapasitas 70 Orang"}/>
        <CardRuangan
          src={assets.bogor5}
          title={"Ruang Fotografi"}
          kapasitas={"Kapasitas 25 Orang"}/>
        <CardRuangan
          src={assets.bogor6}
          title={"Ruang Musik"}
          kapasitas={"Kapasitas 10 Orang"}/>
      </div>
      
      <Footer/>
    </div>
  )
}
