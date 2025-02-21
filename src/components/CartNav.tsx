import { h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";
// import ThemeToggle from "./ThemeToggle.tsx";
// import MobileNav from "./MobileNav.tsx";
import Cart from "../components/Cart.tsx";
import { $cart } from "../store/product.ts";
// import avatar from "../../public/image-avatar.png";
import UseMediaQuery from "../components/useMediaQuery.ts";

function CartNav() {
  const [open, setOpen] = useState(false);
  let isPageWide = UseMediaQuery("(max-width: 900px)");
  const cart = useStore($cart);
  const cartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // window.addEventListener('scroll', function() {
    //     let nav = document.querySelector('nav')
    //     nav?.classList.toggle('fixed', window.scrollY > 0)
    // });
    function handleClickOutside(e: MouseEvent) {
      const cartItem = cartRef.current as HTMLDivElement;
      console.log("cart is: ", cartItem);
      console.log("triggered", e.target);
      if (open && !cartItem?.contains(e.target as Node)) {
        setOpen(false);
      } else if (!open && cartItem?.contains(e.target as Node)) {
        setOpen(true);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [open]);
  return (
    
      <div class="flex flex-1 items-center space-x-10 sm:space-x-6 justify-end">
        {/* {!isPageWide && <ThemeToggle />} */}
        <div  ref={cartRef}>
          <div
           
            class="relative cursor-pointer text-gray-900 dark:text-white"
            onClick={() => (open ? setOpen(false) : setOpen(true))}
          >
            {cart.length > 0 && (
              <div class="absolute -top-1 right-1 px-2 rounded-full leading text-xs text-white bg-yellow-700">
                {cart.length}
              </div>
            )}
            <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                fill="currentColor"
                fill-rule="nonzero"
              />
            </svg>
          </div>
          {open && <Cart />}
        </div>
        {/* <div class="relative w-14 h-13 md:w-20 md:h-20 hover:ring-4 hover:ring-yellow-600 rounded-full overflow-hidden">
          <img
            class="w-full h-full object-cover"
            src={avatar.src}
            alt="avatar"
          />
        </div> */}
      </div>
    
  );
}

export default CartNav;
