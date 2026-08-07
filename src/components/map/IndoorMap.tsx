"use client";

interface PlayerPosition {

  id: string;

  nome: string;

  x: number;

  y: number;

  status?: string;

}

interface IndoorMapProps {

  jogadores?: PlayerPosition[];

  missoes?: any[];

}

export default function IndoorMap({

  jogadores = [],

  missoes = []

}: IndoorMapProps) {

  return (

    <div

      className="
        relative
        w-full
        h-[500px]
        rounded-3xl
        overflow-hidden
        border
        border-cyan-400/30
        bg-black
        shadow-[0_0_40px_rgba(0,220,255,0.25)]
      "

    >

      <div

        className="
          absolute
          inset-0
          opacity-20
          bg-[linear-gradient(#00ffff_1px,transparent_1px),linear-gradient(90deg,#00ffff_1px,transparent_1px)]
          bg-[size:40px_40px]
        "

      />

      {missoes.map((missao: any) => (

        <div

          key={missao.id}

          className="
            absolute
            w-6
            h-6
            rounded-full
            bg-yellow-400
            shadow-[0_0_20px_#ffff00]
          "

          style={{

            left: `${missao.x}%`,

            top: `${missao.y}%`

          }}

        />

      ))}

      {jogadores.map((jogador) => (

        <div

          key={jogador.id}

          className={`
            absolute
            w-5
            h-5
            rounded-full
            ${
              jogador.status === "morto"
                ? "bg-red-500 shadow-[0_0_20px_red]"
                : "bg-cyan-400 shadow-[0_0_20px_cyan]"
            }
          `}

          style={{

            left: `${jogador.x}%`,

            top: `${jogador.y}%`

          }}

        />

      ))}

      <div

        className="
          absolute
          bottom-4
          left-4
          text-xs
          tracking-widest
          text-cyan-300
        "

      >

        ORION // HOUSE MAP

      </div>

    </div>

  );

}