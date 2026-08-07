import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Mapa } from "@/types/Map";

const COLLECTION = "mapas";

export async function criarMapa(mapa: Mapa) {

  await setDoc(

    doc(db, COLLECTION, mapa.id),

    mapa

  );

}

export async function buscarMapa(

  mapaId: string

): Promise<Mapa | null> {

  const snapshot = await getDoc(

    doc(db, COLLECTION, mapaId)

  );

  if (!snapshot.exists()) {

    return null;

  }

  return snapshot.data() as Mapa;

}

export async function listarMapas(): Promise<Mapa[]> {

  const snapshot = await getDocs(

    collection(db, COLLECTION)

  );

  return snapshot.docs.map(

    doc => doc.data() as Mapa

  );

}

export async function salvarMapa(

  mapaId: string,

  dados: Partial<Mapa>

) {

  await updateDoc(

    doc(db, COLLECTION, mapaId),

    dados

  );

}

export async function removerMapa(

  mapaId: string

) {

  await deleteDoc(

    doc(db, COLLECTION, mapaId)

  );

}