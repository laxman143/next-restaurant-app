"use client"

import { ProductType } from '@/types/types';
import { useCartStore } from '@/utils/store';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

// id:string;
type Props = {
  price: number;
  options?: { title: string, additionalPrice: number }[]
}
const Price = ({ product }: { product: ProductType }) => {

  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
    // This will rehydrate the store from local storage when the component mounts
  },[])

  useEffect(() => {
    if (product.options?.length) {
      setTotal(quantity * product.price + product.options[selected].additionalPrice)
    }
    // setTotal(quantity * (product.options?.length ?  Number(product.price) + product.options[selected].additionalPrice  : Number(product.price)))
  }, [quantity, selected, product])


  const handleCart = () => {
    addToCart(
      {
        id: product.id.toString(),
        title: product.title,
        img: product.img,
        price: total,
        ...(product.options?.length && { optionTitle: product.options[selected].title }),
        quantity: quantity,
      }
    )
    toast.success("Product added to the cart");
  };

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>${total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className='flex  gap-4'>
        {product.options?.length && product.options?.map((option, index) => (
          <button className='p-2 ring-1 min-w-[6rem] ring-red-400 rounded-md'
            style={{
              background: selected === index ? "rgb(248,113,113)" : "white",
              color: selected == index ? "white" : "red"
            }}
            onClick={() => setSelected(index)}
            key={option.title}>
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANITY AND ADD BUTTON CONTAINER */}
      <div className='flex justify-between items-center '>
        {/* QUANTITY */}
        <div className='flex justify-between w-full p-3 ring-1 ring-red-500'>
          <span>Quantity</span>
          <div className='flex gap-4 items-center'>
            <button onClick={() => setQuantity((prev) => prev > 1 ? prev - 1 : 1)}>{'<'}</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev < 9 ? prev + 1 : 9)}>{'>'}</button>
          </div>
        </div>

        {/* CART BUTTON */}
        <button className='uppercase cursor-pointer w-56 bg-red-500 text-white p-3 ring-1 ring-red-500'
          onClick={handleCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Price