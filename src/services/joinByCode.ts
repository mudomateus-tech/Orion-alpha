import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";





export async function entrarPorCodigo(

  codigo:string,

  jogadorId:string,

  jogadorNome:string

){



  if(!codigo){

    throw new Error(

      "Código não informado."

    );

  }



  if(!jogadorId){

    throw new Error(

      "ID do jogador não informado."

    );

  }



  if(!jogadorNome){

    throw new Error(

      "Nome do jogador não informado."

    );

  }






  const referencia = collection(

    db,

    "operacoes"

  );



  const snapshot = await getDocs(

    referencia

  );





  let operacaoEncontrada:any = null;

  let idOperacao = "";






  snapshot.forEach(

    (documento)=>{


      const dados:any = documento.data();




      if(

        dados.codigo === codigo.trim().toUpperCase()

      ){

        operacaoEncontrada = dados;

        idOperacao = documento.id;

      }


    }

  );







  if(!operacaoEncontrada){


    throw new Error(

      "Operação não encontrada."

    );


  }







  if(

    operacaoEncontrada.status !== "aguardando"

  ){


    throw new Error(

      "Essa operação já começou."

    );


  }







  const jogadores =

    operacaoEncontrada.jogadores || [];







  const jogadorExistente =

    jogadores.find(

      (j:any)=>

        j.id === jogadorId

    );







  if(jogadorExistente){


    return {

      operacaoId:idOperacao,

      codigo:operacaoEncontrada.codigo,

      jogadorId:jogadorId

    };


  }









  jogadores.push({


    id:jogadorId,


    nome:jogadorNome.trim(),


    tipo:"agente",


    papel:"agente",


    vivo:true,


    conectado:true,


    entrouNaPartida:false,


    localizacao:null


  });









  await updateDoc(


    doc(

      db,

      "operacoes",

      idOperacao

    ),


    {


      jogadores


    }


  );








  return {


    operacaoId:idOperacao,


    codigo:operacaoEncontrada.codigo,


    jogadorId:jogadorId


  };



}