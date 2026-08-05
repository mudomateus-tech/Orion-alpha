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

import type {
  Operacao
} from "@/types/Operation";




export function useOperation(

  operacaoId: string | null

){


  const [

    operacao,

    setOperacao

  ] = useState<Operacao | null>(null);




  const [

    carregando,

    setCarregando

  ] = useState(true);




  const [

    erro,

    setErro

  ] = useState("");






  useEffect(()=>{


    if(!operacaoId){


      setCarregando(false);

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


          setOperacao({

            id: snapshot.id,

            ...snapshot.data()

          } as Operacao);



          setErro("");


        }

        else{


          setErro(

            "Operação não encontrada."

          );


        }




        setCarregando(false);



      },

      ()=>{


        setErro(

          "Erro ao sincronizar operação."

        );


        setCarregando(false);



      }


    );






    return ()=>cancelar();




  },[operacaoId]);






  return {

    operacao,

    carregando,

    erro

  };


}