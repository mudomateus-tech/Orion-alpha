"use client";

import {
  useSearchParams,
  useRouter
} from "next/navigation";

import {
  useEffect,
  useState
} from "react";

import {
  doc,
  getDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  salvarLocalMissao
} from "@/services/missionLocationService";

import Header from "@/components/ui/Header";

import Card from "@/components/ui/Card";

import Button from "@/components/ui/Button";



export default function Configurar(){


  const params = useSearchParams();

  const router = useRouter();


  const operacaoId =

    params.get("id");



  const [

    operacao,

    setOperacao

  ] = useState<any>(null);



  const [

    mensagem,

    setMensagem

  ] = useState("");





  useEffect(()=>{


    async function carregar(){


      if(!operacaoId){

        return;

      }


      const referencia = doc(

        db,

        "operacoes",

        operacaoId

      );


      const snapshot = await getDoc(

        referencia

      );


      if(snapshot.exists()){


        setOperacao({

          id:snapshot.id,

          ...snapshot.data()

        });


      }


    }


    carregar();


  },[operacaoId]);







  async function escolherLocal(

    missao:any

  ){


    if(!navigator.geolocation){


      setMensagem(

        "GPS não disponível"

      );


      return;

    }





    navigator.geolocation.getCurrentPosition(

      async(position)=>{


        const localizacao = {


          latitude:

            position.coords.latitude,


          longitude:

            position.coords.longitude


        };



        await salvarLocalMissao(

          operacaoId!,

          missao.id,

          localizacao

        );



        setMensagem(

          `📍 Local definido para ${missao.titulo}`

        );



      }

    );



  }






  if(!operacao){


    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        Carregando configuração...

      </main>

    );


  }








  return (

    <main className="min-h-screen bg-black text-white p-6">


      <Header

        titulo="ORION"

        subtitulo="Configuração do comandante"

      />





      <Card

        title="PONTOS DE MISSÃO"

      >


        <div className="flex flex-col gap-4">


          {

            operacao.missoes?.map(

              (missao:any)=>(


                <div

                  key={missao.id}

                  className="bg-zinc-800 p-4 rounded-xl"

                >


                  <h2 className="font-bold">

                    🎯 {missao.titulo}

                  </h2>



                  <p>

                    {

                      missao.localizacao

                      ?

                      "✅ Local configurado"

                      :

                      "❌ Sem localização"

                    }

                  </p>



                  <Button

                    onClick={()=>escolherLocal(missao)}

                  >

                    DEFINIR LOCAL AQUI

                  </Button>


                </div>


              )

            )

          }


        </div>


      </Card>





      {

        mensagem &&


        <p className="text-yellow-400 text-center mt-5">

          {mensagem}

        </p>


      }






      <Button

        className="w-full mt-6"

        onClick={()=>router.back()}

      >

        VOLTAR

      </Button>



    </main>

  );


}