"use client";

import {
  useEffect,
  useState
} from "react";

import {
  doc,
  onSnapshot
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";


export function usePlayer(

  operacaoId:string | null,

  jogadorId:string | null

){

  const [jogador,setJogador] = useState<any>(null);


  useEffect(()=>{

    if(
      !operacaoId ||
      !jogadorId
    ){
      return;
    }


    const referencia = doc(

      db,

      "operacoes",

      operacaoId

    );


    const cancelar = onSnapshot(

      referencia,

      (snapshot)=>{

        if(snapshot.exists()){


          const dados:any = snapshot.data();


          const encontrado =

            dados.jogadores?.find(

              (j:any)=>

                j.id === jogadorId

            );


          setJogador(

            encontrado || null

          );


        }

      }

    );


    return ()=>cancelar();


  },[

    operacaoId,

    jogadorId

  ]);


  return {

    jogador

  };

}