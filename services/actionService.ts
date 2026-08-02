import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  calcularDistancia,
  dentroDoRaio
} from "@/services/distanceService";





export async function concluirMissao(

  operacaoId:string,

  jogadorId:string,

  missaoId:string

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







  const missao =

    dados.missoes?.find(

      (m:any)=>

        m.id === missaoId

    );







  if(

    !missao

  ){

    throw new Error(

      "Missão não encontrada."

    );

  }







  const distancia =

    calcularDistancia(


      jogador.localizacao.latitude,


      jogador.localizacao.longitude,


      missao.localizacao.latitude,


      missao.localizacao.longitude


    );







  if(

    !dentroDoRaio(

      distancia,

      missao.localizacao.raio

    )

  ){

    throw new Error(

      `Você está a ${Math.round(distancia)} metros da missão.`

    );

  }







  const missoesAtualizadas =

    dados.missoes.map(

      (m:any)=>{


        if(

          m.id === missaoId

        ){

          return {


            ...m,


            status:

              "concluida",


            progresso:

              100,


            concluidaPor:

              jogadorId,


            concluidaEm:

              Date.now()


          };

        }



        return m;


      }

    );







  await updateDoc(

    referencia,

    {


      missoes:

        missoesAtualizadas,



      ultimaAcao:

      {


        tipo:

          "missao_concluida",



        jogadorId,



        missaoId,



        data:

          Date.now()



      }



    }

  );







  return {

    sucesso:true,

    mensagem:

      "Missão concluída com sucesso."

  };


}