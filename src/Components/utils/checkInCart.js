export const checkInCart = (cart, productId) => {
  return cart.find((c) => c._id === productId);
};
