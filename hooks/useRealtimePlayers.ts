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



export function useRealtimePlayers(

  operacaoId:string|null

){



  const [

    jogadores,

    setJogadores

  ] = useState<any[]>([]);







  useEffect(()=>{



    if(

      !operacaoId

    ){

      return;

    }





    const referencia =

      doc(

        db,

        "operacoes",

        operacaoId

      );







    const cancelar =

      onSnapshot(

        referencia,

        (snapshot)=>{



          if(

            snapshot.exists()

          ){



            const dados:any =

              snapshot.data();




            setJogadores(

              dados.jogadores || []

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

    jogadores

  };


}