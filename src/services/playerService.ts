import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



export async function buscarJogador(

  operacaoId:string,

  jogadorId:string

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



  const jogador =

    dados.jogadores?.find(

      (j:any)=>

        j.id === jogadorId

    );



  return jogador || null;

}





export async function atualizarJogador(

  operacaoId:string,

  jogadorId:string,

  dadosAtualizados:any

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



  const jogadores =

    dados.jogadores || [];



  const jogadoresAtualizados =

    jogadores.map(

      (j:any)=>{


        if(j.id === jogadorId){

          return {

            ...j,

            ...dadosAtualizados

          };

        }


        return j;

      }

    );



  await updateDoc(

    referencia,

    {

      jogadores:

        jogadoresAtualizados

    }

  );


  return true;

}