import {
  adicionarXP,
  atualizarPerfilAgente,
  buscarPerfilAgente
} from "@/services/profileService";


export async function registrarEventoProgressao(

  jogadorId:string,

  evento:
    | "vitoria"
    | "derrota"
    | "missao"
    | "eliminacao"
    | "sabotagem"

){

  const perfil =
    await buscarPerfilAgente(
      jogadorId
    );


  if(!perfil){

    return;

  }


  let xp = 0;

  const atualizacao:any = {};



  switch(evento){


    case "vitoria":

      xp = 100;

      atualizacao.vitorias =
        perfil.vitorias + 1;

      atualizacao.operacoes =
        perfil.operacoes + 1;

      break;



    case "derrota":

      xp = 40;

      atualizacao.derrotas =
        perfil.derrotas + 1;

      atualizacao.operacoes =
        perfil.operacoes + 1;

      break;



    case "missao":

      xp = 25;

      atualizacao.missoesConcluidas =
        perfil.missoesConcluidas + 1;

      break;



    case "eliminacao":

      xp = 50;

      atualizacao.eliminacoes =
        perfil.eliminacoes + 1;

      break;



    case "sabotagem":

      xp = 35;

      atualizacao.sabotagens =
        perfil.sabotagens + 1;

      break;


  }



  await atualizarPerfilAgente(

    jogadorId,

    atualizacao

  );



  await adicionarXP(

    jogadorId,

    xp

  );


}