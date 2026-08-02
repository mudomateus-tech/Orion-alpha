import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";





function embaralhar(array:any[]){

  return array.sort(

    ()=>Math.random()-0.5

  );

}






export async function iniciarOperacao(

  operacaoId:string

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



  let jogadores =

    dados.jogadores || [];





  if(jogadores.length < 3){

    throw new Error(

      "São necessários pelo menos 3 jogadores."

    );

  }






  const configuracao =

    dados.configuracao || {};





  const quantidadeInfiltrados =

    configuracao.quantidadeInfiltrados ?? 1;




  const possuiHacker =

    configuracao.possuiHacker ?? false;






  const comandante =

    jogadores.find(

      (j:any)=>

        j.tipo === "comandante"

    );







  let jogadoresComuns =

    jogadores.filter(

      (j:any)=>

        j.id !== comandante?.id

    );






  jogadoresComuns =

    embaralhar(

      jogadoresComuns

    );






  const infiltrados =

    jogadoresComuns.splice(

      0,

      quantidadeInfiltrados

    );





  let hacker:any[] = [];






  if(

    possuiHacker &&

    jogadoresComuns.length > 0

  ){

    hacker = jogadoresComuns.splice(

      0,

      1

    );

  }








  const idsInfiltrados =

    infiltrados.map(

      (i:any)=>

        i.id

    );








  jogadores = jogadores.map(

    (j:any)=>{



      if(

        j.id === comandante?.id

      ){

        return {

          ...j,

          papel:"comandante",

          aliados:[],

          entrouNaPartida:true,

          conectado:true,

          status:"ativo"

        };

      }






      if(

        idsInfiltrados.includes(j.id)

      ){



        return {

          ...j,

          papel:"infiltrado",

          aliados:

            idsInfiltrados.filter(

              (id:string)=>

                id !== j.id

            ),

          entrouNaPartida:true,

          conectado:true,

          status:"ativo"

        };


      }







      if(

        hacker.some(

          (h:any)=>

            h.id === j.id

        )

      ){

        return {

          ...j,

          papel:"hacker",

          aliados:[],

          entrouNaPartida:true,

          conectado:true,

          status:"ativo"

        };

      }







      return {

        ...j,

        papel:"agente",

        aliados:[],

        entrouNaPartida:true,

        conectado:true,

        status:"ativo"

      };


    }

  );








  await updateDoc(

    referencia,

    {

      status:"em andamento",

      iniciadoEm:Date.now(),

      jogadores

    }

  );






  return true;


}