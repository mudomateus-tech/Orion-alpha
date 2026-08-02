"use client";

import CableTask from "./CableTask";
import FrequencyTask from "./FrequencyTask";
import CodeTask from "./CodeTask";
import RepairTask from "./RepairTask";
import SequenceTask from "./SequenceTask";


export default function TaskEngine({

  missao,

  concluir

}:{

  missao:any;

  concluir:()=>void;

}){


  if(!missao){

    return null;

  }



  console.log(
    "TIPO DA MISSÃO:",
    missao.tipo,
    missao.titulo
  );





  if(missao.tipo === "cabos"){

    return (

      <CableTask

        concluir={concluir}

      />

    );

  }






  if(missao.tipo === "frequencia"){

    return (

      <FrequencyTask

        concluir={concluir}

      />

    );

  }






  if(missao.tipo === "codigo"){

    return (

      <CodeTask

        concluir={concluir}

        senha={missao.senha}

      />

    );

  }






  if(missao.tipo === "reparo"){

    return (

      <RepairTask

        concluir={concluir}

      />

    );

  }






  if(missao.tipo === "sequencia"){

    return (

      <SequenceTask

        concluir={concluir}

      />

    );

  }






  return (

    <div className="
      bg-red-900
      p-6
      rounded-xl
      text-white
    ">

      Tipo não encontrado:

      {" "}

      {missao.tipo}

    </div>

  );


}