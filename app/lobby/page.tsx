"use client";

import {
  Suspense,
  useEffect,
  useState
} from "react";

import {
  useSearchParams,
  useRouter
} from "next/navigation";

import {
  useOperation
} from "@/hooks/useOperation";

import Header from "@/components/Header";

import Card from "@/components/Card";

import Button from "@/components/Button";

import PlayerCard from "@/components/PlayerCard";

import {
  iniciarOperacao
} from "@/services/roleService";

import {
  obterLocalizacao,
  atualizarLocalizacaoJogador
} from "@/services/locationService";




function LobbyContent(){


  const params = useSearchParams();

  const router = useRouter();



  const operacaoId = params.get("id");

  const codigo = params.get("codigo");

  const jogadorParametro = params.get("jogador");




  const {
    operacao,
    carregando,
    erro
  } = useOperation(

    operacaoId

  );




  const [
    jogadorId,
    setJogadorId
  ] = useState("");



  const [
    mensagem,
    setMensagem
  ] = useState("");







  useEffect(()=>{


    const id =

      jogadorParametro ||

      sessionStorage.getItem(
        "agenteId"
      );



    if(id){


      setJogadorId(id);



      sessionStorage.setItem(

        "agenteId",

        id

      );


    }


  },[

    jogadorParametro

  ]);







  useEffect(()=>{


    async function pegarGPS(){


      if(

        !jogadorId ||

        !operacao ||

        !operacaoId

      ){

        return;

      }




      try{


        const posicao =

          await obterLocalizacao();




        await atualizarLocalizacaoJogador(

          operacaoId,

          jogadorId,

          posicao

        );



      }

      catch(error:any){


        console.log(

          "GPS:",

          error.message

        );


      }


    }




    pegarGPS();



  },[

    jogadorId,

    operacao,

    operacaoId

  ]);







  useEffect(()=>{


    if(

      operacao?.status === "em andamento"

      &&

      operacaoId

      &&

      jogadorId

    ){


      router.push(

        `/jogo?id=${operacaoId}&jogador=${jogadorId}`

      );


    }


  },[

    operacao,

    operacaoId,

    jogadorId,

    router

  ]);







  async function iniciar(){


    if(!operacaoId){


      setMensagem(

        "Operação não encontrada."

      );


      return;


    }



    try{


      setMensagem(

        "Iniciando operação..."

      );



      await iniciarOperacao(

        operacaoId

      );



      setMensagem(

        "Operação iniciada!"

      );


    }


    catch(error:any){


      setMensagem(

        error.message ||

        "Erro ao iniciar operação."

      );


    }


  }







  if(carregando){


    return (

      <main className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">

        Carregando operação...

      </main>

    );


  }







  return (

    <main className="
      min-h-screen
      bg-black
      text-white
      p-6
    ">



      <Header

        titulo="ORION"

        subtitulo="Lobby da operação"

      />





      <Card

        title="CÓDIGO DA OPERAÇÃO"

        className="max-w-md mx-auto text-center"

      >

        <h1 className="
          text-5xl
          font-black
          tracking-widest
        ">

          {codigo}

        </h1>


      </Card>






      <Card

        title="AGENTES CONECTADOS"

        className="
          max-w-md
          mx-auto
          mt-6
        "

      >


        <div className="
          flex
          flex-col
          gap-3
        ">


          {

            operacao?.jogadores?.map(

              (jogador:any)=>(

                <PlayerCard

                  key={jogador.id}

                  jogador={jogador}

                />

              )

            )

          }


        </div>


      </Card>








      {

        operacao?.jogadores?.[0]?.id === jogadorId &&


        <div className="
          max-w-md
          mx-auto
          mt-6
        ">


          <Button

            className="w-full"

            onClick={iniciar}

          >

            INICIAR OPERAÇÃO

          </Button>


        </div>


      }







      {

        mensagem &&

        <p className="
          text-yellow-400
          text-center
          mt-5
        ">

          {mensagem}

        </p>

      }







      {

        erro &&

        <p className="
          text-red-500
          text-center
          mt-5
        ">

          {erro}

        </p>

      }



    </main>

  );


}







export default function Lobby(){


  return (

    <Suspense

      fallback={

        <main className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        ">

          Carregando lobby...

        </main>

      }

    >

      <LobbyContent/>

    </Suspense>

  );


}