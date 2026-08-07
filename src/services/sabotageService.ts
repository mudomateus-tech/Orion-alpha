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
  registrarEventoProgressao
} from "@/services/progressionService";



const tiposSabotagem = [

  {
    tipo:"falha_sistema",
    titulo:"Falha no sistema"
  },

  {
    tipo:"apagao",
    titulo:"Apagão detectado"
  },

  {
    tipo:"comunicacao",
    titulo:"Comunicação interrompida"
  }

];



function escolherSabotagem(){

  const sorteio =

    Math.floor(

      Math.random() *

      tiposSabotagem.length

    );


  return tiposSabotagem[sorteio];

}





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





  if(!jogador){

    throw new Error(

      "Jogador não encontrado."

    );

  }





  if(

    jogador.papel !== "infiltrado"

  ){

    throw new Error(

      "Somente o infiltrado pode sabotar."

    );

  }





  if(

    dados.sabotagem?.ativa

  ){

    throw new Error(

      "Já existe uma sabotagem ativa."

    );

  }





  const sabotagemEscolhida =

    escolherSabotagem();





  const sabotagem = {


    ativa:true,


    autor:jogadorId,


    tipo:

      sabotagemEscolhida.tipo,


    titulo:

      sabotagemEscolhida.titulo,


    criadaEm:

      Date.now(),


    status:

      "em andamento"


  };





  await updateDoc(

    referencia,

    {


      sabotagem,


      ultimaAcao:{


        tipo:

          "sabotagem_iniciada",


        jogadorId,


        data:

          Date.now()


      }


    }

  );





  await criarEvento(

    operacaoId,

    {


      tipo:

        "sabotagem_iniciada",



      titulo:

        "🚨 Sabotagem iniciada",




      descricao:

        "Uma falha foi detectada no sistema.",



      jogadorId



    }

  );





  // PROGRESSÃO DO INFILTRADO

  await registrarEventoProgressao(

    jogadorId,

    "sabotagem"

  );





  return {

    titulo:

      sabotagem.titulo,


    tipo:

      sabotagem.tipo

  };

}