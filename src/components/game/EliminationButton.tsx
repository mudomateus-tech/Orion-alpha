"use client";

import {
  useState
} from "react";

import Button from "@/components/ui/Button";

import {
  eliminarJogador
} from "@/services/eliminationService";




export default function EliminationButton({

  operacaoId,

  jogadorId,

  jogadores

}:any){



  const [

    mensagem,

    setMensagem

  ] = useState("");






  async function eliminar(

    alvoId:string

  ){


    try{


      await eliminarJogador(

        operacaoId,

        jogadorId,

        alvoId

      );


      setMensagem(

        "💀 Jogador eliminado."

      );


    }


    catch(error:any){


      setMensagem(

        error.message

      );


    }


  }






  return (


    <div

      className="
      bg-zinc-900
      rounded-2xl
      p-5
      mt-6
      "

    >



      <h2

        className="
        text-xl
        font-black
        mb-4
        text-red-500
        "

      >

        💀 ELIMINAR AGENTE

      </h2>





      <div

        className="
        flex
        flex-col
        gap-3
        "

      >




      {

        jogadores

        ?.filter(

          (j:any)=>


            j.id !== jogadorId &&


            j.status !== "morto" &&


            j.papel !== "infiltrado" &&


            j.papel !== "hacker"


        )

        .map(

          (j:any)=>(


            <Button

              key={j.id}

              variant="danger"

              onClick={()=>eliminar(j.id)}

            >

              💀 {j.nome}

            </Button>


          )


        )


      }




      {

        jogadores?.filter(

          (j:any)=>

            j.papel !== "infiltrado" &&

            j.papel !== "hacker" &&

            j.status !== "morto"

        ).length === 0 &&


        <p className="text-zinc-400">

          Nenhum agente disponível.

        </p>

      }



      </div>







      {

        mensagem &&


        <p

          className="
          text-yellow-400
          mt-4
          text-center
          "

        >

          {mensagem}

        </p>


      }





    </div>


  );


}