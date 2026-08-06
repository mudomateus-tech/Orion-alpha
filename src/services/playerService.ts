import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";

import type { Jogador } from "@/types/Player";



export async function buscarJogador(

  operacaoId:string,

  jogadorId:string

): Promise<Jogador | null>{

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

      (j:Jogador)=>

        j.id === jogadorId

    );

  return jogador || null;

}





export async function atualizarJogador(

  operacaoId:string,

  jogadorId:string,

  dadosAtualizados:Partial<Jogador>

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

      (j:Jogador)=>{

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





export async function ativarModoFantasma(

  operacaoId:string,

  jogadorId:string

){

  await atualizarJogador(

    operacaoId,

    jogadorId,

    {

      status:"fantasma"

    }

  );

  return true;

}