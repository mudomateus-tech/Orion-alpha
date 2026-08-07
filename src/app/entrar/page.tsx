"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import OrionHomeHUD from "@/components/orion/OrionHomeHUD";
import OrionTitle from "@/components/orion/OrionTitle";
import OrionPanel from "@/components/orion/OrionPanel";
import OrionButton from "@/components/orion/OrionButton";
import OrionAlert from "@/components/orion/OrionAlert";

import { entrarPorCodigo } from "@/services/joinByCode";

export default function Entrar() {

  const router = useRouter();

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function entrar() {

    try {

      setCarregando(true);
      setErro("");

      if (!nome.trim() || !codigo.trim()) {
        throw new Error("Preencha todos os campos.");
      }

      let jogadorId = sessionStorage.getItem("agenteId");

      if (!jogadorId) {

        jogadorId =
          Date.now().toString() +
          Math.random().toString(36).substring(2);

        sessionStorage.setItem(
          "agenteId",
          jogadorId
        );

      }

      const resultado = await entrarPorCodigo(
        codigo.trim().toUpperCase(),
        jogadorId,
        nome.trim()
      );

      sessionStorage.setItem(
        "agenteId",
        resultado.jogadorId
      );

      router.push(
        `/lobby?id=${resultado.operacaoId}&codigo=${resultado.codigo}&jogador=${resultado.jogadorId}`
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
            AGENTE
          </h2>

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="
              w-full
              bg-zinc-950
              border
              border-zinc-700
              rounded-xl
              p-4
              mb-4
              outline-none
              text-white
            "
          />

          <input
            value={codigo}
            onChange={(e) =>
              setCodigo(
                e.target.value.toUpperCase()
              )
            }
            placeholder="Código da operação"
            className="
              w-full
              bg-zinc-950
              border
              border-zinc-700
              rounded-xl
              p-4
              mb-5
              uppercase
              outline-none
              text-white
            "
          />

          <OrionButton
            onClick={entrar}
            disabled={carregando}
          >
            {carregando
              ? "CONECTANDO..."
              : "ENTRAR NA OPERAÇÃO"}
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