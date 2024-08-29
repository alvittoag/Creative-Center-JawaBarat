import React from 'react'

export default function Footer() {
  return (
    <div className='bg-[#1A8C44] py-[50px] px-[50px]'>
      <div className="flex items-center">
        <div className="flex flex-col max-w-[50%] p-10">
            <div className="flex items-center">
                <img src="src\assets\logoNav.png" alt="" className='w-[155px]'/>
                <img src="src\assets\logoNav2.png" alt="" className='w-[312px] h-[60px]'/>
            </div>

            <p className='text-white text-justify'>Creative Center merupakan sarana dalam pengembangan dan pemberdayaan ekonomi kreatif Jawa Barat yang memiliki fungsi sebagai pusat inovasi dan kekayaan intelektual, pusat pendidikan dan pelatihan, pusat promosi dan pemasaran, pusat pengembangan industri perangkat lunak dan konten, serta pusat inkubasi bisnis</p>

            <div className="flex mt-6">
                <img src="src\assets\facebook.png" alt="" className='w-[40px] h-[37px] mr-2'/>
                <img src="src\assets\instagram.png" alt="" className='w-[36px] h-[36px] mr-2'/>
                <img src="src\assets\twitter.png" alt="" className='w-[35px] h-[35px] mr-2'/>
                <img src="src\assets\youtube.png" alt="" className=''/>
            </div>
        </div>

        <div className="flex flex-col lg:ml-[200px] xl:ml-[200px]">
            <p className='text-white font-light hover:underline hover:cursor-pointer'>Tentang Kami</p>
            <p className='text-white font-light hover:underline hover:cursor-pointer mt-4'>Hotline Creative Center</p>
            <p className='text-white font-light hover:underline hover:cursor-pointer mt-4'>Kebijakan Privasi</p>
        </div>

        <hr />
      </div>
    </div>
  )
}
