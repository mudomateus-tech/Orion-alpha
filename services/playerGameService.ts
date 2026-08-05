import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { Jogador } from "@/types/Player";



export async function buscarJogador(

  operacaoId:string,

  jogadorId:string

): Promise<Jogador>{


  const referencia =

    doc(

      db,

      "operacoes",

      operacaoId

    );



  const resultado =

    await getDoc(

      referencia

    );



  if(!resultado.exists()){

    throw new Error(

      "Operação não encontrada"

    );

  }



  const dados:any =

    resultado.data();



  const jogador =

    dados.jogadores?.find(

      (j:Jogador)=>

        j.id === jogadorId

    );



  if(!jogador){

    throw new Error(

      "Jogador não encontrado"

    );

  }



  return jogador;

}





export async function buscarPapelJogador(

  operacaoId:string,

  jogadorId:string

){


  const jogador =

    await buscarJogador(

      operacaoId,

      jogadorId

    );



  return {

    id:

      jogador.id,


    nome:

      jogador.nome,


    papel:

      jogador.papel,


    tipo:

      jogador.tipo,


    status:

      jogador.status

  };

}





export async function atualizarJogador(

  operacaoId:string,

  jogadorId:string,

  dados:Partial<Jogador>

){


  const referencia =

    doc(

      db,

      "operacoes",

      operacaoId

    );



  const resultado =

    await getDoc(

      referencia

    );



  if(!resultado.exists()){

    throw new Error(

      "Operação não encontrada"

    );

  }



  const operacao:any =

    resultado.data();



  const jogadores =

    (operacao.jogadores || []).map(

      (j:Jogador)=>

        j.id === jogadorId

        ?

        {

          ...j,

          ...dados

        }

        :

        j

    );



  await updateDoc(

    referencia,

    {

      jogadores

    }

  );

}





export async function jogadorConectado(

  operacaoId:string,

  jogadorId:string

){


  await atualizarJogador(

    operacaoId,

    jogadorId,

    {

      conectado:true

    }

  );

}





export async function jogadorDesconectado(

  operacaoId:string,

  jogadorId:string

){


  await atualizarJogador(

    operacaoId,

    jogadorId,

    {

      conectado:false

    }

  );

}