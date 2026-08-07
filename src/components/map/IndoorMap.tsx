"use client";

import {
  Localizacao
} from "@/types/Player";


interface PlayerPosition {

  id:string;

  nome:string;

  x:number;

  y:number;

  status?:string;

}



interface Mission {

  id:string;

  titulo?:string;

  localizacao?:Localizacao;

}



interface SalaMapa {

  id:string;

  nome:string;

  x:number;

  y:number;

  largura:number;

  altura:number;

}



interface IndoorMapProps {

  jogadores?:PlayerPosition[];

  missoes?:Mission[];

  salas?:SalaMapa[];

}





export default function IndoorMap({

  jogadores = [],

  missoes = [],

  salas = []

}:IndoorMapProps){



function converter(

  localizacao?:Localizacao

){


  if(!localizacao){

    return {

      x:50,

      y:50

    };

  }



  return {

    x:50 + (localizacao.longitude * 100),

    y:50 - (localizacao.latitude * 100)

  };


}




return (

<div

className="
relative
w-full
h-[600px]
rounded-3xl
overflow-hidden
bg-[#05070d]
border
border-cyan-400/30
shadow-[0_0_50px_rgba(0,255,255,.18)]
"

>


<div

className="
absolute
inset-0
bg-[radial-gradient(circle_at_center,rgba(0,255,255,.05),transparent_70%)]
"

/>





{/* SALAS DO EDITOR */}


{

salas.map((sala)=>(


<div

key={sala.id}

className="
absolute
border
border-cyan-400/50
bg-cyan-400/10
rounded-xl
flex
items-center
justify-center
text-[10px]
text-cyan-200
tracking-widest
"

style={{

left:`${sala.x}%`,

top:`${sala.y}%`,

width:`${sala.largura}%`,

height:`${sala.altura}%`

}}

>


{sala.nome}


</div>


))


}






{/* MISSÕES */}


{

missoes.map((m)=>(


<div

key={m.id}

className="
absolute
w-6
h-6
rounded-full
bg-yellow-400
border
border-yellow-200
animate-pulse
shadow-[0_0_20px_rgba(255,255,0,.9)]
"

style={

(()=>{


const pos = converter(

m.localizacao

);


return {

left:`${pos.x}%`,

top:`${pos.y}%`,

transform:"translate(-50%,-50%)"

};


})()

}

/>


))


}






{/* JOGADORES */}


{

jogadores.map((jogador)=>(


<div

key={jogador.id}

className="absolute"

style={{

left:`${jogador.x}%`,

top:`${jogador.y}%`,

transform:"translate(-50%,-50%)"

}}

>



<div

className={`

w-5

h-5

rounded-full

border

border-white

${

jogador.status === "morto"

?

"bg-red-500 shadow-[0_0_20px_red]"

:

"bg-cyan-400 shadow-[0_0_20px_cyan]"

}

`}

/>



<div

className="
mt-1
text-[10px]
text-center
text-cyan-200
whitespace-nowrap
"

>

{jogador.nome}

</div>



</div>


))


}







{/* CENTRO DO RADAR */}



<div

className="
absolute
left-1/2
top-1/2
-translate-x-1/2
-translate-y-1/2
w-2
h-2
rounded-full
bg-cyan-300
animate-ping
"

/>







<div

className="
absolute
bottom-4
left-4
text-xs
tracking-[0.35em]
text-cyan-300
"

>

ORION • INDOOR TACTICAL MAP

</div>





</div>

);


}