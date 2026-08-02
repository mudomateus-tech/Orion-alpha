import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";



function embaralhar(array:any[]){

  return [...array].sort(

    () => Math.random() - 0.5

  );

}





export async function iniciarOperacao(

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





  const jogadores =

    dados.jogadores || [];





  if(

    jogadores.length < 3

  ){

    throw new Error(

      "São necessários pelo menos 3 jogadores."

    );

  }







  const sorteio =

    embaralhar(

      jogadores

    );







  const infiltradoId =

    sorteio[0].id;





  const hackerId =

    sorteio[1].id;







  const jogadoresAtualizados =

    jogadores.map(

      (j:any)=>{



        let papel =

          "agente";



        if(

          j.id === infiltradoId

        ){

          papel =

            "infiltrado";

        }



        if(

          j.id === hackerId

        ){

          papel =

            "hacker";

        }





        return {

          ...j,

          papel,

          status:

            "ativo",

          entrouNaPartida:

            true

        };


      }

    );







  await updateDoc(

    referencia,

    {

      jogadores:

        jogadoresAtualizados,

      status:

        "em andamento",

      iniciadoEm:

        Date.now()

    }

  );





  return jogadoresAtualizados;

}