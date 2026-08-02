"use client";

import Link from "next/link";

import Header from "@/components/Header";

import Button from "@/components/Button";

import Card from "@/components/Card";



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
      "

    >



      <Header

        titulo="ORION"

        subtitulo="Operação Alpha • Sistema de Infiltração"

      />






      <Card

        className="
          w-full
          max-w-md
          text-center
        "

      >



        <h2

          className="
            text-3xl
            font-bold
            mb-3
          "

        >

          PROJETO ZERO

        </h2>



        <p

          className="
            text-zinc-400
            mb-8
          "

        >

          Entre em uma operação,
          descubra seu papel e complete
          suas missões.

        </p>






        <div

          className="
            flex
            flex-col
            gap-4
          "

        >



          <Link

            href="/criar"

          >

            <Button

              className="
                w-full
              "

            >

              CRIAR OPERAÇÃO

            </Button>


          </Link>








          <Link

            href="/entrar"

          >

            <Button

              variant="secondary"

              className="
                w-full
              "

            >

              ENTRAR EM OPERAÇÃO

            </Button>


          </Link>



        </div>




      </Card>





      <p

        className="
          mt-8
          text-zinc-600
          text-sm
        "

      >

        ORION Alpha 0.1 • Zero Studios

      </p>




    </main>


  );


}