import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";

import { db } from "@/lib/firebase";



function gerarCodigo() {

  const caracteres =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


  let codigo = "";


  for(let i = 0; i < 6; i++){

    codigo += caracteres[

      Math.floor(

        Math.random() *

        caracteres.length

      )

    ];

  }


  return codigo;

}







export async function criarOperacao(

  nome:string,

  comandante:string

){


  const codigo = gerarCodigo();


  const comandanteId =
    crypto.randomUUID();





  const operacao = {


    codigo,


    nome,



    comandanteId,



    criadaEm:

      Date.now(),



    status:

      "aguardando",




    jogadores:[


      {


        id:

          comandanteId,



        nome:

          comandante,



        tipo:

          "comandante",



        papel:

          "comandante",



        status:

          "ativo",



        conectado:

          true



      }


    ],





    configuracao:{


      quantidadeInfiltrados:

        1,


      quantidadeMissoes:

        5,


      raioMissao:

        10,


      tempoSabotagem:

        30


    }



  };







  const resultado =

    await addDoc(

      collection(

        db,

        "operacoes"

      ),

      operacao

    );







  return {


    operacaoId:

      resultado.id,


    jogadorId:

      comandanteId,


    codigo



  };


}









export async function buscarOperacao(

  id:string

){


  const resultado =

    await getDoc(

      doc(

        db,

        "operacoes",

        id

      )

    );




  if(

    !resultado.exists()

  ){

    throw new Error(

      "Operação não encontrada"

    );

  }



  return {


    id:

      resultado.id,


    ...resultado.data()



  };



}









export async function buscarOperacaoPorCodigo(

  codigo:string

){


  const consulta =

    query(


      collection(

        db,

        "operacoes"

      ),



      where(

        "codigo",

        "==",

        codigo.toUpperCase()

      )


    );





  const resultado =

    await getDocs(

      consulta

    );





  if(

    resultado.empty

  ){

    throw new Error(

      "Operação não encontrada"

    );

  }






  const documento =

    resultado.docs[0];





  return {


    id:

      documento.id,


    ...documento.data()



  };



}









export async function atualizarOperacao(

  id:string,

  dados:any

){


  await updateDoc(

    doc(

      db,

      "operacoes",

      id

    ),

    dados

  );


}