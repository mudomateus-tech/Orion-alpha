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



export function useOperation(

  operacaoId:string | null

){


  const [

    operacao,

    setOperacao

  ] = useState<any>(null);




  useEffect(()=>{


    if(!operacaoId){

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


          const dados = {

            id:snapshot.id,

            ...snapshot.data()

          };



          console.log(

            "OPERAÇÃO ATUALIZADA:",

            dados

          );



          setOperacao(

            dados

          );


        }


      },

      (erro)=>{


        console.error(

          "ERRO FIREBASE:",

          erro

        );


      }


    );




    return ()=>cancelar();



  },[

    operacaoId

  ]);





  return {

    operacao,

    carregando:false,

    erro:null

  };


}