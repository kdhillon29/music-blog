import { h, Fragment } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";


  import { ToastContainer, toast } from 'react-toastify';
  
  function Toastie({msg,category}: {msg: string,category?: string}){
    // const [type, setType] = useState<string>("success");
    const notify = () => toast(msg,{
        position: "bottom-right",
        type:  category as any || "success",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    useEffect(() => {
      notify()
    //   setType(category|| "success");
    },[])
    return (
        <ToastContainer aria-label={"toast"} />
    
    );
  }

  export default Toastie;