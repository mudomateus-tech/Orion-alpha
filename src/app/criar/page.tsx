"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import OrionHomeHUD from "@/components/orion/OrionHomeHUD";
import OrionTitle from "@/components/orion/OrionTitle";
import OrionPanel from "@/components/orion/OrionPanel";
import OrionButton from "@/components/orion/OrionButton";
import OrionAlert from "@/components/orion/OrionAlert";

import { criarOperacao } from "@/services/operationService";

export default function Criar() {

  const router = useRouter();

  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function criar() {

    try {

      setCarregando(true);
      setErro("");

      if (!nome.trim()) {
        throw new Error("Digite seu nome.");
      }

      const jogadorId =
        Date.now().toString() +
        Math.random().toString(36).substring(2);

      const resultado = await criarOperacao(
        "Operação ORION",
        jogadorId,
        nome.trim()
      );

      sessionStorage.setItem(
        "agenteId",
        jogadorId
      );

      router.push(
        `/lobby?id=${resultado.id}&codigo=${resultado.codigo}&jogador=${jogadorId}`
      );

    } catch (error: any) {

      console.error(error);
      setErro(error.message);

    } finally {

      setCarregando(false);

    }

  }

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        p-6
        relative
        overflow-hidden
      "
    >

      <OrionHomeHUD />

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
        "
      >

        <OrionTitle />

        <OrionPanel>

          <h2
            className="
              text-center
              text-2xl
              font-bold
              mb-6
            "
          >
            COMANDANTE
          </h2>

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do comandante"
            className="
              w-full
              bg-zinc-950
              border
              border-zinc-700
              rounded-xl
              p-4
              mb-5
              outline-none
              text-white
            "
          />

          <OrionButton onClick={criar}>
            {carregando
              ? "INICIANDO SISTEMA..."
              : "CRIAR OPERAÇÃO"}
          </OrionButton>

          {erro && (
            <div className="mt-5">
              <OrionAlert
                mensagem={erro}
                tipo="erro"
              />
            </div>
          )}

        </OrionPanel>

      </div>

    </main>

  );

}