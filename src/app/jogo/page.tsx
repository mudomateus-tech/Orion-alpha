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
useVictory
} from "@/hooks/useVictory";

import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import IndoorMap from "@/components/map/IndoorMap";

import MovementController from "@/components/game/MovementController";

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



function JogoContent(){

const params = useSearchParams();

const operacaoId = params.get("id");

const jogadorId = params.get("jogador");



const {
operacao
} = useOperation(operacaoId);



const {
jogador
} = usePlayer(
operacaoId,
jogadorId
);



const {
finalizada,
vencedor
} = useVictory(operacaoId);



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



const [
posicao,
setPosicao
] = useState({

x:50,

y:50

});



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





function moverJogador(
dx:number,
dy:number
){

setPosicao((atual)=>({

x:Math.max(
0,
Math.min(
100,
atual.x + dx
)
),

y:Math.max(
0,
Math.min(
100,
atual.y + dy
)
)

}));

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



const jogadorMapa = {

id:jogador.id,

nome:jogador.nome,

x:posicao.x,

y:posicao.y,

status:jogador.status

};



return (

<main className="
min-h-screen
bg-black
text-white
p-6
pb-40
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





<IndoorMap


jogadores={[

jogadorMapa,

...(operacao?.jogadores || [])

.filter(
(j:any)=>
j.id !== jogador.id
)
.map((j:any)=>({

id:j.id,

nome:j.nome,

x:j.x ?? 50,

y:j.y ?? 50,

status:j.status

}))

]}


missoes={

operacao?.missoes || []

}


/>





<MovementController

onMove={moverJogador}

/>





{
modoFantasma &&

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

onClick={()=>setTarefaAtual(missao)}

>

EXECUTAR

</Button>


</div>


)

)

}


</Card>





{
jogador.papel === "infiltrado" &&


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