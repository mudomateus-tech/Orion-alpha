import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



interface Conquista {

  id:string;

  titulo:string;

  descricao:string;

}



const conquistasBase:Conquista[] = [

  {
    id:"primeira_missao",
    titulo:"🎯 Primeira Missão",
    descricao:"Concluiu sua primeira missão."
  },


  {
    id:"especialista_missoes",
    titulo:"⭐ Especialista",
    descricao:"Concluiu 50 missões."
  },


  {
    id:"primeira_vitoria",
    titulo:"🏆 Primeira Vitória",
    descricao:"Venceu uma operação."
  },


  {
    id:"veterano_orion",
    titulo:"🛰️ Veterano ORION",
    descricao:"Participou de 100 operações."
  },


  {
    id:"primeira_eliminacao",
    titulo:"💀 Primeiro Abate",
    descricao:"Realizou sua primeira eliminação."
  },


  {
    id:"cacador",
    titulo:"☠️ Caçador",
    descricao:"Realizou 10 eliminações."
  },


  {
    id:"primeira_sabotagem",
    titulo:"🚨 Caos Inicial",
    descricao:"Executou sua primeira sabotagem."
  },


  {
    id:"mestre_sabotagem",
    titulo:"🔥 Mestre do Caos",
    descricao:"Executou 20 sabotagens."
  }

];





export async function verificarConquistas(

  jogadorId:string

){


  const referencia =

    doc(

      db,

      "agentes",

      jogadorId

    );



  const snapshot =

    await getDoc(

      referencia

    );



  if(

    !snapshot.exists()

  ){

    return;

  }



  const perfil:any =

    snapshot.data();



  const desbloqueadas:string[] =

    perfil.conquistas ?? [];



  const novas:string[] = [];





  function liberar(

    id:string

  ){

    if(

      !desbloqueadas.includes(id)

    ){

      novas.push(id);

    }

  }





  if(

    perfil.missoesConcluidas >= 1

  ){

    liberar(

      "primeira_missao"

    );

  }



  if(

    perfil.missoesConcluidas >= 50

  ){

    liberar(

      "especialista_missoes"

    );

  }



  if(

    perfil.vitorias >= 1

  ){

    liberar(

      "primeira_vitoria"

    );

  }



  if(

    perfil.operacoes >= 100

  ){

    liberar(

      "veterano_orion"

    );

  }



  if(

    perfil.eliminacoes >= 1

  ){

    liberar(

      "primeira_eliminacao"

    );

  }



  if(

    perfil.eliminacoes >= 10

  ){

    liberar(

      "cacador"

    );

  }



  if(

    perfil.sabotagens >= 1

  ){

    liberar(

      "primeira_sabotagem"

    );

  }



  if(

    perfil.sabotagens >= 20

  ){

    liberar(

      "mestre_sabotagem"

    );

  }





  if(

    novas.length > 0

  ){

    await updateDoc(

      referencia,

      {

        conquistas:

          [

            ...desbloqueadas,

            ...novas

          ]

      }

    );

  }



  return novas;

}