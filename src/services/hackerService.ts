import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";





export async function verificarHacker(

  operacaoId:string,

  jogadorId:string

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



  const jogador =

    dados.jogadores?.find(

      (j:any)=>

        j.id === jogadorId

    );



  if(!jogador){

    throw new Error(

      "Jogador não encontrado."

    );

  }



  return jogador.papel === "hacker";

}








export async function executarHack(

  operacaoId:string,

  jogadorId:string,

  acao:string

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



  const jogador =

    dados.jogadores?.find(

      (j:any)=>

        j.id === jogadorId

    );



  if(

    !jogador ||

    jogador.papel !== "hacker"

  ){

    throw new Error(

      "Apenas o hacker pode executar esta ação."

    );

  }



  await updateDoc(

    referencia,

    {

      ultimaAcao:{

        tipo:"hack",

        jogadorId,

        acao,

        data:Date.now()

      }

    }

  );



  return true;

}