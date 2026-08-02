import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



export async function iniciarReuniao(

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


  await updateDoc(

    referencia,

    {

      reuniao:{

        ativa:true,

        iniciadaPor:jogadorId,

        criadaEm:Date.now(),

        votos:{}

      }

    }

  );


  return true;

}







export async function votarJogador(

  operacaoId:string,

  jogadorId:string,

  alvoId:string

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



  const votos =

    dados.reuniao?.votos || {};



  votos[jogadorId] = alvoId;



  await updateDoc(

    referencia,

    {

      "reuniao.votos":votos

    }

  );


  return true;

}







export async function encerrarReuniao(

  operacaoId:string

){


  const referencia = doc(

    db,

    "operacoes",

    operacaoId

  );


  await updateDoc(

    referencia,

    {

      "reuniao.ativa":false

    }

  );


  return true;

}