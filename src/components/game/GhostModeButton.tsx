"use client";


interface Props {

  ativar:()=>void;

}



export default function GhostModeButton({

  ativar

}:Props){


  return (

    <button

      onClick={ativar}

      className="

        w-full

        mt-4

        rounded-xl

        border

        border-cyan-400

        bg-black

        p-4

        text-cyan-300

        font-black

        tracking-[0.25em]

        shadow-[0_0_25px_rgba(0,255,255,0.4)]

        hover:bg-cyan-400/10

        transition

      "

    >

      👻 ATIVAR MODO FANTASMA

    </button>

  );

}