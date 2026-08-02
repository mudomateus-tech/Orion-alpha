import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";





export async function executarSabotagem(

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

      "Operação não encontrada."

    );

  }







  const dados:any =

    resultado.data();






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

    jogador.papel !== "infiltrado"

  ){

    throw new Error(

      "Somente infiltrados podem sabotar."

    );

  }








  const sabotagem = {



    ativa:

      true,



    autor:

      jogadorId,



    criadaEm:

      Date.now(),



    tipo:

      "falha_sistema"



  };








  await updateDoc(

    referencia,

    {


      sabotagem



    }

  );








  return {


    titulo:

      "SABOTAGEM ATIVADA",


    mensagem:

      "O sistema sofreu uma falha."



  };



}