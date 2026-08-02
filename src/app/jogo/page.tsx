"use client";

import { useSearchParams } from "next/navigation";

import {
  useState,
  useEffect
} from "react";

import {
  useOperation
} from "@/hooks/useOperation";

import {
  usePlayer
} from "@/hooks/usePlayer";

import {
  useLocationTracker
} from "@/hooks/useLocationTracker";

import Header from "@/components/ui/Header";

import OrionMap from "@/components/map/OrionMap";

import GameHUD from "@/components/game/GameHUD";

import RoleHUD from "@/components/game/RoleHUD";

import TaskEngine from "@/components/tasks/TaskEngine";

import Card from "@/components/ui/Card";

import Button from "@/components/ui/Button";

import {
  criarMissoes
} from "@/services/mission";

import {
  concluirMissao
} from "@/services/actionService";



export default function Jogo(){


  const params = useSearchParams();


  const operacaoId =
    params.get("id");


  const jogadorId =
    params.get("jogador");



  const {
    operacao
  } = useOperation(
    operacaoId
  );



  const {
    jogador
  } = usePlayer(
    operacaoId,
    jogadorId
  );



  useLocationTracker(
    operacaoId,
    jogadorId
  );



  const [
    tarefaAtual,
    setTarefaAtual
  ] = useState<any>(null);



  const [
    mensagem,
    setMensagem
  ] = useState("");





  useEffect(()=>{


    async function iniciar(){


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


    iniciar();


  },[

    operacao,

    operacaoId

  ]);







  async function concluirTarefa(){


    await concluirMissao(

      operacaoId!,

      jogadorId!,

      tarefaAtual.id

    );


    setMensagem(
      "✅ Missão concluída!"
    );


    setTarefaAtual(null);


  }







  if(!jogador){


    return (

      <main className="min-h-screen bg-black text-green-400 flex items-center justify-center">

        Carregando agente...

      </main>

    );

  }






  return (

    <main className="min-h-screen bg-black text-white p-6">


      <Header

        titulo="ORION"

        subtitulo="Operação em andamento"

      />



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

      />





      {

        tarefaAtual &&

        (

          <TaskEngine

            missao={tarefaAtual}

            concluir={concluirTarefa}

          />

        )

      }





      {

        !tarefaAtual &&

        (

          <Card title="MISSÕES">


            {

              operacao?.missoes?.map(

                (missao:any)=>(


                  <div

                    key={missao.id}

                    className="bg-zinc-900 p-4 rounded-xl mb-3"

                  >


                    <h2 className="font-bold">

                      🎯 {missao.titulo}

                    </h2>


                    <p>

                      {missao.descricao}

                    </p>



                    <Button

                      onClick={()=>setTarefaAtual(missao)}

                    >

                      EXECUTAR

                    </Button>


                  </div>


                )

              )

            }


          </Card>

        )

      }





      {

        mensagem &&

        <p className="text-yellow-400 text-center mt-4">

          {mensagem}

        </p>

      }



    </main>

  );


}