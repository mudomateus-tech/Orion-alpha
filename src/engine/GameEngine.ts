import { Operation } from "@/types/Operation";

export class GameEngine {

  static partidaIniciada(

    operacao: Operation

  ) {

    return operacao.status === "em andamento";

  }

  static partidaFinalizada(

    operacao: Operation

  ) {

    return operacao.status === "finalizada";

  }

  static quantidadeJogadores(

    operacao: Operation

  ) {

    return operacao.jogadores.length;

  }

}