import React from "react";

const CartButton = ({ showMenu, count }) => {
  return (
    <button className="myCart" onClick={showMenu}>
      My Cart ({count})
    </button>
  );
};

export default CartButton;
