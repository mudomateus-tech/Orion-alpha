"use client";

import OrionMap from "@/components/map/OrionMap";


interface MapProps {

  operacao:any;

  jogador:any;

}



export default function Map({

  operacao,

  jogador

}:MapProps){


  return (

    <OrionMap

      operacao={operacao}

      jogador={jogador}

    />

  );


}