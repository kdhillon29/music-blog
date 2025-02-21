import { atom } from "nanostores";

const $price = atom("$0.00");

function calculatePrice(count: number, money: string) {
  console.log("incalculatePrice");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const totalPrice = count * Number(money.replace(/[^0-9\.]+/g, ""));
  // update(price, value => formatter.format(totalPrice));
  $price.set(formatter.format(totalPrice));
  //   return totalPrice;
  return formatter.format(totalPrice);
}

export { $price, calculatePrice };
