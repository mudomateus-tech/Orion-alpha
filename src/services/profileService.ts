import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";

export interface PerfilAgente {

  id: string;

  nome: string;

  codinome: string;

  avatar: string;

  cor: string;

  papel: string;

  nivel: number;

  xp: number;

  xpProximoNivel: number;

  operacoes: number;

  vitorias: number;

  derrotas: number;

  eliminacoes: number;

  sabotagens: number;

  missoesConcluidas: number;

  tempoJogado: number;

  medalhas: string[];

  criadoEm: number;

}

export async function criarPerfilAgente(

  jogadorId: string,

  nome: string

){

  const referencia = doc(

    db,

    "agentes",

    jogadorId

  );



  const existente = await getDoc(

    referencia

  );



  if(existente.exists()){

    return;

  }



  await setDoc(

    referencia,

    {

      id: jogadorId,

      nome,

      codinome: "RECRUTA",

      avatar: "🛰️",

      cor: "#00ffff",

      papel: "Agente",

      nivel: 1,

      xp: 0,

      xpProximoNivel: 100,

      operacoes: 0,

      vitorias: 0,

      derrotas: 0,

      eliminacoes: 0,

      sabotagens: 0,

      missoesConcluidas: 0,

      tempoJogado: 0,

      medalhas: [],

      criadoEm: Date.now()

    }

  );

}

export async function buscarPerfilAgente(

  jogadorId: string

){

  const referencia = doc(

    db,

    "agentes",

    jogadorId

  );



  const snapshot = await getDoc(

    referencia

  );



  if(!snapshot.exists()){

    return null;

  }



  return snapshot.data() as PerfilAgente;

}

export async function atualizarPerfilAgente(

  jogadorId: string,

  dados: Partial<PerfilAgente>

){

  const referencia = doc(

    db,

    "agentes",

    jogadorId

  );



  await updateDoc(

    referencia,

    dados

  );

}

export async function adicionarXP(

  jogadorId: string,

  quantidade: number

){

  const perfil = await buscarPerfilAgente(

    jogadorId

  );



  if(!perfil){

    return;

  }



  let xp = perfil.xp + quantidade;

  let nivel = perfil.nivel;

  let xpProximoNivel = perfil.xpProximoNivel;



  while(xp >= xpProximoNivel){

    xp -= xpProximoNivel;

    nivel++;

    xpProximoNivel = Math.round(

      xpProximoNivel * 1.25

    );

  }



  await atualizarPerfilAgente(

    jogadorId,

    {

      xp,

      nivel,

      xpProximoNivel

    }

  );

}

export async function registrarVitoria(

  jogadorId: string

){

  const perfil = await buscarPerfilAgente(

    jogadorId

  );



  if(!perfil){

    return;

  }



  await atualizarPerfilAgente(

    jogadorId,

    {

      vitorias: perfil.vitorias + 1,

      operacoes: perfil.operacoes + 1

    }

  );

}

export async function registrarDerrota(

  jogadorId: string

){

  const perfil = await buscarPerfilAgente(

    jogadorId

  );



  if(!perfil){

    return;

  }



  await atualizarPerfilAgente(

    jogadorId,

    {

      derrotas: perfil.derrotas + 1,

      operacoes: perfil.operacoes + 1

    }

  );

}

export async function registrarMissao(

  jogadorId: string

){

  const perfil = await buscarPerfilAgente(

    jogadorId

  );



  if(!perfil){

    return;

  }



  await atualizarPerfilAgente(

    jogadorId,

    {

      missoesConcluidas:

        perfil.missoesConcluidas + 1

    }

  );

}

export async function registrarEliminacao(

  jogadorId: string

){

  const perfil = await buscarPerfilAgente(

    jogadorId

  );



  if(!perfil){

    return;

  }



  await atualizarPerfilAgente(

    jogadorId,

    {

      eliminacoes:

        perfil.eliminacoes + 1

    }

  );

}

export async function registrarSabotagem(

  jogadorId: string

){

  const perfil = await buscarPerfilAgente(

    jogadorId

  );



  if(!perfil){

    return;

  }



  await atualizarPerfilAgente(

    jogadorId,

    {

      sabotagens:

        perfil.sabotagens + 1

    }

  );

}