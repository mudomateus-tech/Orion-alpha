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



export function useVictory(

  operacaoId:string | null

){


  const [

    finalizada,

    setFinalizada

  ] = useState(false);



  const [

    vencedor,

    setVencedor

  ] = useState<string | null>(null);






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


        if(!snapshot.exists()){

          return;

        }



        const dados:any =

          snapshot.data();





        if(

          dados.status === "finalizada"

        ){

          setFinalizada(true);



          setVencedor(

            dados.vencedor ?? null

          );


        }



      }

    );






    return ()=>{

      cancelar();

    };



  },[

    operacaoId

  ]);







  return {

    finalizada,

    vencedor

  };


}