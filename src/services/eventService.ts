import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

import { db } from "@/lib/firebase";


export async function criarEvento(

  operacaoId:string,

  evento:any

){


  const eventoSeguro = {

    tipo: evento.tipo ?? "evento",

    titulo: evento.titulo ?? "Evento ORION",

    descricao: evento.descricao ?? "",

    jogadorId: evento.jogadorId ?? "desconhecido",

    criadoEm: Date.now()

  };



  const referencia = collection(

    db,

    "operacoes",

    operacaoId,

    "eventos"

  );



  await addDoc(

    referencia,

    eventoSeguro

  );


}





export function escutarEventos(

  operacaoId:string,

  callback:any

){


  const referencia = collection(

    db,

    "operacoes",

    operacaoId,

    "eventos"

  );



  const consulta = query(

    referencia,

    orderBy(

      "criadoEm",

      "desc"

    )

  );



  return onSnapshot(

    consulta,

    snapshot=>{


      const eventos = snapshot.docs.map(

        doc=>({

          id:doc.id,

          ...doc.data()

        })

      );


      callback(eventos);


    }

  );


}