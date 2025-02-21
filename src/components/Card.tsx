import { h, Fragment } from 'preact';
import { addProduct } from '../store/product';
import CallToAction from './CallToAction';

interface Props {
  product: any;
}
function Card({product}: Props){
  console.log("product is: ", product);
    return(
      <div class="w-full flex max-sm:flex-col   justify-between items-center gap-2 ">
        <button class=" w-full md:w-1/2 h-auto  bg-black rounded-2xl overflow-hidden transition duration-500 ease-in-out hover:scale-110" onClick={()=> window.location.href = product.url}>
          <img class=" w-full md:h-64   bg-neutral-300  bg-blend-normal  object-cover" src={product.frontmatter.img[0]} alt={product.frontmatter.title}/>
        </button>
        <div class=" w-full md:w-1/2 py-3 flex flex-col gap-1  items-center ">

          <p class="text-md md:text-xl font-semibold">{product.frontmatter.title}</p>
          <p class=" text-md md:text-base font-semibold">{product.frontmatter.price}</p>
          <p class="text-gray-500 w-2/3 md:w-full text-center text-sm md:text-md line-clamp-2">{product.frontmatter.description}</p>
          {/* <button class="bg-violet-500/80 text-white px-2 py-1 rounded-full" onClick={()=> addProduct(product)}>Add To cart</button> */}
          <CallToAction data={ {title: product.frontmatter.title , id: product.frontmatter.id , thumbnails: product.frontmatter.thumbnails , price: product.frontmatter.price}} />
           
        </div>
      </div>
    );
}
export default Card;