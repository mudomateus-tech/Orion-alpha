"use client";


interface OperationResultProps {

  resultado:any;

}



export default function OperationResult({

  resultado

}:OperationResultProps){



  if(!resultado){

    return null;

  }





  const agentesVenceram =

    resultado.vencedor === "agentes";





  return (

    <div

      className="
      fixed
      inset-0
      z-40
      bg-black/95
      flex
      items-center
      justify-center
      p-6
      overflow-y-auto
      "

    >



      <div

        className="
        w-full
        max-w-lg
        bg-zinc-900
        border
        border-zinc-700
        rounded-2xl
        p-6
        "

      >



        <h1

          className="
          text-3xl
          text-center
          font-bold
          mb-6
          "

        >

          📡 ORION REPORT

        </h1>





        <div

          className="
          text-center
          mb-8
          "

        >


          <p className="text-zinc-400">

            VENCEDOR

          </p>



          <h2 className="text-2xl font-bold">

            {

              agentesVenceram

              ?

              "🟦 AGENTES"

              :

              "🔴 INFILTRADOS"

            }


          </h2>


        </div>






        <div className="mb-6">


          <h3 className="font-bold mb-3">

            👥 JOGADORES

          </h3>




          {

            resultado.jogadores?.map(

              (j:any)=>(

                <div

                  key={j.id}

                  className="
                  bg-zinc-800
                  rounded-xl
                  p-3
                  mb-2
                  flex
                  justify-between
                  "

                >

                  <span>

                    {j.nome}

                  </span>



                  <span>

                    {

                      j.status === "morto"

                      ?

                      "💀"

                      :

                      "🟢"

                    }


                  </span>


                </div>

              )

            )


          }


        </div>







        <div className="mb-6">


          <h3 className="font-bold mb-3">

            🎯 MISSÕES

          </h3>



          <p>

            {

              resultado.missoes?.length || 0

            }

            {" "}

            missões registradas

          </p>


        </div>







        <div>


          <h3 className="font-bold mb-3">

            📜 EVENTOS

          </h3>



          <p>

            {

              resultado.eventos?.length || 0

            }

            {" "}

            eventos registrados

          </p>


        </div>




      </div>



    </div>


  );


}