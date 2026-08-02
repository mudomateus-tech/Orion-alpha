import {
  collection,
  addDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";


function gerarCodigo(){

  const letras =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


  let codigo = "";


  for(let i = 0; i < 6; i++){

    codigo +=
      letras[
        Math.floor(
          Math.random() *
          letras.length
        )
      ];

  }


  return codigo;

}




export async function criarOperacao(

  nome:string,

  jogadorId:string,

  jogadorNome:string

){


  if(!nome){

    throw new Error(
      "Nome da operação não informado."
    );

  }


  if(!jogadorId){

    throw new Error(
      "Jogador sem ID."
    );

  }


  if(!jogadorNome){

    throw new Error(
      "Nome do jogador não informado."
    );

  }




  const codigo = gerarCodigo();




  const operacao = {


    codigo,


    nome,


    status:
      "aguardando",


    criadoEm:
      Date.now(),



    jogadores:[

      {

        id:jogadorId,

        nome:jogadorNome,

        tipo:
          "comandante",

        papel:
          "comandante",

        vivo:true,

        conectado:true

      }

    ],



    configuracao:{


      quantidadeInfiltrados:1,


      possuiHacker:true


    }


  };




  console.log(
    "CRIANDO OPERAÇÃO:",
    operacao
  );




  const referencia = await addDoc(

    collection(

      db,

      "operacoes"

    ),

    operacao

  );



  return {

    id:referencia.id,

    codigo

  };


}