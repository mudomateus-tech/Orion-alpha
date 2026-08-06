"use client";


interface VictoryHUDProps {

  vencedor:string | null;

}



export default function VictoryHUD({

  vencedor

}:VictoryHUDProps){



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



        <h1

          className="
          text-4xl
          mb-6
          "

        >

          🏆

        </h1>





        <h2

          className="
          text-2xl
          font-bold
          mb-4
          "

        >


          OPERAÇÃO FINALIZADA


        </h2>






        <p

          className="
          text-xl
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
          mt-6
          "

        >

          O sistema ORION encerrou a operação.

        </p>



      </div>



    </div>


  );


}