import { pizzas } from '@/data'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const CategoryPage = () => {
  return (
    <div className='flex flex-wrap text-red-500'>
      {pizzas.map((item)=>(
        <Link href={`/product/${item.id}`} key={item.id}
         className="w-full h-[60vh] border-r-2 border-b-2 group border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between even:bg-fuchsia-50">
          {/* IMAGE CONTAINER */}
          {item.img && (
              <div className='relative h-[80%]'>
                <Image src={item.img} alt="" fill className='object-contain'/>
              </div>
            )}

          {/* TEXT CONTAINER */}
          <div className='flex items-center justify-between font-bold'>
            <h1 className='text-2xl uppercase p-2'>{item.title}</h1>
            <h2 className='group-hover:hidden text-xl'>${item.price}</h2>
            <button className='uppercase hidden group-hover:block bg-red-500 py-2 px-4 rounded-md text-white'>Add to Cart</button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryPage