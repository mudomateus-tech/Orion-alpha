import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";



export interface Voto {

  eleitor:string;

  escolhido:string;

  criadoEm:number;

}








export async function iniciarVotacao(

  operacaoId:string

){


  const referencia =

    doc(

      db,

      "operacoes",

      operacaoId

    );



  await updateDoc(

    referencia,

    {

      status:
        "reuniao",


      votos:[]

    }

  );


}









export async function votar(

  operacaoId:string,

  eleitorId:string,

  escolhidoId:string

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



  if(
    !resultado.exists()
  ){

    throw new Error(
      "Operação não encontrada"
    );

  }



  const dados:any =

    resultado.data();



  const votos =
    dados.votos || [];



  const votoExistente =

    votos.find(

      (v:Voto)=>

        v.eleitor === eleitorId

    );



  if(
    votoExistente
  ){

    throw new Error(
      "Jogador já votou"
    );

  }



  const novoVoto:Voto = {


    eleitor:
      eleitorId,


    escolhido:
      escolhidoId,


    criadoEm:
      Date.now()


  };



  await updateDoc(

    referencia,

    {

      votos:[

        ...votos,

        novoVoto

      ]

    }

  );


}









export async function calcularResultadoVotacao(

  operacaoId:string

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



  if(
    !resultado.exists()
  ){

    throw new Error(
      "Operação não encontrada"
    );

  }



  const dados:any =

    resultado.data();



  const votos =
    dados.votos || [];



  const contagem:any = {};



  votos.forEach(

    (v:Voto)=>{


      contagem[v.escolhido] =

        (

          contagem[v.escolhido]

          ||

          0

        )

        +

        1;


    }

  );



  let eliminado = null;

  let maior = 0;



  Object.keys(contagem)

    .forEach(

      (jogadorId)=>{


        if(

          contagem[jogadorId]

          >

          maior

        ){

          maior =

            contagem[jogadorId];


          eliminado =

            jogadorId;

        }


      }

    );



  return {

    eliminado,

    votos:

      contagem

  };


}









export async function eliminarJogador(

  operacaoId:string,

  jogadorId:string

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



  if(
    !resultado.exists()
  ){

    throw new Error(
      "Operação não encontrada"
    );

  }



  const dados:any =

    resultado.data();



  const jogadores =

    dados.jogadores.map(

      (j:any)=>{


        if(

          j.id === jogadorId

        ){

          return {

            ...j,

            status:

              "eliminado"

          };

        }



        return j;


      }

    );



  await updateDoc(

    referencia,

    {

      jogadores

    }

  );


}