import React from 'react'
import Navbar from '../../components/globals/Navbar'
import CardRuangan from '../../components/globals/CardRuangan'
import assets from '../../assets/assets'
import Footer from '../../components/globals/Footer'

export default function PCC() {
  return (
    <div className='bg-white'>
      <Navbar/>
      <div className="hero mt-11 mb-14">
        <img src="src\assets\purwakarta.png" alt="" />
      </div>

      <div className="flex mx-auto w-[80%]">
        <div className="flex flex-col">
        <p className='text-black leading-relaxed text-justify mr-20'>Purwakarta Creative Center memiliki letak yang strategis berada di pusat koda dan berada di sebelah timur situ buleud yang menjadi ikon Kabupaten Purwakarta. Purwakarta Creative Center juga memiliki akses yang mudah dijangkau karena dekat dengan Gerbang Tol Jatiluhur, dimana dapat ditempuh kurang lebih 10 menit.</p>
            <p className='text-black mt-4'><a className='font-bold'>Luas Area</a> : 23.826 m2</p>
            <p className='text-black mt-3'><a className='font-bold'>Kapasitas Parkir</a> : 100 Mobil dan Motor</p>
            <a href="" className='btn text-white border-white bg-[#1A8C44] mt-10 w-44'>Lihat Jadwal Ruangan</a>
        </div>
        <div className="width: 100%"><iframe width="400" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Jl.%20K.K%20Singawinata%20No.1,%20Sindangkasih,%20Kec.%20Purwakarta,%20Kabupaten%20Purwakarta,%20Jawa%20Barat%2041112+(Purwakarta%20Creative%20Center)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe></div>
      </div>

      <div className="flex mt-20 mx-auto w-[90%] justify-center">
        <CardRuangan
        src={assets.purwakarta1}
        title={"Ruang Flexible"}
        kapasitas={"Kapasitas 100 Orang"}/>
        <CardRuangan
        src={assets.purwakarta2}
        title={"Workshop"}
        kapasitas={"Kapasitas 50 Orang"}/>
        <CardRuangan
        src={assets.purwakarta3}
        title={"Auditorium"}
        kapasitas={"Kapasitas 60 Orang"}/>
      </div>

      <div className="flex mt-20 mx-auto w-[90%] justify-center mb-20">
        <CardRuangan
        src={assets.purwakarta4}
        title={"Ruang Kelas"}
        kapasitas={"Kapasitas 20 Orang"}/>
        <CardRuangan
        src={assets.purwakarta5}
        title={"Ruang Audio"}
        kapasitas={"Kapasitas 10 Orang"}/>
      </div>
      
      <Footer/>
    </div>
  )
}
