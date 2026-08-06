import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



function gerarId(){

  return crypto.randomUUID();

}





export interface MissaoConfig {

  id:string;

  tipo:
  | "cabos"
  | "frequencia"
  | "codigo"
  | "sequencia"
  | "reparo";

  titulo:string;

  descricao:string;

  localizacao:{
    latitude:number;
    longitude:number;
  };

  raio:number;

  status:
  | "pendente"
  | "concluida";

  criadaEm:number;

}





export async function adicionarMissao(

  operacaoId:string,

  missao:Omit<MissaoConfig,"id"|"status"|"criadaEm">

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



  const novaMissao:MissaoConfig = {

    id:gerarId(),

    status:"pendente",

    criadaEm:Date.now(),

    ...missao

  };



  const missoes = [

    ...(dados.missoes || []),

    novaMissao

  ];



  await updateDoc(

    referencia,

    {

      missoes

    }

  );



  return novaMissao;

}








export async function removerMissao(

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

    .filter(

      (m:any)=>

        m.id !== missaoId

    );



  await updateDoc(

    referencia,

    {

      missoes

    }

  );



  return missoes;

}








export async function buscarMissoesConfiguradas(

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



  return dados.missoes || [];

}