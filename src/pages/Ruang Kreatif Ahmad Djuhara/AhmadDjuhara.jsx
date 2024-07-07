import React from 'react'
import Navbar from '../../components/globals/Navbar'
import CardRuangan from '../../components/globals/CardRuangan'
import assets from '../../assets/assets'
import Footer from '../../components/globals/Footer'

export default function AhmadDjuhara() {
  return (
    <div className='bg-white'>
      <Navbar/>
      <div className="hero mt-11 mb-14">
        <img src="src\assets\ahmad.png" alt="" />
      </div>

      <div className="flex mx-auto w-[80%]">
        <div className="flex flex-col">
        <p className='text-black leading-relaxed text-justify mr-20'>Ruang Kreatif Ahmad Djuhara terletak di Jl. Kesenden, Kec. Kejaksan, Kota Cirebon. Letaknya yang strategis berada di pusat kota dan berada di sebelah utara Balai Kota Cirebon dan Alun - Alun Kota Cirebon Ruang Kreatif Ahmad Djuhara juga memilik akses yang mudah dijangkau karena dekat dengan Gerbang Tol Plumbon 2, dimana dapat ditempuh kurang lebih 18 menit.</p>
            <p className='text-black mt-4'><a className='font-bold'>Luas Area</a> : 33.000 m2</p>
            <p className='text-black mt-3'><a className='font-bold'>Kapasitas Parkir</a> : 100 Mobil dan Motor</p>
            <a href="" className='btn text-white border-white bg-[#1A8C44] mt-10 w-44'>Lihat Jadwal Ruangan</a>
        </div>
        <div className="width: 100%"><iframe width="400" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=8H23+P4Q,%20Kesenden,%20Kejaksan,%20Cirebon%20City,%20West%20Java%2045121+(Ahmad%20Djuhara%20Cirebon%20Creative%20Center)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps trackers</a></iframe></div>
      </div>

      <div className="flex mt-20 mx-auto w-[90%] justify-center">
        <CardRuangan
        src={assets.ahmad1}
        title={"Gor"}
        kapasitas={"Kapasitas 100 Orang"}/>
        <CardRuangan
        src={assets.ahmad2}
        title={"Workshop"}
        kapasitas={"Kapasitas 50 Orang"}/>
        <CardRuangan
        src={assets.ahmad3}
        title={"Plaza Terbuka"}
        kapasitas={"Kapasitas 60 Orang"}/>
      </div>

      <div className="flex mt-20 mx-auto w-[90%] justify-center mb-20">
        <CardRuangan
        src={assets.ahmad4}
        title={"Co-working Space"}
        kapasitas={"Kapasitas 20 Orang"}/>
        <CardRuangan
        src={assets.ahmad5}
        title={"Auditorium"}
        kapasitas={"Kapasitas 50 Orang"}/>
        <CardRuangan
        src={assets.ahmad6}
        title={"Kantin"}
        kapasitas={"Kapasitas 40 Orang"}/>
      </div>
      
      <Footer/>
    </div>
  )
}
