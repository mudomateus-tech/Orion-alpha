"use client";

import {
  useSearchParams
} from "next/navigation";

import {
  Suspense
} from "react";

import {
  useAgentProfile
} from "@/hooks/useAgentProfile";

import AgentProfile from "@/components/profile/AgentProfile";



function PerfilContent(){


  const params = useSearchParams();


  const jogadorId =

    params.get("jogador");




  const perfil =

    useAgentProfile(

      jogadorId

    );





  return (

    <main

      className="
      min-h-screen
      bg-black
      text-white
      p-6
      flex
      items-center
      justify-center
      "

    >


      <div

        className="
        w-full
        max-w-md
        "

      >



        <AgentProfile

          perfil={perfil}

        />



      </div>



    </main>

  );


}







export default function Perfil(){


  return (

    <Suspense

      fallback={

        <main

          className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
          "

        >

          Carregando perfil...

        </main>

      }


    >

      <PerfilContent/>

    </Suspense>


  );


}