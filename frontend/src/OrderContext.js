import React, { createContext, useState } from "react";

export const OrderContext = createContext()

export const OrderProvider = ({children}) => {
    const [orders, setOrders] = useState([])
    
    const addOrder = (order) => {
        setOrders((prev) => {
            var maxSequence = 0
            if(prev.length > 0){
                maxSequence = Math.max(...prev.map((o) => o.menu_sequence))
            }

            return [...prev, {...order, menu_sequence : maxSequence}];
        });
      };
    
      const updateOrder = (order) => {
        setOrders((prev) => {
          const existingOrderIndex = prev.findIndex((o) => o.menu_sequence === order.menu_sequence);
          if (existingOrderIndex > -1) {
            if(order.menu_quantity === 0 ){
                return prev.filter((o) => o.menu_sequence !== order.menu_sequence)
            }else{
                const updatedOrders = [...prev];
                updatedOrders[existingOrderIndex] = order;
                return updatedOrders;
            }
          }
          return prev;
        });
      };
    
      const deleteOrder = (menu_sequence) => {
        setOrders((prev) => prev.filter((order) => order.menu_sequence !== menu_sequence));
      };

      const clearOrder = () => {
        setOrders([])
      }

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder, clearOrder }}>
            {children}
        </OrderContext.Provider>
    )
}