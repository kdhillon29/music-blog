import { h, Fragment } from 'preact';
import { useState, useEffect,} from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { $counter, increaseCounter, decreaseCounter } from '../store/counter.ts';
import { $price ,calculatePrice} from '../store/price.ts';
import { addProduct} from '../store/product.ts';

export type props = {
    data: {
        title: string;
        id: string;
        thumbnails: string[];
        price: string;
        
    };
};

function CallToAction({data}:props){
    console.log('data is: ', data)
    const count = useStore($counter);
     const productCount= count.filter((item)=> item.id == data.id)[0].quantity
     console.log('productCount is: ', productCount)
    const finalPrice = useStore($price)
    console.log('finalPrice is: ', finalPrice)
    const product = { title: data.title , id: data.id , thumbnail: data.thumbnails[0] , price: data.price , quantity:productCount , finalPrice:finalPrice};    

return(
        <div class="flex items-center md:space-x-4 w-2/3 sm:w-full sm:flex-col sm:space-y-4" onChange={()=>calculatePrice(productCount,data.price)}>
           <div class="flex bg-gray-200 dark:bg-gray-800 w-60 sm:w-full justify-between px-3  py-5  rounded-xl ">
                <button class="text-yellow-500" aria-label="Decrease" onClick={()=>decreaseCounter(product.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"/>
                    </svg>
                </button>
                <h1 class="text-xl sm:text-lg font-Kumbh font-bold text-gray-900 dark:text-white">{productCount}</h1>
                <button class="text-yellow-500" aria-label="Increase" onClick={()=>increaseCounter(product.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                    </svg>
                </button>
           </div>
            <button class=" flex w-full justify-center ml-auto py-5 sm:mb-10  font-Kumbh font-semibold  rounded-xl bg-yellow-500 text-white shadow-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75" 
            onClick={() => {if( productCount > 0) addProduct(product,productCount)}}>
                <svg class="mr-4" width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="currentColor" fill-rule="nonzero"/></svg>
                add to cart!
            </button>
        </div>
    );
}

export default CallToAction;