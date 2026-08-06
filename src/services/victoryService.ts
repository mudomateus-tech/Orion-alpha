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



export async function verificarVitoria(

  operacaoId:string

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



  if(

    dados.status === "finalizada"

  ){

    return dados.vitoria;

  }



  const missoes =

    dados.missoes || [];



  const jogadores =

    dados.jogadores || [];



  const todasMissoesConcluidas =

    missoes.length > 0 &&

    missoes.every(

      (m:any)=>

        m.status === "concluida"

    );



  const agentes =

    jogadores.filter(

      (j:any)=>

        (

          j.papel === "agente" ||

          j.papel === "hacker"

        )

        &&

        j.status !== "morto"

    );



  const infiltrados =

    jogadores.filter(

      (j:any)=>

        j.papel === "infiltrado"

        &&

        j.status !== "morto"

    );



  let vencedor:string|null =

    null;



  let mensagem = "";



  if(

    todasMissoesConcluidas

  ){

    vencedor =

      "agentes";



    mensagem =

      "Os agentes completaram todas as missões.";

  }
    if(

    !vencedor &&

    infiltrados.length >= agentes.length

  ){

    vencedor =

      "infiltrados";



    mensagem =

      "Os infiltrados dominaram a operação.";

  }



  if(

    vencedor

  ){

    await updateDoc(

      referencia,

      {

        status:

          "finalizada",



        vitoria:{

          vencedor,

          mensagem,

          data:

            Date.now()

        }

      }

    );



    await criarEvento(

      operacaoId,

      {

        tipo:

          "jogo_finalizado",



        titulo:

          "🏆 Operação finalizada",



        descricao:

          mensagem,



        jogadorId:

          "sistema"

      }

    );

  }
    return {

    vencedor,

    mensagem

  };

}