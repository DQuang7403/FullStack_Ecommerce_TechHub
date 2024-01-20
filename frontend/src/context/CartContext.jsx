import { createContext, useState, useEffect, useId } from "react";
import { v4 as uuidv4 } from "uuid";
const CartContext = createContext();
export function CartProvider({ children }) {
  // const [cartId, setCartId] = useState(() => {
  //   if (localStorage.getItem("cartId")) {
  //     return localStorage.getItem("cartId");
  //   } else {
  //     const id = uuidv4();
  //     localStorage.setItem("cartId", id);
  //     return id;
  //   }
  // });
  const [items, setItems] = useState(0);
  const [update, setUpdate] = useState(false);
  const [refetch, setReFetch] = useState(true);
  const [cart, setCart] = useState([]);
  const formatNumberWithCommas = (number) => {
    number = Number(number).toFixed(2);
    const numberString = number.toString();

    // Split the string into the integer and decimal parts
    const [integerPart, decimalPart] = numberString.split(".");

    // Format the integer part with commas
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // Combine the formatted integer part and the decimal part
    const formattedNumber = `${formattedIntegerPart}.${decimalPart}`;

    return formattedNumber;
  };
  const removeItem = (id) => {
    fetch(`http://127.0.0.1:5000/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ product_id: id}),
    })
      .then((res) => res.json())
      .then((data) => {
        setReFetch(!refetch);
      });
  };
  const updateCart = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/cart/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ cart: cart}),
    })
      .then((res) => res.json())
      .then((data) => {
        setReFetch(!refetch);
        setUpdate(false);
      });
  };

  const contextValue = {
    formatNumberWithCommas: formatNumberWithCommas,
    setItems: setItems,
    removeItem: removeItem,
    updateCart: updateCart,
    setUpdate: setUpdate,
    setReFetch: setReFetch,
    setCart: setCart,
    cart: cart,
    refetch: refetch,
    update: update,
    items: items,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
