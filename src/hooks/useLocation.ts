"use client";

import {
  useEffect,
  useState
} from "react";

import {
  obterLocalizacao,
  atualizarLocalizacaoJogador
} from "@/services/locationService";


export function useLocation(

  operacaoId?: string | null,

  jogadorId?: string | null

){


  const [
    localizacao,
    setLocalizacao
  ] = useState<any>(null);



  const [
    erro,
    setErro
  ] = useState("");





  useEffect(()=>{


    if(
      !operacaoId ||
      !jogadorId
    ){

      return;

    }


    const idOperacao: string = operacaoId;

    const idJogador: string = jogadorId;




    let ativo = true;





    async function atualizar(){


      try{


        const posicao =

          await obterLocalizacao();




        if(!ativo){

          return;

        }




        setLocalizacao(

          posicao

        );





        await atualizarLocalizacaoJogador(

          idOperacao,

          idJogador,

          posicao

        );




      }

      catch(error:any){


        setErro(

          error.message

        );


      }


    }






    atualizar();





    const intervalo =

      setInterval(

        atualizar,

        10000

      );






    return ()=>{


      ativo = false;


      clearInterval(

        intervalo

      );


    };





  },[

    operacaoId,

    jogadorId

  ]);






  return {


    localizacao,


    erro


  };


}