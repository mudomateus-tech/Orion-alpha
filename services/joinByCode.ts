import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";



function criarId(){

  return crypto.randomUUID();

}







export async function entrarPorCodigo(

  codigo:string,

  nome:string

){



  const busca =

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

      busca

    );







  if(

    resultado.empty

  ){

    throw new Error(

      "Código inválido."

    );

  }







  const documento =

    resultado.docs[0];






  const operacao:any =

    documento.data();







  const jogadorId =

    criarId();








  const novoJogador = {



    id:

      jogadorId,



    nome,



    tipo:

      "agente",



    papel:

      null,



    status:

      "aguardando",



    conectado:

      true



  };








  const jogadoresAtualizados = [


    ...(operacao.jogadores || []),


    novoJogador


  ];







  await updateDoc(

    doc(

      db,

      "operacoes",

      documento.id

    ),


    {


      jogadores:

        jogadoresAtualizados


    }


  );







  return {


    operacaoId:

      documento.id,


    jogadorId



  };


}