"use client";


interface RoleHUDProps {

  jogador:any;

  operacao:any;

}




export default function RoleHUD({

  jogador,

  operacao

}:RoleHUDProps){



  if(!jogador){

    return null;

  }




  const aliadosNomes =

    jogador.aliados?.map(

      (id:string)=>{


        const aliado =

          operacao?.jogadores?.find(

            (j:any)=>

              j.id === id

          );


        return aliado?.nome || "Aliado";

      }

    ) || [];






  return (

    <div

      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-5
      mb-6
      "

    >





      {

        jogador.papel === "comandante" &&

        (

          <>

            <h2 className="text-2xl font-bold">

              👑 Comandante

            </h2>


            <p className="mt-2 text-zinc-300">

              Coordene a operação e acompanhe os agentes.

            </p>


            <p className="mt-4">

              Agentes conectados:

              {" "}

              {operacao?.jogadores?.length || 0}

            </p>


          </>

        )

      }








      {

        jogador.papel === "agente" &&

        (

          <>

            <h2 className="text-2xl font-bold">

              🛰️ Agente

            </h2>


            <p className="mt-2 text-zinc-300">

              Complete as missões e descubra os infiltrados.

            </p>


          </>

        )

      }









      {

        jogador.papel === "infiltrado" &&

        (

          <>

            <h2

              className="
              text-2xl
              font-bold
              text-red-500
              "

            >

              🕵️ Infiltrado

            </h2>



            <p className="mt-2 text-zinc-300">

              Sabote a operação sem ser descoberto.

            </p>





            <div className="mt-4">


              <p className="font-bold">

                Aliados infiltrados:

              </p>




              {

                aliadosNomes.length > 0 &&


                aliadosNomes.map(

                  (nome:string)=>(


                    <p

                      key={nome}

                      className="text-red-400"

                    >

                      🔴 {nome}

                    </p>


                  )

                )

              }



            </div>


          </>

        )

      }









      {

        jogador.papel === "hacker" &&

        (

          <>

            <h2

              className="
              text-2xl
              font-bold
              text-purple-400
              "

            >

              💻 Hacker

            </h2>


            <p className="mt-2 text-zinc-300">

              Controle sistemas e execute ações especiais.

            </p>


          </>

        )

      }





    </div>

  );


}