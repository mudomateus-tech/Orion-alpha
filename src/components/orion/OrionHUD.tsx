"use client";


interface OrionHUDProps {

  jogador:any;

  operacao:any;

}



export default function OrionHUD({

  jogador,

  operacao

}:OrionHUDProps){



  if(!jogador){

    return null;

  }



  return (


    <section

      className="

        relative

        overflow-hidden

        rounded-2xl

        border

        border-cyan-400/40

        bg-black/70

        backdrop-blur-xl

        p-4

        mb-5

        shadow-[0_0_30px_rgba(0,220,255,0.25)]

      "

    >



      <div

        className="

          absolute

          inset-0

          bg-gradient-to-br

          from-cyan-400/10

          via-transparent

          to-blue-500/10

        "

      />





      <div className="relative">



        <h2

          className="

            text-cyan-300

            text-sm

            font-black

            tracking-[0.3em]

            mb-4

          "

        >

          ORION // HUD

        </h2>





        <div

          className="

            space-y-2

            text-xs

            tracking-widest

          "

        >



          <p>

            OPERADOR:

            {" "}

            <span className="text-white">

              {jogador.nome}

            </span>

          </p>





          <p>

            STATUS:

            {" "}

            <span

              className={

                jogador.status === "morto"

                ?

                "text-red-400"

                :

                "text-green-400"

              }

            >

              {jogador.status?.toUpperCase()}

            </span>

          </p>





          <p>

            FUNÇÃO:

            {" "}

            <span className="text-cyan-300">

              {jogador.papel?.toUpperCase()}

            </span>

          </p>





          <p>

            REDE:

            {" "}

            <span className="text-cyan-300">

              ONLINE

            </span>

          </p>




          <p>

            OPERAÇÃO:

            {" "}

            <span className="text-white">

              {operacao?.codigo || "----"}

            </span>

          </p>



        </div>



      </div>



    </section>


  );

}