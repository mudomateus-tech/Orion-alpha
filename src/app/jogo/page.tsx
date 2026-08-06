"use client";

import {
  Suspense,
  useEffect,
  useState
} from "react";

import {
  useSearchParams
} from "next/navigation";

import {
  useOperation
} from "@/hooks/useOperation";

import {
  usePlayer
} from "@/hooks/usePlayer";

import {
  useLocationTracker
} from "@/hooks/useLocationTracker";

import {
  useVictory
} from "@/hooks/useVictory";

import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import OrionMap from "@/components/map/OrionMap";

import EliminationButton from "@/components/game/EliminationButton";

import GameHUD from "@/components/game/GameHUD";

import RoleHUD from "@/components/game/RoleHUD";

import TaskEngine from "@/components/tasks/TaskEngine";

import GhostModeButton from "@/components/game/GhostModeButton";

import GhostOverlay from "@/components/game/GhostOverlay";

import VictoryBanner from "@/components/victory/VictoryBanner";

import {
  criarMissoes
} from "@/services/mission";

import {
  concluirMissao
} from "@/services/actionService";

import {
  executarSabotagem
} from "@/services/sabotageService";

import {
  calcularDistancia
} from "@/utils/distance";



function JogoContent(){

  const params = useSearchParams();

  const operacaoId = params.get("id");

  const jogadorId = params.get("jogador");



  const { operacao } =
    useOperation(operacaoId);



  const { jogador } =
    usePlayer(
      operacaoId,
      jogadorId
    );



  const {
    finalizada,
    vencedor
  } = useVictory(operacaoId);



  useLocationTracker(
    operacaoId,
    jogadorId
  );



  const [
    mensagem,
    setMensagem
  ] = useState("");



  const [
    tarefaAtual,
    setTarefaAtual
  ] = useState<any>(null);



  const [
    modoFantasma,
    setModoFantasma
  ] = useState(false);



  const jogadorMorto =
    jogador?.status === "morto";





  useEffect(()=>{

    async function preparar(){

      if(
        operacaoId &&
        operacao &&
        (!operacao.missoes ||
        operacao.missoes.length === 0)
      ){

        await criarMissoes(
          operacaoId
        );

      }

    }


    preparar();


  },[
    operacao,
    operacaoId
  ]);





  async function abrirMissao(missao:any){

    if(jogadorMorto){

      setMensagem(
        "Você está eliminado."
      );

      return;

    }


    if(
      !jogador?.localizacao ||
      !missao?.localizacao
    ){

      setMensagem(
        "GPS indisponível."
      );

      return;

    }


    const distancia =
      calcularDistancia(

        jogador.localizacao.latitude,

        jogador.localizacao.longitude,

        missao.localizacao.latitude,

        missao.localizacao.longitude

      );



    if(distancia > 5){

      setMensagem(
        "Aproxime-se da missão. Distância: "
        + Math.round(distancia)
        + " metros."
      );

      return;

    }


    setTarefaAtual(missao);

  }






  async function concluirTarefa(){

    if(
      !operacaoId ||
      !jogadorId ||
      !tarefaAtual
    ){

      return;

    }


    await concluirMissao(

      operacaoId,

      jogadorId,

      tarefaAtual.id

    );


    setMensagem(
      "Missão concluída!"
    );


    setTarefaAtual(null);

  }






  async function sabotar(){

    if(
      !operacaoId ||
      !jogadorId
    ){

      return;

    }


    const resultado =
      await executarSabotagem(

        operacaoId,

        jogadorId

      );


    setMensagem(
      resultado.titulo
    );

  }





  if(!jogador){

    return (

      <main className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">

        Carregando agente...

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
        subtitulo="Operação em andamento"
      />



      {
        finalizada &&

        <VictoryBanner

          vencedor={vencedor}

        />

      }



      <GameHUD
        jogador={jogador}
        operacao={operacao}
      />



      <RoleHUD
        jogador={jogador}
        operacao={operacao}
      />



      <OrionMap

        operacao={operacao}

        jogador={jogador}

        modoFantasma={modoFantasma}

      />





      {
        jogadorMorto &&

        <GhostModeButton

          ativar={()=>setModoFantasma(true)}

        />

      }





      {
        modoFantasma &&

        jogadorMorto &&

        <GhostOverlay

          jogadores={
            operacao?.jogadores || []
          }

        />

      }





      {
        tarefaAtual &&

        <TaskEngine

          missao={tarefaAtual}

          concluir={concluirTarefa}

        />

      }






      {
        !jogadorMorto &&
        !tarefaAtual &&


        <Card title="MISSÕES">


          {

            operacao?.missoes?.map(

              (missao:any)=>(

                <div

                  key={missao.id}

                  className="
                    bg-zinc-800
                    p-4
                    rounded-xl
                    mb-3
                  "

                >

                  <h2>

                    🎯 {missao.titulo}

                  </h2>



                  <p>

                    {missao.descricao}

                  </p>



                  <Button

                    onClick={()=>abrirMissao(missao)}

                  >

                    EXECUTAR

                  </Button>


                </div>

              )

            )

          }


        </Card>


      }






      {
        jogador.papel === "infiltrado" &&
        !jogadorMorto &&


        <Card title="SABOTAGEM">


          <Button

            variant="danger"

            onClick={sabotar}

          >

            SABOTAR SISTEMA


          </Button>


        </Card>


      }







      {
        jogador.papel === "infiltrado" &&
        !jogadorMorto &&


        <EliminationButton

          operacaoId={operacaoId}

          jogadorId={jogadorId}

          jogadores={
            operacao?.jogadores || []
          }

        />


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





    </main>

  );

}






export default function Jogo(){


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

          Carregando jogo...

        </main>

      }

    >

      <JogoContent/>

    </Suspense>

  );

}