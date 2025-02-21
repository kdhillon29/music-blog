import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

interface Counter {
  id: string;
  quantity: number;
}
const $counter = persistentAtom<Counter[]>(
  "counter",
  [
    { id: "1", quantity: 1 },
    { id: "2", quantity: 1 },
  ],
  {
    encode(origin) {
      return JSON.stringify(origin);
    },
    decode(encoded) {
      return JSON.parse(encoded);
    },
  }
);

function increaseCounter(id: string) {
  $counter.set(
    $counter.get().map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    })
  );
}

function decreaseCounter(id: string) {
  $counter.set(
    $counter.get().map((item) => {
      if (item.id === id && item.quantity <= 1) return item;
      return item.id === id ? { ...item, quantity: item.quantity - 1 } : item;
    })
  );
}

export { $counter, increaseCounter, decreaseCounter };
