"use client";

import type { Jogador } from "@/types/Player";

interface PlayerCardProps {
  jogador: Jogador;
}

export default function PlayerCard({
  jogador
}: PlayerCardProps) {

  return (
    <div
      className="
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-4
        flex
        items-center
        justify-between
      "
    >

      <div>

        <h3
          className="
            text-white
            font-bold
            text-lg
          "
        >
          {jogador.nome}
        </h3>


        <p
          className="
            text-zinc-400
            text-sm
          "
        >
          {jogador.tipo === "comandante"
            ? "👑 Comandante"
            : "🛰️ Agente"
          }
        </p>

      </div>


      <div>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-bold

            ${
              jogador.conectado
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }
          `}
        >
          {jogador.conectado
            ? "ONLINE"
            : "OFFLINE"
          }
        </span>

      </div>

    </div>
  );
}