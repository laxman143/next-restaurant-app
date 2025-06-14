import { ActionTypes, CartItemType, CartType } from "@/types/types"
import { create } from "zustand"
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
}

export const useCartStore  = create(persist<CartType & ActionTypes>((set,get) => ({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart(item){

        const products= get().products;
        const productInState = products.find((product: CartItemType) => product.id === item.id);

        if(productInState){
            const updatedProducts = products.map((product: CartItemType) =>
             product.id == productInState.id ? {
                    ...item,
                    quantity: product.quantity + item.quantity,
                    price: product.price + item.price
             } : item
            )
            set((state)=>({
                products: updatedProducts,
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price
            }))

        }else {
        set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price
        }));
    }
    },
    removeFromCart(item){ 
        set((state)=> ({
            products: state.products.filter((product: CartItemType) => product.id !== item.id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price
        }))
    }
}),{name: "cart", skipHydration: true}));
//  Here we are using Zustand perisit to store the cart data in local storage.
// This allows the cart data to persist even after the user refreshes the page or closes the browser.