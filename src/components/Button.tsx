import { signal } from "@preact/signals";
export default function Button({ title }: { title: string }) {
  const count = signal(0);

  return (
    <div>
      
      <span>Total Bookings: {count && <strong class="text-green-500 pl-12">{count}</strong>}<br/></span>
      <button
      onClick={() => { count.value+=1; alert(`thanks for booking!`)}}
        type="button"
        id="contact-btn"
        class="bg-teal-900 text-white p-2 rounded-3xl border-2 border-teal-900"
      >
      {title} 
    </button>
  </div>
  );
}