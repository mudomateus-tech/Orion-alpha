"use client";

import {
  useEffect,
  useState
} from "react";


import {
  verificarProximidadeMissao,
  concluirMissao
} from "@/services/missionEngineService";


import {
  calcularDistanciaGPS
} from "@/utils/geo";




interface Props {

  operacaoId:string;

  jogador:any;

  missoes:any[];

}







export default function MissionHUD({

  operacaoId,

  jogador,

  missoes

}:Props){



  const [missaoAtual,setMissaoAtual] =

    useState<any>(null);



  const [distancia,setDistancia] =

    useState(0);



  const [disponivel,setDisponivel] =

    useState(false);



  const [mensagem,setMensagem] =

    useState("");







  useEffect(()=>{


    encontrarMissao();


  },[

    jogador,

    missoes

  ]);








  async function encontrarMissao(){


    if(

      !jogador?.localizacao ||

      !missoes?.length

    ){

      return;

    }



    let menor:any = null;

    let menorDistancia = Infinity;



    for(const missao of missoes){


      if(

        missao.status === "concluida"

      ){

        continue;

      }



      const d =

        calcularDistanciaGPS(

          jogador.localizacao,

          missao.localizacao

        );



      if(

        d < menorDistancia

      ){

        menorDistancia = d;

        menor = missao;

      }


    }





    setMissaoAtual(menor);


    setDistancia(

      Math.round(

        menorDistancia

      )

    );



    if(menor){


      const perto =

        await verificarProximidadeMissao(

          jogador,

          menor

        );


      setDisponivel(perto);


    }


  }







  async function executar(){


    if(

      !missaoAtual

    ){

      return;

    }



    try{


      await concluirMissao(

        operacaoId,

        missaoAtual.id

      );



      setMensagem(

        "✅ Missão concluída!"

      );


    }

    catch(error:any){


      setMensagem(

        error.message

      );


    }


  }







  if(!missaoAtual){


    return null;


  }







  return (

    <div className="
      bg-black/80
      border
      border-green-500/40
      rounded-2xl
      p-5
      text-white
      mt-5
    ">


      <h2 className="
        text-green-400
        font-bold
        text-xl
      ">

        📡 MISSÃO DETECTADA

      </h2>





      <p className="mt-3">

        {missaoAtual.titulo}

      </p>



      <p className="text-zinc-400">

        {missaoAtual.descricao}

      </p>





      <p className="mt-3">

        Distância:

        {" "}

        {distancia} metros

      </p>







      <button

        disabled={!disponivel}

        onClick={executar}

        className="
        mt-4
        w-full
        rounded-xl
        p-3
        bg-green-600
        disabled:bg-zinc-700
        "

      >

        {

          disponivel

          ?

          "🚀 EXECUTAR MISSÃO"

          :

          "APROXIME-SE DO LOCAL"

        }


      </button>






      {

        mensagem &&

        <p className="
          text-green-400
          mt-3
          text-center
        ">

          {mensagem}

        </p>

      }



    </div>

  );

}