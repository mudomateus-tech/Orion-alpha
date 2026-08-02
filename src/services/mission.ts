import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



function gerarId(){

  return crypto.randomUUID();

}



function gerarSenha(){

  return Math.floor(

    1000 + Math.random() * 9000

  ).toString();

}





function gerarMissao(

  tipo:string,

  titulo:string,

  descricao:string,

  latitude:number,

  longitude:number,

  raio:number

){


  return {

    id:gerarId(),

    tipo,

    titulo,

    descricao,

    status:"pendente",

    progresso:0,

    criadaEm:Date.now(),

    senha:

      tipo === "codigo"

      ?

      gerarSenha()

      :

      null,

    raio,

    localizacao:{

      latitude,

      longitude

    }

  };

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



  const operacao:any = snapshot.data();



  if(

    operacao.missoes &&

    operacao.missoes.length > 0

  ){

    return operacao.missoes;

  }





  const jogador =

    operacao.jogadores?.[0];



  const latitude =

    jogador?.localizacao?.latitude ?? 2.7972;



  const longitude =

    jogador?.localizacao?.longitude ?? -60.7096;



  const raio = 1;







  const missoes = [



    gerarMissao(

      "cabos",

      "Reativar energia",

      "Conecte os cabos corretamente.",

      latitude,

      longitude,

      raio

    ),





    gerarMissao(

      "frequencia",

      "Verificar comunicação",

      "Ajuste o sinal da antena.",

      latitude,

      longitude,

      raio

    ),





    gerarMissao(

      "codigo",

      "Analisar terminal",

      "Digite o código correto.",

      latitude,

      longitude,

      raio

    ),





    gerarMissao(

      "sequencia",

      "Calibrar sensores",

      "Repita a sequência correta.",

      latitude,

      longitude,

      raio

    ),





    gerarMissao(

      "reparo",

      "Reparar equipamento",

      "Monte o equipamento novamente.",

      latitude,

      longitude,

      raio

    )


  ];







  await updateDoc(

    referencia,

    {

      missoes

    }

  );



  return missoes;

}








export async function buscarMissoes(

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



  const operacao:any = snapshot.data();



  return operacao.missoes || [];


}