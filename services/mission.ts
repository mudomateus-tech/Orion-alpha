import {
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";



const modelos = [

  {
    tipo:"cabos",
    titulo:"Reativar energia",
    descricao:"Recupere o sistema principal."
  },

  {
    tipo:"frequencia",
    titulo:"Verificar comunicação",
    descricao:"Restaure o sinal da base."
  },

  {
    tipo:"codigo",
    titulo:"Analisar terminal",
    descricao:"Colete dados do sistema."
  },

  {
    tipo:"sequencia",
    titulo:"Calibrar sensores",
    descricao:"Ajuste os sensores externos."
  },

  {
    tipo:"reparo",
    titulo:"Reparar equipamento",
    descricao:"Conserte o equipamento danificado."
  }

];



function gerarId(){

  return crypto.randomUUID();

}



function deslocar(

  valor:number,

  metros:number

){

  return (

    valor +

    metros / 111320

  );

}





export async function criarMissoes(

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



  const comandante =

    dados.jogadores?.[0];



  const base =

    comandante?.localizacao;



  if(

    !base ||

    base.latitude === undefined ||

    base.longitude === undefined

  ){

    throw new Error(

      "Localização do comandante não encontrada."

    );

  }





  const missoes = modelos.map(

    (modelo,index)=>{


      return {


        id: gerarId(),


        tipo:

          modelo.tipo,


        titulo:

          modelo.titulo,


        descricao:

          modelo.descricao,


        localizacao:{


          latitude:

            deslocar(

              base.latitude,

              index * 20

            ),


          longitude:

            deslocar(

              base.longitude,

              index * 20

            )

        },


        raio:

          1,


        status:

          "pendente",


        progresso:

          0,


        criadaEm:

          Date.now()


      };


    }

  );





  await updateDoc(

    referencia,

    {

      missoes

    }

  );





  return missoes;

}