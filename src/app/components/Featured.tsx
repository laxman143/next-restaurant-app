
import { ProductType } from '@/types/types';
import Image from 'next/image'
import React from 'react'

const getData = async() => {
    const res = await fetch("http://localhost:3000/api/products",{
        cache: 'no-store'
    })
    debugger
    if(!res.ok){
        throw new Error("Failed");
    }

    return res.json();
}

const Featured = async () => {
    const featuredProducts: ProductType[]= await getData();
  return (
    <div className='w-screen overflow-x-auto text-red-500'>
        {/* WRAPPER */}
        <div className='w-max flex '>
            {/* SINGLE CONTAINER */}
            {featuredProducts.map((item) => (
            <div key={item.id} className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]'>
                {/* IMAGE  */}
               { item?.img && <div className='relative flex-1 w-full'>
                    <Image src={item.img} alt='' fill className='object-contain hover:rotate-[60deg] transition duration-500'/>
                </div>}
                {/* TEXT */}
                <div className='flex-1 flex flex-col items-center text-center gap-4 justify-center'>
                    <h1 className='text-xl font-bold uppercase'>{item.title}</h1>
                    <p className='p-4 2xl:p-8'>{item.desc}</p>
                    <span className='text-xl font-bold xl:text-2xl 2xl:text-3xl'>{item.price}$</span>
                    <button className='bg-red-500 text-white p-2 rounded-md'>Add to cart</button>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Featured