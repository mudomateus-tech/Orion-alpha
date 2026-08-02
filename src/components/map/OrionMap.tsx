"use client";

import {
  calcularDistanciaGPS,
  calcularAngulo
} from "@/utils/geo";


interface OrionMapProps {

  operacao:any;

  jogador:any;

}



export default function OrionMap({

  operacao,

  jogador

}:OrionMapProps){



  if(

    !jogador ||

    !jogador.localizacao

  ){

    return (

      <div

        className="
        bg-black
        border
        border-green-500/30
        rounded-2xl
        p-10
        text-center
        text-green-400
        "

      >

        Aguardando sinal GPS...

      </div>

    );

  }






  const jogadores =

    operacao?.jogadores || [];



  const missoes =

    operacao?.missoes || [];



  const direcao =

    jogador.localizacao.direcao ?? 0;







  function transformarRadar(

    distancia:number,

    angulo:number

  ){


    const alcanceMaximo =

      100;



    const raio =

      Math.min(

        distancia /

        alcanceMaximo *

        45,

        45

      );



    const radiano =

      (angulo - 90)

      *

      Math.PI /

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








  function iconeMissao(tipo:string){


    switch(tipo){

      case "cabos":

        return "🔌";


      case "frequencia":

        return "📡";


      case "codigo":

        return "🧠";


      case "sequencia":

        return "📶";


      case "reparo":

        return "🔧";


      default:

        return "📍";

    }


  }
   return (

    <div

      className="
      relative
      w-full
      max-w-xl
      aspect-square
      mx-auto
      rounded-full
      bg-black
      border
      border-green-500/40
      overflow-hidden
      shadow-[0_0_40px_rgba(0,255,100,0.2)]
      "

    >





      {/* BÚSSOLA */}

      <div

        className="
        absolute
        top-6
        left-1/2
        -translate-x-1/2
        z-20
        "

      >

        <div

          className="
          bg-zinc-900
          border
          border-green-500/40
          rounded-full
          w-20
          h-20
          flex
          items-center
          justify-center
          text-4xl
          shadow-[0_0_20px_rgba(0,255,100,0.3)]
          "

          style={{

            transform:

              `rotate(${direcao}deg)`

          }}

        >

          🧭

        </div>


      </div>








      <div

        className="
        absolute
        inset-10
        rounded-full
        border
        border-green-500/20
        "

      />



      <div

        className="
        absolute
        inset-24
        rounded-full
        border
        border-green-500/20
        "

      />






      <div

        className="
        absolute
        left-1/2
        top-0
        bottom-0
        w-px
        bg-green-500/20
        "

      />



      <div

        className="
        absolute
        top-1/2
        left-0
        right-0
        h-px
        bg-green-500/20
        "

      />









      {/* VOCÊ */}

      <div

        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        "

      >

        <div

          className="
          w-8
          h-8
          rounded-full
          bg-green-400
          animate-pulse
          shadow-[0_0_25px_rgba(0,255,100,1)]
          "

        />

      </div>









      {/* JOGADORES */}

      {

        jogadores

        .filter(

          (j:any)=>

            j.id !== jogador.id &&

            j.status !== "morto" &&

            j.localizacao

        )

        .map(

          (j:any)=>(


            (()=>{


              const pos =

                pontoAlvo(

                  j.localizacao

                );



              let cor =

                "bg-blue-400 shadow-[0_0_15px_rgba(0,150,255,1)]";



              if(j.papel === "hacker"){

                cor =

                "bg-purple-400 shadow-[0_0_15px_rgba(180,0,255,1)]";

              }



              if(

                j.papel === "infiltrado" &&

                jogador.papel === "infiltrado"

              ){

                cor =

                "bg-red-500 shadow-[0_0_15px_rgba(255,0,0,1)]";

              }



              return (

                <div

                  key={j.id}

                  className={`
                  absolute
                  w-5
                  h-5
                  rounded-full
                  ${cor}
                  `}

                  style={{

                    left:`${pos.x}%`,

                    top:`${pos.y}%`

                  }}

                />

              );


            })()


          )

        )

      }









      {/* MISSÕES */}

      {

        missoes

        .filter(

          (m:any)=>

            m.localizacao

        )

        .map(

          (m:any)=>(


            (()=>{


              const pos =

                pontoAlvo(

                  m.localizacao

                );



              const distancia =

                calcularDistanciaGPS(

                  jogador.localizacao,

                  m.localizacao

                );



              return (

                <div

                  key={m.id}

                  className={`
                  absolute
                  text-3xl
                  ${distancia <= 5 ? "animate-pulse scale-125" : ""}
                  `}

                  style={{

                    left:`${pos.x}%`,

                    top:`${pos.y}%`,

                    transform:"translate(-50%,-50%)"

                  }}

                >

                  {iconeMissao(m.tipo)}

                </div>

              );


            })()


          )

        )

      }










      <div

        className="
        absolute
        bottom-5
        left-0
        right-0
        text-center
        text-green-400
        tracking-widest
        text-sm
        "

      >

        ORION TACTICAL RADAR

      </div>




    </div>

  );


} 