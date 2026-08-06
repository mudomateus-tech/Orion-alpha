import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  calcularDistanciaGPS
} from "@/utils/geo";



export async function verificarProximidadeMissao(

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

    calcularDistanciaGPS(

      jogador.localizacao,

      missao.localizacao

    );



  return distancia <= (missao.raio ?? 5);

}







export async function concluirMissao(

  operacaoId:string,

  missaoId:string

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



  const missoes =

    (dados.missoes || [])

    .map(

      (missao:any)=>{


        if(

          missao.id === missaoId

        ){

          return {

            ...missao,

            status:"concluida",

            progresso:100,

            concluidaEm:Date.now()

          };

        }



        return missao;

      }

    );





  await updateDoc(

    referencia,

    {

      missoes

    }

  );



  return missoes;

}








export async function buscarMissaoPorId(

  operacaoId:string,

  missaoId:string

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

    return null;

  }



  const dados:any = snapshot.data();



  return (

    dados.missoes || []

  )

  .find(

    (m:any)=>

      m.id === missaoId

  );

}