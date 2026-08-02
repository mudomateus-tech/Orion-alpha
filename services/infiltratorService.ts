import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";



const objetivos = [

  {
    id: "desligar_sistema",

    titulo: "Desligar o sistema",

    descricao:
      "Execute uma sabotagem para interromper uma área da operação."
  },


  {
    id: "atrasar_missao",

    titulo: "Atrasar agentes",

    descricao:
      "Impeça o avanço dos agentes sabotando uma missão."
  },


  {
    id: "causar_caos",

    titulo: "Criar caos",

    descricao:
      "Faça os agentes perderem tempo durante a operação."
  }

];





function escolherObjetivo(){

  return objetivos[

    Math.floor(

      Math.random() *

      objetivos.length

    )

  ];

}







export async function criarObjetivoInfiltrado(

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



  const objetivo =

    escolherObjetivo();



  const jogadores =

    dados.jogadores.map(

      (j:any)=>{


        if(
          j.id === jogadorId
        ){

          return {

            ...j,

            objetivoInfiltrado:

              objetivo

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



  return objetivo;


}








export async function buscarObjetivoInfiltrado(

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



  const jogador =

    dados.jogadores.find(

      (j:any)=>

        j.id === jogadorId

    );



  if(
    !jogador
  ){

    throw new Error(
      "Jogador não encontrado"
    );

  }



  return jogador.objetivoInfiltrado || null;


}