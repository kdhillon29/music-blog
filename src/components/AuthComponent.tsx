import type { Session } from "@auth/core/types";
import { signal } from "@preact/signals";
import { Image } from "astro:assets";
// import {signIn, signOut} from "auth-astro/client"

const { signIn, signOut } = await import("auth-astro/client");

export default function AuthComponent({ session }: { session: Session | null }) {
  return (
    <div>
      {/* <h2>Sign</h2> */}
     { !session && <button class="bg-teal-900 cursor-pointer text-sm text-white p-2 px-3 rounded-3xl "
      onClick={() => signIn("github")}>Login</button>}
      {session && <button class="bg-teal-900/70 cursor-pointer text-xs text-white text-center
        p-2 rounded-full " onClick={() => signOut()}>
        <img src={session?.user?.image as string} class="object-cover align-middle" alt={session?.user?.name as string} width={24} height={24}  />
        <strong>Log Out</strong>
        </button>}
    </div>
  );  
}