import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { calculatePrice } from "./price";

type Product = {
  title: string;
  id: string;
  thumbnail: string;
  price: string;
  quantity: number;
  finalPrice: string;
};

// const product = createStore(() => {
//     update(product, value => schema)
// })
// const cart = JSON.parse(localStorage.getItem("cart") || "[]");

// const $products = atom<Product[]>([]);

const $cart = persistentAtom<Product[]>("cart", [], {
  encode(origin) {
    return JSON.stringify(origin);
  },
  decode(encoded) {
    return JSON.parse(encoded);
  },
});

const addProduct = function addProduct(
  newProduct: Product,
  quantity: number = 1
) {
  //   update(product, (value) => newProduct);
  //   console.log("product is: ", $products.get());
  console.log("new product is: ", newProduct);
  const productExist = $cart
    .get()
    .findIndex((product) => product.id === newProduct.id);
  console.log(productExist);
  if (productExist !== -1) {
    const product = $cart.get();
    product[productExist].quantity += quantity;
    product[productExist].finalPrice = calculatePrice(
      product[productExist].quantity,
      product[productExist].price
    );

    $cart.set(product);
    return;
  }
  newProduct.quantity = quantity;
  newProduct.finalPrice = calculatePrice(quantity, newProduct.price);
  //   $cart.set([...$products.get(), newProduct]);
  $cart.set([...$cart.get(), newProduct]);
  //   update(shoppingCart, (card) => [...card, newProduct]);
};

const deletProduct = function deletProduct(cart: Product[], index: number) {
  const newCart = cart.filter((item, i) => i !== index);
  //   update(shoppingCart, (card) => newCart);
  $cart.set(newCart);
};

export { $cart, addProduct, deletProduct };
