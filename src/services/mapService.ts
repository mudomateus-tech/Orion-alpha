import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



function calcularDistancia(

  lat1:number,

  lon1:number,

  lat2:number,

  lon2:number

){


  const R = 6371000;


  const dLat =

    (lat2 - lat1) *

    Math.PI /

    180;


  const dLon =

    (lon2 - lon1) *

    Math.PI /

    180;



  const a =

    Math.sin(dLat / 2) *

    Math.sin(dLat / 2) +

    Math.cos(

      lat1 *

      Math.PI /

      180

    ) *

    Math.cos(

      lat2 *

      Math.PI /

      180

    ) *

    Math.sin(dLon / 2) *

    Math.sin(dLon / 2);



  const c =

    2 *

    Math.atan2(

      Math.sqrt(a),

      Math.sqrt(1 - a)

    );



  return R * c;

}







export function jogadorDentroDoRaio(

  jogador:any,

  missao:any

){


  if(

    !jogador?.localizacao ||

    !missao?.localizacao

  ){

    return false;

  }



  const distancia =

    calcularDistancia(

      jogador.localizacao.latitude,

      jogador.localizacao.longitude,

      missao.localizacao.latitude,

      missao.localizacao.longitude

    );



  return distancia <= missao.raio;

}








export async function buscarMapaOperacao(

  operacaoId:string

){


  const referencia = doc(

    db,

    "operacoes",

    operacaoId

  );


  const snapshot = await getDoc(

    referencia

  );


  if(!snapshot.exists()){

    throw new Error(

      "Operação não encontrada."

    );

  }



  const dados:any = snapshot.data();



  return {

    jogadores:

      dados.jogadores || [],


    missoes:

      dados.missoes || []

  };


}