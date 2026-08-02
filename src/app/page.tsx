"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/ui/Header";

import Card from "@/components/ui/Card";

import Button from "@/components/ui/Button";



export default function Home(){


  const router = useRouter();



  return (

    <main

      className="
      min-h-screen
      bg-black
      text-white
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
        "

      >


        <Header

          titulo="ORION"

          subtitulo="Sistema de operações"

        />




        <Card

          title="CENTRAL DE COMANDO"

        >


          <div

            className="
            flex
            flex-col
            gap-4
            "

          >


            <Button

              className="
              w-full
              "

              onClick={()=>


                router.push(

                  "/criar"

                )

              }

            >

              CRIAR OPERAÇÃO


            </Button>





            <Button

              className="
              w-full
              "

              onClick={()=>


                router.push(

                  "/entrar"

                )

              }

            >

              ENTRAR EM OPERAÇÃO


            </Button>



          </div>


        </Card>



      </div>


    </main>

  );

}