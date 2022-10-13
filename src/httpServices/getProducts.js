import http from "./httpServices";

const getProducts = () => {
  return http.get("/product");
};
export default getProducts;
