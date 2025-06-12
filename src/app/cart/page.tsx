'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/utils/store'
const CartPage = () => {
  const {products, totalItems, totalPrice, removeFromCart, addToCart} = useCartStore();
    useEffect(() => {
      useCartStore.persist.rehydrate();
      // This will rehydrate the store from local storage when the component mounts
    },[])
  return (
    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row'>
      {/* PRODUCT CONTAINER */}
      <div className='h-1/2 p-4 flex flex-col justify-center overflow-auto lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40'>
        {/*  SINGLE ITEM */}
        {products.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4">
             {item.img && (<Image src={item.img} alt="" height={100} width={100} />)} 
            <div className=''>
              <h1 className='uppercase font-bold text-xl'>{item.title} X {item.quantity}</h1>
              {item.optionTitle && <span>{item.optionTitle}</span>}
            </div>
            <h2 className='font-bold'>${item.price}</h2>
            <span className='cursor-pointer' onClick={() => removeFromCart(item)}>X</span>
          </div>
        ))}
    </div>

      {/* PAYMENT CONTAINER */}
      <div className='h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6'>
        <div className='flex justify-between'>
          <span className=''>SubTotal ({totalItems} items)</span>
          <span className=''> {totalPrice} </span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Service Cost </span>
          <span className=''> $0.00 </span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Delivery Cost </span>
          <span className='text-green-500 uppercase '> !Free</span>
        </div>

        <hr className='mr-2' />
         <div className='flex justify-between'>
          <span className=''>TOTAL(INC. VAT) </span>
          <span className='font-bold'> {totalPrice}</span>
        </div>
        <button className='bg-red-500 text-white p-3 rounded-md w/2 self-end'>CHECKOUT</button>
      </div>
    </div>
  )
}

export default CartPage