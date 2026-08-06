"use client";


interface GhostOverlayProps {

  jogadores: any[];

}



export default function GhostOverlay({

  jogadores

}: GhostOverlayProps){


  return (

    <div className="
      mt-6
      relative
      overflow-hidden
      rounded-2xl
      border
      border-cyan-400/40
      bg-black/80
      p-5
      shadow-[0_0_35px_rgba(0,220,255,0.35)]
    ">


      {/* linha holográfica */}

      <div className="
        absolute
        inset-x-0
        top-0
        h-px
        bg-cyan-400
        animate-pulse
      " />



      <div className="
        absolute
        inset-0
        pointer-events-none
        bg-gradient-to-b
        from-transparent
        via-cyan-400/5
        to-transparent
      " />




      <div className="
        relative
        z-10
      ">


        <h2 className="
          text-cyan-300
          font-bold
          tracking-[0.3em]
          text-sm
          mb-5
        ">

          ███ ORION GHOST SYSTEM ███

        </h2>



        <p className="
          text-xs
          text-cyan-500
          mb-4
          uppercase
        ">

          Acesso espectral autorizado

        </p>




        <div className="
          space-y-3
        ">


          {
            jogadores.map(

              (jogador:any)=>(


                <div

                  key={jogador.id}

                  className={`
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-4
                    py-3
                    backdrop-blur-md

                    ${
                      jogador.papel === "infiltrado"

                      ?

                      `
                      border-red-500/50
                      bg-red-500/10
                      shadow-[0_0_20px_rgba(255,0,0,0.25)]
                      `

                      :

                      `
                      border-cyan-400/40
                      bg-cyan-400/5
                      shadow-[0_0_20px_rgba(0,220,255,0.2)]
                      `

                    }

                  `}

                >


                  <div>


                    <p className="
                      text-white
                      font-bold
                    ">

                      {jogador.nome}

                    </p>


                    <p className="
                      text-xs
                      uppercase
                      tracking-widest
                    ">


                      {
                        jogador.papel === "infiltrado"

                        ?

                        <span className="
                          text-red-400
                        ">

                          INFILTRADO

                        </span>

                        :

                        <span className="
                          text-cyan-300
                        ">

                          AGENTE

                        </span>

                      }


                    </p>


                  </div>




                  <div className="
                    text-right
                  ">


                    <span className="
                      text-xs
                      text-purple-300
                      animate-pulse
                    ">

                      👻 ONLINE

                    </span>


                  </div>



                </div>


              )

            )

          }


        </div>


      </div>



    </div>

  );

}