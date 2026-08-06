"use client";


interface OrionAlertProps {

  mensagem:string;

  tipo?: "normal" | "sucesso" | "erro";

}



export default function OrionAlert({

  mensagem,

  tipo = "normal"

}:OrionAlertProps){



  const estilo =

    tipo === "sucesso"

    ?

    "border-green-500 text-green-400"

    :

    tipo === "erro"

    ?

    "border-red-500 text-red-400"

    :

    "border-zinc-700 text-zinc-300";





  return (

    <div

      className={`
        w-full
        bg-zinc-950
        border
        rounded-xl
        p-4
        text-center
        ${estilo}
      `}

    >

      <p

        className="
          text-sm
          tracking-widest
        "

      >

        {mensagem}

      </p>


    </div>

  );


}