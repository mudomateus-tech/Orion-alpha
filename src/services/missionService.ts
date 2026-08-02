import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";

function gerarId() {
  return crypto.randomUUID();
}

function gerarMissao(
  titulo: string,
  descricao: string,
  latitude: number,
  longitude: number,
  raio: number
) {
  return {
    id: gerarId(),
    titulo,
    descricao,
    status: "pendente",
    progresso: 0,
    criadaEm: Date.now(),
    raio,
    localizacao: {
      latitude,
      longitude
    }
  };
}

export async function criarMissoes(
  operacaoId: string
) {
  const referencia = doc(
    db,
    "operacoes",
    operacaoId
  );

  const snapshot = await getDoc(referencia);

  if (!snapshot.exists()) {
    throw new Error("Operação não encontrada.");
  }

  const operacao: any = snapshot.data();

  if (
    operacao.missoes &&
    operacao.missoes.length > 0
  ) {
    return operacao.missoes;
  }

  const latitude =
    operacao.jogadores?.[0]?.localizacao?.latitude ??
    2.7972;

  const longitude =
    operacao.jogadores?.[0]?.localizacao?.longitude ??
    -60.7096;

  const raio =
    operacao.configuracao?.raioMissao ?? 5;

  const missoes = [
    gerarMissao(
      "Reativar energia",
      "Recupere o sistema principal.",
      latitude,
      longitude,
      raio
    ),

    gerarMissao(
      "Verificar comunicação",
      "Restaure o sinal da base.",
      latitude + 0.00018,
      longitude + 0.00018,
      raio
    ),

    gerarMissao(
      "Analisar terminal",
      "Colete dados do sistema.",
      latitude + 0.00036,
      longitude + 0.00036,
      raio
    ),

    gerarMissao(
      "Calibrar sensores",
      "Ajuste os sensores externos.",
      latitude + 0.00054,
      longitude + 0.00054,
      raio
    ),

    gerarMissao(
      "Reparar equipamento",
      "Conserte o equipamento danificado.",
      latitude + 0.00072,
      longitude + 0.00072,
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


  if(

    !snapshot.exists()

  ){

    throw new Error(

      "Operação não encontrada."

    );

  }


  const operacao:any =

    snapshot.data();


  return operacao.missoes || [];

}




export async function atualizarMissao(

  operacaoId:string,

  missaoId:string,

  dados:any

){

  const referencia = doc(

    db,

    "operacoes",

    operacaoId

  );


  const snapshot = await getDoc(

    referencia

  );


  if(

    !snapshot.exists()

  ){

    throw new Error(

      "Operação não encontrada."

    );

  }


  const operacao:any =

    snapshot.data();


  const missoes =

    (operacao.missoes || []).map(

      (missao:any)=>{

        if(

          missao.id === missaoId

        ){

          return {

            ...missao,

            ...dados

          };

        }

        return missao;

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