"use client";

import { useEffect } from "react";

import {
  atualizarLocalizacao
} from "@/services/locationService";


export function useLocationTracker(

  operacaoId:string | null,

  jogadorId:string | null

){


  useEffect(()=>{


    if(!operacaoId || !jogadorId){

      return;

    }


    navigator.geolocation.getCurrentPosition(

      async(position)=>{


        console.log(
          "PEGOU GPS",
          position.coords.latitude,
          position.coords.longitude
        );


        await atualizarLocalizacao(

          operacaoId,

          jogadorId,

          position.coords.latitude,

          position.coords.longitude

        );


        console.log(
          "SALVOU GPS"
        );


      },


      (erro)=>{


        console.log(
          "ERRO GPS",
          erro.message
        );


      },


      {

        enableHighAccuracy:true,

        timeout:20000,

        maximumAge:0

      }

    );



  },[

    operacaoId,

    jogadorId

  ]);

}