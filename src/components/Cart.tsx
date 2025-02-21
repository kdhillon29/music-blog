import { h, Fragment } from 'preact';
import { useStore } from '@nanostores/preact';
import { $cart, deletProduct} from '../store/product.ts';

function Cart(){
  const cart = useStore($cart);

    return(     
            <div class="absolute z-10 w-96 h-auto animate-slide-in  mx-4 p-5  top-18 right-[-10%]  
            bg-gray-200 dark:bg-gray-700 hover:translate-x-[-10%]  transition-all duration-1000 ease-in-out
             rounded-2xl shadow-2xl">
                <h1 class="font-Kumbh mb-8 font-bold text-lg text-left text-gray-700 dark:text-white">Cart</h1> 
                {(()=>{
                  if(cart.length>0){
                   return(
                     <>
                        {cart.map( (item,i)=> (                    
                          <div class="flex items-center justify-evenly  w-full mb-6">
                                    <div class=" w-12 h-10  rounded-md shadow-md overflow-hidden">
                                        <img class="w-full h-full object-cover" src={item.thumbnail} alt="" />
                                    </div>
                                    <div class=' w-full pl-4 '>
                                        <h1 class="font-Kumbh w-2/3 text-base text-gray-700 dark:text-white whitespace-nowrap sm:overflow-hidden sm:overflow-ellipsis">{item.title}</h1>
                                        <div class="flex space-x-2">
                                          <h1 class="font-Kumbh text-base text-gray-700 dark:text-white ">{item.price} x {item.quantity}</h1>
                                          <h1 class="font-Kumbh font-bold text-base text-gray-700 dark:text-white text-left">{item.finalPrice}</h1>
                                        </div>
                                    </div>
                                    <div class="cursor-pointer text-gray-700 dark:text-white" 
                                    onClick = {() => deletProduct(cart,i)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                              </div>
                        ))}
                        <button class="flex w-full justify-center ml-auto py-5 px-16 font-Kumbh font-semibold rounded-xl bg-yellow-500 text-white shadow-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75">
                          Checkout
                        </button>
                    </> 
                    );
                }else{
                  return(
                    <div class="flex w-80 h-28 sm:h-48 sm:w-full justify-center items-center">
                        <h1 class="font-Kumbh font-semibold text-base text-gray-600 dark:text-white">your cart is empty</h1>
                    </div>
                    );
                }
                })()}           
          </div>
    );
}
export default Cart;