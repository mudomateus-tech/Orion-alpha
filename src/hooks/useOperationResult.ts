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



export function useOperationResult(

  operacaoId:string | null

){


  const [

    resultado,

    setResultado

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


        if(!snapshot.exists()){

          return;

        }





        const dados:any =

          snapshot.data();





        if(

          dados.status !== "finalizada"

        ){

          return;

        }





        const jogadores =

          dados.jogadores || [];





        const eliminados =

          jogadores.filter(

            (j:any)=>

              j.status === "morto"

          );





        const vivos =

          jogadores.filter(

            (j:any)=>

              j.status !== "morto"

          );





        setResultado({

          vencedor:

            dados.vencedor ?? null,


          jogadores,


          vivos,


          eliminados,


          missoes:

            dados.missoes ?? [],


          eventos:

            dados.eventos ?? [],


          criadaEm:

            dados.criadaEm ?? null,


          finalizadaEm:

            dados.finalizadaEm ?? Date.now()

        });


      }

    );





    return ()=>{

      cancelar();

    };



  },[

    operacaoId

  ]);





  return resultado;


}