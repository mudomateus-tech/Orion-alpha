"use client";

import Link from "next/link";

import OrionHomeHUD from "@/components/orion/OrionHomeHUD";
import OrionTitle from "@/components/orion/OrionTitle";
import OrionPanel from "@/components/orion/OrionPanel";
import OrionButton from "@/components/orion/OrionButton";
import OrionRadar from "@/components/orion/OrionRadar";



export default function Home(){


  return (

    <main

      className="
        min-h-screen
        bg-black
        text-white
        flex
        flex-col
        items-center
        justify-center
        p-6
        overflow-hidden
        relative
      "

    >



      <OrionHomeHUD />



      <div

        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          opacity-30
        "

      >

        <OrionRadar />

      </div>







      <div

        className="
          relative
          z-10
          w-full
          max-w-md
        "

      >



        <OrionTitle />







        <OrionPanel>


          <h2

            className="
              text-3xl
              font-bold
              text-center
              mb-4
            "

          >

            PROJETO ZERO

          </h2>





          <p

            className="
              text-zinc-400
              text-center
              mb-8
            "

          >

            Sistema de operações táticas.
            Entre em uma missão,
            descubra seu papel
            e sobreviva.

          </p>







          <div

            className="
              flex
              flex-col
              gap-4
            "

          >




            <Link href="/criar">

              <OrionButton>

                CRIAR OPERAÇÃO

              </OrionButton>

            </Link>







            <Link href="/entrar">

              <OrionButton secondary>

                ENTRAR EM OPERAÇÃO

              </OrionButton>

            </Link>







            <Link href="/perfil">

              <OrionButton secondary>

                PERFIL DO AGENTE

              </OrionButton>

            </Link>




          </div>




        </OrionPanel>







        <p

          className="
            mt-8
            text-center
            text-zinc-600
            text-xs
          "

        >

          ORION Alpha 0.1 • Zero Studios

        </p>





      </div>





    </main>

  );

}