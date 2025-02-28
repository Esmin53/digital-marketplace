import { create } from "zustand";
import {
    createJSONStorage,
    persist,
  } from 'zustand/middleware'
  

export type CartItem = {
    product: {
        _id: string,
        title: string,
        image: string,
        price: number,
        //priceId: string
        author: string
    } 
}

type CartState = {
    items: CartItem[],
    addItem: (product: {
        _id: string,
        title: string,
        image: string,
        price: number,
        //priceId: string
        author: string
    } ) => void,
    removeItem: (productId: string) => void,
    clearCart: () => void
}

export const useCart = create<CartState>()(
    persist(
      (set) => ({
        items: [],
        addItem: (product) =>
          set((state) => {
            return { items: [...state.items, { product }] }
          }),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter(
              (item) => item.product._id !== id
            ),
          })),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )