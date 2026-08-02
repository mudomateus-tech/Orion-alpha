"use client";

import {
  useEffect,
  useState
} from "react";

import {
  calcularDistancia
} from "@/services/distanceService";



export function useDistance(

  jogador:any,

  missoes:any[]

){



  const [

    missoesProximas,

    setMissoesProximas

  ] = useState<any[]>([]);







  useEffect(()=>{



    if(

      !jogador?.localizacao ||

      !missoes

    ){

      return;

    }






    const proximas =

      missoes.filter(

        (missao:any)=>{



          const distancia =

            calcularDistancia(


              jogador.localizacao.latitude,


              jogador.localizacao.longitude,


              missao.localizacao.latitude,


              missao.localizacao.longitude


            );





          return (

            distancia <= 5

          );


        }

      );







    setMissoesProximas(

      proximas

    );





  },[

    jogador,

    missoes

  ]);







  return {

    missoesProximas

  };


}