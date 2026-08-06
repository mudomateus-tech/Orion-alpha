import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



export interface PerfilAgente {

  id:string;

  nome:string;

  xp:number;

  nivel:number;

  operacoes:number;

  vitorias:number;

  derrotas:number;

  eliminacoes:number;

  missoesConcluidas:number;

}




export async function criarPerfilAgente(

  jogadorId:string,

  nome:string

){


  const referencia = doc(

    db,

    "agentes",

    jogadorId

  );




  const existente = await getDoc(

    referencia

  );




  if(existente.exists()){

    return;

  }





  await setDoc(

    referencia,

    {

      id:jogadorId,

      nome,

      xp:0,

      nivel:1,

      operacoes:0,

      vitorias:0,

      derrotas:0,

      eliminacoes:0,

      missoesConcluidas:0

    }

  );


}







export async function buscarPerfilAgente(

  jogadorId:string

){


  const referencia = doc(

    db,

    "agentes",

    jogadorId

  );




  const snapshot = await getDoc(

    referencia

  );





  if(!snapshot.exists()){

    return null;

  }





  return snapshot.data() as PerfilAgente;


}







export async function atualizarPerfilAgente(

  jogadorId:string,

  dados:any

){


  const referencia = doc(

    db,

    "agentes",

    jogadorId

  );




  await updateDoc(

    referencia,

    dados

  );


}