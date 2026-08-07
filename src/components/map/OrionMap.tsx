"use client";

import {
  calcularDistanciaGPS,
  calcularAngulo
} from "@/utils/geo";


interface OrionMapProps {

  operacao:any;

  jogador:any;

  modoFantasma?:boolean;

}



export default function OrionMap({

  operacao,

  jogador,

  modoFantasma = false

}:OrionMapProps){



if(
  !jogador ||
  !jogador.localizacao
){

  return (

    <div className="
      bg-black
      border
      border-cyan-400/30
      rounded-2xl
      p-10
      text-center
      text-cyan-300
    ">

      Aguardando sinal GPS...

    </div>

  );

}




const jogadores =
  operacao?.jogadores || [];


const missoes =
  operacao?.missoes || [];





function transformarRadar(

  distancia:number,

  angulo:number

){



  // RAIO IDEAL PARA CASA
  const distanciaMaxima = 15;



  const raio = Math.min(

    (distancia / distanciaMaxima) * 45,

    45

  );



  const radiano =

    (angulo - 90)

    *

    Math.PI

    /

    180;



  return {

    x:

      50 +

      Math.cos(radiano)

      *

      raio,



    y:

      50 +

      Math.sin(radiano)

      *

      raio

  };


}





function pontoAlvo(

  localizacao:any

){


  const distancia =

    calcularDistanciaGPS(

      jogador.localizacao,

      localizacao

    );



  const angulo =

    calcularAngulo(

      jogador.localizacao,

      localizacao

    );



  return transformarRadar(

    distancia,

    angulo

  );

}





function corJogador(j:any){


  if(j.papel === "infiltrado"){

    return "bg-red-500";

  }



  if(j.papel === "hacker"){

    return "bg-purple-400";

  }



  return "bg-cyan-400";

}





function iconeMissao(tipo:string){


  const mapa:any={

    cabos:"🔌",

    frequencia:"📡",

    codigo:"🧠",

    sequencia:"📶",

    reparo:"🔧"

  };


  return mapa[tipo] || "📍";

}





return (

<div className="

relative

w-full

max-w-xl

aspect-square

mx-auto

rounded-full

bg-black

border

border-cyan-400/40

overflow-hidden

shadow-[0_0_60px_rgba(0,255,255,0.35)]

">





<div className="

absolute

inset-10

rounded-full

border

border-cyan-400/20

"/>



<div className="

absolute

inset-24

rounded-full

border

border-cyan-400/20

"/>





<div className="

absolute

left-1/2

top-1/2

-translate-x-1/2

-translate-y-1/2

">

<div className="

w-8

h-8

rounded-full

bg-cyan-400

animate-pulse

shadow-[0_0_35px_rgba(0,255,255,1)]

"/>

</div>







{

jogadores

.filter(

(j:any)=>

j.id !== jogador.id &&

j.localizacao

)

.map((j:any)=>{


const pos =

pontoAlvo(

j.localizacao

);



return (

<div

key={j.id}

className="

absolute

w-7

h-7

rounded-full

border

border-white/40

-translate-x-1/2

-translate-y-1/2

"

style={{

left:`${pos.x}%`,

top:`${pos.y}%`

}}

>


<div className={

`

w-full

h-full

rounded-full

${corJogador(j)}

animate-pulse

`

}/>



</div>

);


})

}









{

missoes

.filter(

(m:any)=>m.localizacao

)

.map((m:any)=>{


const pos =

pontoAlvo(

m.localizacao

);



return (

<div

key={m.id}

className="

absolute

text-3xl

"

style={{

left:`${pos.x}%`,

top:`${pos.y}%`,

transform:

"translate(-50%,-50%)"

}}

>

{iconeMissao(m.tipo)}

</div>

);


})

}







<div className="

absolute

bottom-5

left-0

right-0

text-center

text-cyan-300

tracking-[0.3em]

text-xs

">

{

modoFantasma

?

"ORION // SPECTRAL"

:

"ORION // HOME RADAR"

}


</div>





</div>

);


}