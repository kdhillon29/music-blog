import { h, Fragment } from 'preact';
import { addProduct } from '../store/product';
import CallToAction from './CallToAction';

interface Props {
  product: any;
}
function Card({product}: Props){
  console.log("product is: ", product);
    return(
      <div class="w-full  m-2 flex">
        <button class=" w-60 h-60 mb-10 md:mr-10  bg-black rounded-2xl overflow-hidden transition duration-500 ease-in-out hover:scale-110" onClick={()=> window.location.href = product.url}>
          <img class="w-full h-full object-cover" src={product.frontmatter.img[0]} alt={product.frontmatter.title}/>
        </button>
        <div class=" w-2/3 py-3 flex flex-col gap-3  items-center ">

          <p class="text-xl font-semibold">{product.frontmatter.title}</p>
          <p class="font-semibold">{product.frontmatter.price}</p>
          <p class="text-gray-500 text-sm line-clamp-1">{product.frontmatter.description}</p>
          {/* <button class="bg-violet-500/80 text-white px-2 py-1 rounded-full" onClick={()=> addProduct(product)}>Add To cart</button> */}
          <CallToAction data={ {title: product.frontmatter.title , id: product.frontmatter.id , thumbnails: product.frontmatter.thumbnails , price: product.frontmatter.price}} />
           
        </div>
      </div>
    );
}
export default Card;