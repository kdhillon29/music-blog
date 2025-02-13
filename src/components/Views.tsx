import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";





export default function ViewComponent({ slug }: { slug: string }) {
      const views = signal(1);
      const fetchViews = (async (slug: string) => {
       const response = await fetch("/api/views?" + new URLSearchParams({ slug }));
       return await response.json();
      });
      useEffect(() => {
        console.log("useEffect");
         async function loadViews() {
        const item= await fetchViews(slug);
        views.value = item.count;
    }
    
         loadViews();
      }, [])
      
    
    return <p class="text-teal-900/80 p-3  text-xs md:text-sm font-semibold">Total Views: {views}</p>;
  }