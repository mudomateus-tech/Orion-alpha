"use client";


export default function OrionHomeHUD(){


  return (

    <>

      <div

        className="
          absolute
          top-6
          left-6
          text-xs
          tracking-[0.4em]
          text-cyan-400
          opacity-80
        "

      >

        ORION SYSTEM ONLINE

      </div>





      <div

        className="
          absolute
          top-6
          right-6
          text-xs
          tracking-[0.4em]
          text-zinc-500
        "

      >

        ALPHA 0.1

      </div>






      <div

        className="
          absolute
          bottom-6
          left-6
          text-xs
          tracking-[0.3em]
          text-zinc-600
        "

      >

        ZERO STUDIOS // PROJECT ZERO

      </div>







      <div

        className="
          absolute
          inset-0
          pointer-events-none
          border
          border-cyan-400/10
          rounded-3xl
          m-4
        "

      />



    </>

  );

}