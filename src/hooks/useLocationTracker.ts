"use client";

import { useEffect } from "react";

import { atualizarLocalizacao } from "@/services/locationService";


export function useLocationTracker(

  operacaoId:string | null,

  jogadorId:string | null

){


  useEffect(()=>{


    if(!operacaoId || !jogadorId){

      return;

    }



    if(!navigator.geolocation){

      console.log("GPS não disponível");

      return;

    }





    let direcaoAtual = 0;





    function atualizarDirecao(event:any){


      if(event.alpha !== null){

        direcaoAtual = event.alpha;


      }


    }





    window.addEventListener(

      "deviceorientation",

      atualizarDirecao

    );







    async function atualizar(

      position:GeolocationPosition

    ){


      try{


        await atualizarLocalizacao(

          operacaoId,

          jogadorId,

          position.coords.latitude,

          position.coords.longitude,

          direcaoAtual

        );



        console.log(

          "GPS atualizado:",

          position.coords.latitude,

          position.coords.longitude,

          "Direção:",

          direcaoAtual

        );


      }


      catch(error){


        console.log(

          "Erro ao atualizar GPS:",

          error

        );


      }


    }







    function erro(

      error:GeolocationPositionError

    ){


      console.log(

        "Erro GPS:",

        error

      );


    }








    navigator.geolocation.getCurrentPosition(

      atualizar,

      erro,

      {

        enableHighAccuracy:true,

        timeout:15000,

        maximumAge:0

      }

    );









    const watchId =

      navigator.geolocation.watchPosition(

        atualizar,

        erro,

        {

          enableHighAccuracy:true,

          timeout:15000,

          maximumAge:0

        }

      );








    return ()=>{


      navigator.geolocation.clearWatch(

        watchId

      );


      window.removeEventListener(

        "deviceorientation",

        atualizarDirecao

      );


    };





  },[

    operacaoId,

    jogadorId

  ]);

}