"use client";

import type { Jogador } from "@/types/player";



interface PlayerCardProps {

  jogador: Jogador;

  mostrarPapel?: boolean;

}



export default function PlayerCard({

  jogador,

  mostrarPapel = false

}: PlayerCardProps){



  return (

    <div

      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-xl
        p-4
        flex
        items-center
        justify-between
      "

    >



      <div>


        <h3

          className="
            text-white
            font-bold
          "

        >

          {jogador.nome}

        </h3>



        <p

          className="
            text-sm
            text-zinc-400
          "

        >

          {

            jogador.conectado

            ?

            "Online"

            :

            "Offline"

          }

        </p>


      </div>





      {

        mostrarPapel &&


        (

          <span

            className="
              px-3
              py-1
              rounded-lg
              bg-blue-600
              text-white
              text-sm
              font-bold
            "

          >

            {jogador.papel}

          </span>


        )

      }



    </div>

  );


}