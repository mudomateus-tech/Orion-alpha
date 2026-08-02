"use client";


interface GameHUDProps {

  jogador:any;

  operacao:any;

}




export default function GameHUD({

  jogador,

  operacao

}:GameHUDProps){



  if(!jogador){

    return null;

  }




  const morto =

    jogador.status === "morto" ||

    jogador.vivo === false;






  return (


    <div

      className={`
        rounded-2xl
        p-5
        mb-6
        border

        ${
          morto

          ?

          "bg-zinc-950 border-red-900"

          :

          "bg-zinc-900 border-zinc-800"

        }

      `}

    >





      {

        morto &&

        (

          <>

            <h2

              className="
              text-3xl
              font-black
              text-red-500
              "

            >

              ☠️ FORA DE OPERAÇÃO

            </h2>


            <p

              className="
              mt-3
              text-zinc-300
              "

            >

              Você foi eliminado e não pode mais interferir na partida.

            </p>



            <p

              className="
              mt-4
              text-zinc-400
              "

            >

              Continue observando a operação.

            </p>


          </>

        )

      }








      {

        !morto &&

        (

          <>

            <h2

              className="
              text-2xl
              font-bold
              "

            >

              🎮 Operação ORION

            </h2>



            <p

              className="
              mt-2
              text-zinc-300
              "

            >

              Status:

              {" "}

              {jogador.status || "ativo"}

            </p>





            <p

              className="
              mt-2
              text-zinc-300
              "

            >

              Jogadores:

              {" "}

              {operacao?.jogadores?.length || 0}

            </p>



          </>

        )

      }





    </div>


  );


}