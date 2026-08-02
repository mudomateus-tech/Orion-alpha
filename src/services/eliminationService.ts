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





export async function eliminarJogador(

  operacaoId:string,

  atacanteId:string,

  alvoId:string

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





  const atacante =

    dados.jogadores?.find(

      (j:any)=>

        j.id === atacanteId

    );





  if(!atacante){

    throw new Error(

      "Atacante não encontrado."

    );

  }





  if(atacante.papel !== "infiltrado"){

    throw new Error(

      "Somente infiltrados podem eliminar."

    );

  }






  if(atacante.status === "morto"){

    throw new Error(

      "Jogadores mortos não podem eliminar."

    );

  }







  const alvo =

    dados.jogadores?.find(

      (j:any)=>

        j.id === alvoId

    );





  if(!alvo){

    throw new Error(

      "Alvo não encontrado."

    );

  }







  if(alvo.status === "morto"){

    throw new Error(

      "Jogador já eliminado."

    );

  }







  if(

    alvo.papel === "infiltrado"

  ){

    throw new Error(

      "Você não pode eliminar outro infiltrado."

    );

  }






  if(

    alvo.papel === "hacker"

  ){

    throw new Error(

      "Você não pode eliminar o hacker."

    );

  }







  const jogadores =

    dados.jogadores.map(

      (j:any)=>{


        if(

          j.id === alvoId

        ){

          return {

            ...j,

            status:"morto",

            vivo:false

          };


        }


        return j;


      }

    );








  await updateDoc(

    referencia,

    {

      jogadores,


      ultimaAcao:{

        tipo:

          "jogador_eliminado",


        autor:

          atacanteId,


        jogadorId:

          alvoId,


        data:

          Date.now()

      }


    }

  );








  await criarEvento(

    operacaoId,

    {


      tipo:

        "jogador_eliminado",



      titulo:

        "💀 Agente eliminado",




      descricao:

        `${alvo.nome} foi eliminado da operação.`,



      jogadorId:

        alvoId


    }

  );







  return {

    sucesso:true

  };


}