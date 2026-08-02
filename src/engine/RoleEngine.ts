import { Player } from "@/types/Player";

export class RoleEngine {

  static agente(

    jogador: Player

  ) {

    return jogador.papel === "agente";

  }

  static infiltrado(

    jogador: Player

  ) {

    return jogador.papel === "infiltrado";

  }

  static hacker(

    jogador: Player

  ) {

    return jogador.papel === "hacker";

  }

}