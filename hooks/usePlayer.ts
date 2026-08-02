"use client";

import {
  useEffect,
  useState
} from "react";

import {
  doc,
  onSnapshot
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { Jogador } from "@/types/player";



export function usePlayer(

  operacaoId:string | null,

  jogadorId:string | null

){



  const [

    jogador,

    setJogador

  ] = useState<Jogador | null>(null);




  const [

    carregando,

    setCarregando

  ] = useState(true);




  const [

    erro,

    setErro

  ] = useState("");








  useEffect(()=>{



    if(

      !operacaoId ||

      !jogadorId

    ){

      setCarregando(false);

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

            !snapshot.exists()

          ){

            setErro(

              "Operação não encontrada."

            );


            setCarregando(false);


            return;

          }








          const dados:any =

            snapshot.data();








          const encontrado =

            dados.jogadores?.find(



              (j:Jogador)=>

                j.id === jogadorId



            );








          if(

            encontrado

          ){



            setJogador(

              encontrado

            );


            setErro("");



          }

          else{



            setErro(

              "Jogador não encontrado."

            );


          }








          setCarregando(false);




        },



        ()=>{



          setErro(

            "Erro ao carregar jogador."

          );



          setCarregando(false);



        }



      );







    return ()=>cancelar();





  },[

    operacaoId,

    jogadorId

  ]);







  return {


    jogador,


    carregando,


    erro



  };



}