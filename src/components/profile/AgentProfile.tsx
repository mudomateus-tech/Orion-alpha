"use client";

interface AgentProfileProps {
  perfil: any;
}

function obterPatente(nivel: number): string {
  if (nivel >= 50) return "COMANDANTE";
  if (nivel >= 40) return "CAPITÃO";
  if (nivel >= 30) return "ESPECIALISTA";
  if (nivel >= 20) return "OPERADOR";
  if (nivel >= 10) return "VETERANO";
  return "RECRUTA";
}

function calcularPorcentagemXP(
  xp: number,
  xpProximoNivel: number
) {
  if (!xpProximoNivel) return 0;

  return Math.min(
    100,
    Math.round((xp / xpProximoNivel) * 100)
  );
}

export default function AgentProfile({
  perfil,
}: AgentProfileProps) {
  if (!perfil) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 text-center text-zinc-400">
        Carregando perfil...
      </div>
    );
  }

  const nivel = perfil.nivel ?? 1;
  const xp = perfil.xp ?? 0;
  const xpMax = perfil.xpProximoNivel ?? 100;

  const porcentagem = calcularPorcentagemXP(
    xp,
    xpMax
  );

  const patente = obterPatente(nivel);

  const medalhas: string[] =
    perfil.medalhas ?? [];
  return (

    <main
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-400/30
      bg-[#05070d]
      text-white
      p-8
      shadow-[0_0_50px_rgba(0,255,255,.15)]
      "
    >

      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_top,rgba(0,255,255,.18),transparent_60%)]
        "
      />

      <div className="relative z-10">


        <div
          className="
          flex
          flex-col
          items-center
          "
        >

          <div
            className="
            w-28
            h-28
            rounded-full
            border-4
            border-cyan-400
            bg-cyan-400/10
            flex
            items-center
            justify-center
            text-5xl
            shadow-[0_0_35px_rgba(0,255,255,.5)]
            "
          >

            {perfil.avatar ?? "🛰️"}

          </div>


          <h1
            className="
            mt-6
            text-3xl
            font-bold
            tracking-widest
            text-cyan-300
            "
          >

            {perfil.nome}

          </h1>


          <p
            className="
            mt-2
            text-sm
            tracking-[0.4em]
            text-cyan-500
            "
          >

            {perfil.codinome ?? "RECRUTA"}

          </p>


          <p
            className="
            mt-4
            text-xs
            text-zinc-400
            "
          >

            ID ORION:
            {" "}
            {perfil.id}

          </p>


        </div>
        <div
          className="
          mt-8
          rounded-2xl
          border
          border-cyan-400/20
          bg-cyan-400/5
          p-5
          "
        >

          <div
            className="
            flex
            justify-between
            items-center
            mb-3
            "
          >

            <span className="text-cyan-300 font-bold">

              NÍVEL {nivel}

            </span>


            <span className="text-sm text-cyan-400">

              {patente}

            </span>


          </div>


          <div
            className="
            h-4
            w-full
            rounded-full
            bg-black
            overflow-hidden
            border
            border-cyan-400/30
            "
          >

            <div

              className="
              h-full
              bg-cyan-400
              transition-all
              duration-700
              "

              style={{

                width:`${porcentagem}%`

              }}

            />

          </div>


          <p
            className="
            mt-3
            text-center
            text-sm
            text-cyan-300
            "
          >

            XP {xp} / {xpMax}

          </p>


        </div>



        <div
          className="
          mt-6
          grid
          grid-cols-2
          gap-4
          "
        >


          <div className="
          rounded-2xl
          border
          border-cyan-400/20
          bg-cyan-400/5
          p-4
          ">

            <p className="text-xs text-cyan-400">

              OPERAÇÕES

            </p>

            <p className="text-2xl font-bold">

              {perfil.operacoes ?? 0}

            </p>

          </div>



          <div className="
          rounded-2xl
          border
          border-cyan-400/20
          bg-cyan-400/5
          p-4
          ">

            <p className="text-xs text-cyan-400">

              VITÓRIAS

            </p>

            <p className="text-2xl font-bold">

              {perfil.vitorias ?? 0}

            </p>

          </div>
          <div className="
          rounded-2xl
          border
          border-cyan-400/20
          bg-cyan-400/5
          p-4
          ">

            <p className="text-xs text-cyan-400">

              ELIMINAÇÕES

            </p>


            <p className="text-2xl font-bold">

              {perfil.eliminacoes ?? 0}

            </p>


          </div>




          <div className="
          rounded-2xl
          border
          border-cyan-400/20
          bg-cyan-400/5
          p-4
          ">


            <p className="text-xs text-cyan-400">

              MISSÕES

            </p>


            <p className="text-2xl font-bold">

              {perfil.missoesConcluidas ?? 0}

            </p>


          </div>




          <div className="
          rounded-2xl
          border
          border-cyan-400/20
          bg-cyan-400/5
          p-4
          ">


            <p className="text-xs text-cyan-400">

              SABOTAGENS

            </p>


            <p className="text-2xl font-bold">

              {perfil.sabotagens ?? 0}

            </p>


          </div>


        </div>




        <div
          className="
          mt-8
          rounded-2xl
          border
          border-cyan-400/20
          bg-cyan-400/5
          p-5
          "
        >

          <h2
            className="
            text-cyan-300
            font-bold
            mb-4
            tracking-wider
            "
          >

            🏅 MEDALHAS

          </h2>



          {

          medalhas.length > 0 ? (


            <div
              className="
              flex
              flex-wrap
              gap-3
              "
            >

              {

              medalhas.map(

                (medalha:string)=>(


                  <span

                    key={medalha}

                    className="
                    px-4
                    py-2
                    rounded-full
                    border
                    border-cyan-400/30
                    bg-cyan-400/10
                    text-sm
                    "
                  >

                    {medalha}


                  </span>


                )

              )

              }


            </div>


          ) : (


            <p className="text-zinc-500 text-sm">

              Nenhuma medalha desbloqueada.

            </p>


          )

          }


        </div>
        <div
          className="
          mt-8
          rounded-2xl
          border
          border-cyan-400/20
          bg-black/40
          p-5
          "
        >

          <div
            className="
            flex
            justify-between
            text-sm
            "
          >

            <span className="text-zinc-400">

              PAPEL

            </span>


            <span className="text-cyan-300 font-bold">

              {perfil.papel ?? "Agente"}

            </span>


          </div>



          <div
            className="
            flex
            justify-between
            text-sm
            mt-3
            "
          >

            <span className="text-zinc-400">

              TEMPO DE OPERAÇÃO

            </span>


            <span className="text-cyan-300">

              {perfil.tempoJogado ?? 0} min

            </span>


          </div>


        </div>




        <div
          className="
          mt-8
          text-center
          text-xs
          tracking-[0.4em]
          text-cyan-500
          "
        >

          ORION • AGENT DOSSIER

        </div>



      </div>


    </main>


  );

}                        