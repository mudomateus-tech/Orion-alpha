"use client";


interface VictoryBannerProps {

  vencedor:string | null;

}



export default function VictoryBanner({

  vencedor

}:VictoryBannerProps){



  const agentesVenceram =

    vencedor === "agentes";



  return (

    <div

      className="
      fixed
      inset-0
      z-50
      bg-black/90
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
        bg-zinc-900
        border
        border-zinc-700
        rounded-2xl
        p-8
        text-center
        "

      >



        <div

          className="
          text-5xl
          mb-6
          "

        >

          🏆

        </div>




        <h1

          className="
          text-2xl
          font-bold
          mb-4
          "

        >

          OPERAÇÃO FINALIZADA

        </h1>





        <p

          className="
          text-xl
          font-semibold
          "

        >

          {

            agentesVenceram

            ?

            "🟦 AGENTES VENCERAM"

            :

            "🔴 INFILTRADOS VENCERAM"

          }


        </p>





        <p

          className="
          text-zinc-400
          mt-5
          "

        >

          O sistema ORION encerrou a operação.

        </p>




      </div>



    </div>

  );


}