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



export function useAgentProfile(

  jogadorId:string | null

){


  const [

    perfil,

    setPerfil

  ] = useState<any>(null);





  useEffect(()=>{


    if(!jogadorId){

      return;

    }





    const referencia = doc(

      db,

      "agentes",

      jogadorId

    );





    const cancelar = onSnapshot(

      referencia,

      (snapshot)=>{


        if(!snapshot.exists()){

          setPerfil(null);

          return;

        }





        setPerfil(

          snapshot.data()

        );


      }

    );





    return ()=>{

      cancelar();

    };



  },[

    jogadorId

  ]);





  return perfil;


}