"use client";


interface AgentProfileProps {

  perfil:any;

}



export default function AgentProfile({

  perfil

}:AgentProfileProps){



  if(!perfil){

    return null;

  }





  return (

    <div

      className="
      bg-zinc-900
      border
      border-zinc-700
      rounded-2xl
      p-6
      text-white
      "

    >



      <h2

        className="
        text-2xl
        font-bold
        mb-5
        "

      >

        🛰️ PERFIL DO AGENTE

      </h2>





      <div

        className="
        space-y-3
        "

      >



        <p>

          👤 Nome:

          {" "}

          <strong>

            {perfil.nome}

          </strong>

        </p>





        <p>

          ⭐ Nível:

          {" "}

          <strong>

            {perfil.nivel}

          </strong>

        </p>





        <p>

          ⚡ XP:

          {" "}

          <strong>

            {perfil.xp}

          </strong>

        </p>





        <p>

          🛰️ Operações:

          {" "}

          <strong>

            {perfil.operacoes}

          </strong>

        </p>





        <p>

          🏆 Vitórias:

          {" "}

          <strong>

            {perfil.vitorias}

          </strong>

        </p>





        <p>

          💀 Eliminações:

          {" "}

          <strong>

            {perfil.eliminacoes}

          </strong>

        </p>





        <p>

          🎯 Missões:

          {" "}

          <strong>

            {perfil.missoesConcluidas}

          </strong>

        </p>



      </div>



    </div>


  );


}