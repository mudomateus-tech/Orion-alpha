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

import OrionHUD from "@/components/orion/OrionHUD";
import OrionTitle from "@/components/orion/OrionTitle";
import OrionPanel from "@/components/orion/OrionPanel";
import OrionButton from "@/components/orion/OrionButton";
import OrionAlert from "@/components/orion/OrionAlert";

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
      sessionStorage.getItem("agenteId");


    if(id){

      setJogadorId(id);

      sessionStorage.setItem(
        "agenteId",
        id
      );

    }

  },[jogadorParametro]);




  useEffect(()=>{

    async function atualizarGPS(){

      if(
        !operacaoId ||
        !jogadorId ||
        !operacao
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
          "Erro GPS:",
          error.message
        );

      }

    }


    atualizarGPS();


  },[
    operacaoId,
    jogadorId,
    operacao
  ]);




  useEffect(()=>{

    if(
      operacao?.status === "em andamento" &&
      operacaoId &&
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
        "Operação inválida."
      );

      return;

    }


    try{

      setMensagem(
        "Inicializando sistema..."
      );


      await iniciarOperacao(
        operacaoId
      );


      setMensagem(
        "Operação iniciada."
      );


    }
    catch(error:any){

      setMensagem(
        error.message ||
        "Erro ao iniciar."
      );

    }

  }



  const jogador =
    operacao?.jogadores?.find(
      (j:any)=>j.id === jogadorId
    );




  if(carregando){

    return (

      <main
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        "
      >

        Carregando sistema...

      </main>

    );

  }




  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        p-6
        relative
        overflow-hidden
      "
    >


      <OrionHUD
        jogador={jogador}
        operacao={operacao}
      />



      <div
        className="
          relative
          z-10
          max-w-md
          mx-auto
        "
      >


        <OrionTitle />



        <OrionPanel>

          <h2
            className="
              text-center
              text-zinc-400
              mb-3
            "
          >
            CÓDIGO DA OPERAÇÃO
          </h2>


          <h1
            className="
              text-5xl
              text-center
              font-black
              tracking-widest
            "
          >

            {codigo || operacao?.codigo}

          </h1>


        </OrionPanel>





        <div className="mt-6">

          <OrionPanel>

            <h2
              className="
                text-xl
                font-bold
                mb-4
              "
            >
              👥 AGENTES
            </h2>


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


          </OrionPanel>

        </div>





        {
          operacao?.jogadores?.[0]?.id === jogadorId &&

          <div className="mt-6">

            <OrionButton
              onClick={()=>

                router.push(
                  `/configurar?id=${operacaoId}`
                )

              }
            >

              ⚙️ CONFIGURAR MISSÕES

            </OrionButton>



            <div className="mt-3">

              <OrionButton
                onClick={iniciar}
              >

                🚀 INICIAR OPERAÇÃO

              </OrionButton>

            </div>


          </div>

        }





        {
          mensagem &&

          <div className="mt-5">

            <OrionAlert
              mensagem={mensagem}
              tipo="sucesso"
            />

          </div>

        }





        {
          erro &&

          <div className="mt-5">

            <OrionAlert
              mensagem={erro}
              tipo="erro"
            />

          </div>

        }



      </div>


    </main>

  );

}



export default function Lobby(){

  return (

    <Suspense

      fallback={

        <main
          className="
            min-h-screen
            bg-black
            text-white
            flex
            items-center
            justify-center
          "
        >

          Carregando...

        </main>

      }

    >

      <LobbyContent/>

    </Suspense>

  );

}