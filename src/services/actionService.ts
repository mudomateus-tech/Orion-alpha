import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";

import {
  criarEvento
} from "@/services/eventService";

import {
  verificarVitoria
} from "@/services/victoryService";





export async function concluirMissao(

  operacaoId:string,

  jogadorId:string,

  missaoId:string

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






  if(

    jogador.status === "morto" ||

    jogador.vivo === false

  ){

    throw new Error(

      "Jogadores eliminados não podem executar missões."

    );

  }







  const missao =

    dados.missoes?.find(

      (m:any)=>

        m.id === missaoId

    );






  if(!missao){

    throw new Error(

      "Missão não encontrada."

    );

  }






  if(

    missao.status === "concluida"

  ){

    throw new Error(

      "Esta missão já foi concluída."

    );

  }








  const missoes =

    dados.missoes.map(

      (m:any)=>{


        if(

          m.id === missaoId

        ){

          return {

            ...m,

            status:"concluida",

            progresso:100

          };

        }



        return m;


      }

    );








  await updateDoc(

    referencia,

    {


      missoes,


      ultimaAcao:{


        tipo:

          "missao_concluida",


        jogadorId,


        missaoId,


        data:

          Date.now()


      }


    }

  );








  await criarEvento(

    operacaoId,

    {


      tipo:

        "missao_concluida",



      titulo:

        "✅ Missão concluída",



      descricao:

        `${jogador.nome} concluiu uma missão.`,



      jogadorId


    }

  );








  await verificarVitoria(

    operacaoId

  );







  return true;


}