import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";


export interface LocalMissao {

  latitude:number;

  longitude:number;

}



export async function salvarLocalMissao(

  operacaoId:string,

  missaoId:string,

  localizacao:LocalMissao

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
      "Operação não encontrada"
    );

  }



  const dados:any = snapshot.data();



  const missoes =

    dados.missoes || [];



  const atualizadas =

    missoes.map(

      (missao:any)=>{


        if(

          missao.id === missaoId

        ){

          return {

            ...missao,

            localizacao

          };

        }


        return missao;


      }

    );



  await updateDoc(

    referencia,

    {

      missoes:atualizadas

    }

  );


}





export async function validarMissoesConfiguradas(

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

    return false;

  }



  const dados:any = snapshot.data();



  return dados.missoes?.every(

    (missao:any)=>

      missao.localizacao

  );

}