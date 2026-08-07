"use client";

import { Localizacao } from "@/types/Player";

interface PlayerPosition {
  id: string;
  nome: string;
  x: number;
  y: number;
  status?: string;
}

interface Mission {
  id: string;
  titulo?: string;
  localizacao?: Localizacao;
}

interface IndoorMapProps {
  jogadores?: PlayerPosition[];
  missoes?: Mission[];
}

export default function IndoorMap({

  jogadores = [],

  missoes = []

}: IndoorMapProps) {

  function converter(localizacao?: Localizacao) {

    if (!localizacao) {

      return {

        x: 50,

        y: 50

      };

    }

    return {

      x: 50 + (localizacao.longitude * 100),

      y: 50 - (localizacao.latitude * 100)

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

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >

        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          fill="none"
          stroke="#00ffff"
          strokeWidth=".4"
        />

        <line x1="35" y1="3" x2="35" y2="42" stroke="#00ffff" strokeWidth=".35"/>
        <line x1="68" y1="3" x2="68" y2="42" stroke="#00ffff" strokeWidth=".35"/>
        <line x1="3" y1="42" x2="97" y2="42" stroke="#00ffff" strokeWidth=".35"/>
        <line x1="28" y1="42" x2="28" y2="97" stroke="#00ffff" strokeWidth=".35"/>
        <line x1="72" y1="42" x2="72" y2="97" stroke="#00ffff" strokeWidth=".35"/>

      </svg>

      {missoes.map((m) => {

        const pos = converter(m.localizacao);

        return (

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
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%,-50%)"
            }}
          />

        );

      })}

      {jogadores.map((j) => (

        <div
          key={j.id}
          className="absolute"
          style={{
            left: `${j.x}%`,
            top: `${j.y}%`,
            transform: "translate(-50%,-50%)"
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
                j.status === "morto"
                  ? "bg-red-500 shadow-[0_0_20px_red]"
                  : "bg-cyan-400 shadow-[0_0_20px_cyan]"
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
            {j.nome}
          </div>

        </div>

      ))}

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