const addProductToCart = (state, payload) => {
  // state.cart ? => item.qty ++ : push to cart
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex((item) => item._id === payload._id);
  if (index < 0) {
    updatedCart.push({ ...payload, quantity: 1 });
  } else {
    const updatedItem = { ...updatedCart[index] };
    updatedItem.quantity++;
    updatedCart[index] = updatedItem;
  }
  return {
    ...state,
    cart: updatedCart,
    total: state.total + payload.offPrice,
  };
};

const removeProductFromCart = (state, payload) => {
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex((item) => item._id === payload._id);
  const updatedItem = { ...updatedCart[index] };
  if (updatedItem.quantity === 1) {
    const filteredCart = updatedCart.filter((item) => item._id !== payload._id);
    return {
      ...state,
      cart: filteredCart,
      total: state.total - payload.offPrice,
    };
  } else {
    updatedItem.quantity--;
    updatedCart[index] = updatedItem;
    return {
      ...state,
      cart: updatedCart,
      total: state.total - payload.offPrice,
    };
  }
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return addProductToCart(state, action.payload);

    case "REMOVE_PRODUCT":
      return removeProductFromCart(state, action.payload);
    default:
      return state;
  }
};

export default cartReducer;
