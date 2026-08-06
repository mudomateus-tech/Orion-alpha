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
        shadow-[0_0_30px_rgba(0,255,255,0.2)]
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

    const raio =
      Math.min(
        distancia / 100 * 45,
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
        Math.cos(radiano) *
        raio,


      y:
        50 +
        Math.sin(radiano) *
        raio

    };

  }





  function pontoAlvo(
    localizacao:any
  ){

    return transformarRadar(

      calcularDistanciaGPS(
        jogador.localizacao,
        localizacao
      ),

      calcularAngulo(
        jogador.localizacao,
        localizacao
      )

    );

  }





  function dadosJogador(j:any){

    if(
      j.papel === "infiltrado"
    ){

      return {

        cor:
        "bg-red-500 shadow-[0_0_30px_rgba(255,0,0,1)]",

        tag:
        "INTRUSO"

      };

    }



    if(
      j.papel === "hacker"
    ){

      return {

        cor:
        "bg-purple-400 shadow-[0_0_30px_rgba(180,0,255,1)]",

        tag:
        "HACKER"

      };

    }



    return {

      cor:
      "bg-cyan-400 shadow-[0_0_30px_rgba(0,255,255,1)]",

      tag:
      "AGENTE"

    };

  }





  function iconeMissao(
    tipo:string
  ){

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


      {
        modoFantasma &&

        <div className="

          absolute

          inset-0

          bg-cyan-400/5

          animate-pulse

        "/>

      }





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
        top-0
        bottom-0
        w-px
        bg-cyan-400/20
      "/>


      <div className="
        absolute
        top-1/2
        left-0
        right-0
        h-px
        bg-cyan-400/20
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

        .map(

          (j:any)=>{


            const pos =
              pontoAlvo(
                j.localizacao
              );


            const dados =
              dadosJogador(j);



            return (

              <div

                key={j.id}

                className="
                  absolute
                  -translate-x-1/2
                  -translate-y-1/2
                "

                style={{

                  left:`${pos.x}%`,

                  top:`${pos.y}%`

                }}

              >


                <div className={`

                  w-7

                  h-7

                  rounded-full

                  ${dados.cor}

                  animate-pulse

                  border

                  border-white/30

                `}/>



                {
                  modoFantasma &&

                  <div className="

                    mt-2

                    bg-black/90

                    border

                    border-cyan-400/40

                    rounded-lg

                    px-3

                    py-2

                    text-center

                    text-xs

                    text-white

                    whitespace-nowrap

                    shadow-[0_0_20px_rgba(0,255,255,0.4)]

                  ">

                    <strong>

                      {j.nome}

                    </strong>


                    <br/>


                    <span className="text-cyan-300">

                      {dados.tag}

                    </span>


                  </div>

                }


              </div>

            );

          }

        )

      }








      {
        missoes

        .filter(

          (m:any)=>

            m.localizacao

        )

        .map(

          (m:any)=>{


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

                  drop-shadow-[0_0_10px_cyan]

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


          }

        )

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

          "ORION // SPECTRAL VISION"

          :

          "ORION // TACTICAL RADAR"

        }


      </div>



    </div>

  );

}