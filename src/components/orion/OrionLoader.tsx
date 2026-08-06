"use client";

import {
  useEffect,
  useState
} from "react";


interface OrionLoaderProps {

  onComplete?:()=>void;

}



export default function OrionLoader({

  onComplete

}:OrionLoaderProps){


  const [

    progresso,

    setProgresso

  ] = useState(0);



  useEffect(()=>{


    const intervalo = setInterval(()=>{


      setProgresso(valor=>{


        const novo = valor + 5;


        if(novo >= 100){


          clearInterval(intervalo);


          setTimeout(()=>{


            onComplete?.();


          },800);



          return 100;

        }


        return novo;


      });


    },120);



    return ()=>clearInterval(intervalo);



  },[onComplete]);







  return (


    <main

      className="

        min-h-screen

        bg-black

        text-cyan-300

        flex

        items-center

        justify-center

        p-6

      "

    >



      <div

        className="

          w-full

          max-w-md

          border

          border-cyan-400/40

          rounded-2xl

          bg-black/70

          backdrop-blur-xl

          p-8

          shadow-[0_0_40px_rgba(0,220,255,0.25)]

          text-center

        "

      >



        <h1

          className="

            text-4xl

            font-black

            tracking-[0.5em]

            mb-8

          "

        >

          ORION

        </h1>




        <div

          className="

            text-sm

            tracking-widest

            space-y-3

            mb-10

          "

        >

          <p>

            PROTOCOLO Nº 01

          </p>


          <p>

            NÃO CONFIE EM NINGUÉM.

          </p>


          <p>

            AINDA MAIS NO SENNA.

          </p>


        </div>





        <div

          className="

            text-xs

            mb-3

            tracking-widest

          "

        >

          INICIALIZANDO SISTEMA...

        </div>




        <div

          className="

            h-3

            bg-cyan-950

            rounded-full

            overflow-hidden

            border

            border-cyan-400/30

          "

        >


          <div

            className="

              h-full

              bg-cyan-400

              transition-all

              duration-300

              shadow-[0_0_15px_#00ffff]

            "

            style={{

              width:`${progresso}%`

            }}

          />


        </div>





        <p

          className="

            mt-4

            text-xs

            tracking-widest

          "

        >

          {progresso}%

        </p>



      </div>



    </main>


  );

}