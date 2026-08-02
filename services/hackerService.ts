import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";





export async function executarHack(

  operacaoId:string,

  jogadorId:string

){



  const referencia =

    doc(

      db,

      "operacoes",

      operacaoId

    );







  const snapshot =

    await getDoc(

      referencia

    );







  if(

    !snapshot.exists()

  ){

    throw new Error(

      "Operação não encontrada."

    );

  }








  const dados:any =

    snapshot.data();








  const jogador =

    dados.jogadores?.find(

      (j:any)=>

        j.id === jogadorId

    );







  if(

    !jogador

  ){

    throw new Error(

      "Jogador não encontrado."

    );

  }







  if(

    jogador.papel !== "hacker"

  ){

    throw new Error(

      "Acesso negado. Apenas o hacker pode executar esta ação."

    );

  }







  await updateDoc(

    referencia,

    {


      hack:

      {


        ativo:true,


        autor:jogadorId,


        tipo:"interferencia_comunicacao",


        criadoEm:

          Date.now(),


        duracao:

          30



      },



      ultimaAcao:

      {


        tipo:

          "hack_executado",



        jogadorId,



        data:

          Date.now()



      }



    }

  );







  return {


    sucesso:true,


    mensagem:

      "Comunicação comprometida."



  };


}